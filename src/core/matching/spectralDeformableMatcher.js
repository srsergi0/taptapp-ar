import { Matrix, EigenvalueDecomposition } from "ml-matrix";
import { triangulate, getEdges } from "../utils/delaunay.js";

/**
 * Computes 2D spectral coordinates (Laplacian Eigenmaps) for a set of keypoints.
 * 
 * @param {Array<{x: number, y: number}>} points - Target keypoints
 * @returns {{sx: Float32Array, sy: Float32Array}} Precomputed spectral coordinates
 */
export function computeLaplacianEigenmaps(points) {
    const n = points.length;
    if (n < 4) {
        return {
            sx: new Float32Array(n),
            sy: new Float32Array(n)
        };
    }

    // 1. Triangulate and get edges to build the graph topology
    const triangles = triangulate(points);
    const edges = getEdges(triangles);

    // 2. Build adjacency and degree representations
    const adjacency = Array.from({ length: n }, () => new Set());
    for (const [u, v] of edges) {
        adjacency[u].add(v);
        adjacency[v].add(u);
    }

    // 3. Construct symmetric normalized Laplacian matrix:
    // L_sym = D^{-1/2} (D - A) D^{-1/2}
    const L = new Matrix(n, n);
    const degrees = new Float32Array(n);
    for (let i = 0; i < n; i++) {
        degrees[i] = adjacency[i].size;
    }

    for (let i = 0; i < n; i++) {
        const d_i = degrees[i];
        if (d_i === 0) {
            L.set(i, i, 1.0);
            continue;
        }
        L.set(i, i, 1.0);

        for (const j of adjacency[i]) {
            const d_j = degrees[j];
            if (d_j > 0) {
                // L_ij = -1 / sqrt(d_i * d_j)
                L.set(i, j, -1.0 / Math.sqrt(d_i * d_j));
            }
        }
    }

    // 4. Compute Eigenvalues & Eigenvectors
    const evd = new EigenvalueDecomposition(L);
    const eigenvalues = evd.realEigenvalues;
    const eigenvectors = evd.eigenvectorMatrix;

    // Sort eigenvalues to find the lowest non-trivial ones
    const pairs = eigenvalues.map((val, idx) => ({ val, idx }));
    pairs.sort((a, b) => a.val - b.val);

    // We skip the first eigenvector (pairs[0], which corresponds to eigenvalue ~0 and is trivial/constant)
    // The second and third eigenvectors represent the 2D spectral coordinates
    const v1Idx = pairs[1] ? pairs[1].idx : 0;
    const v2Idx = pairs[2] ? pairs[2].idx : 0;

    const v1 = eigenvectors.getColumn(v1Idx);
    const v2 = eigenvectors.getColumn(v2Idx);

    const sx = new Float32Array(n);
    const sy = new Float32Array(n);
    for (let i = 0; i < n; i++) {
        sx[i] = v1[i];
        sy[i] = v2[i];
    }

    return { sx, sy };
}

/**
 * Robustly validates a set of matches against non-rigid/deformable distortions 
 * using Local Affine RANSAC on Laplacian Spectral coordinates.
 * 
 * @param {Object} options
 * @param {Array<Object>} options.matches - List of candidate matches
 * @param {number} options.thresholdPx - Max reprojection error threshold in pixels
 * @param {number} options.minInliers - Minimum inliers to accept detection
 * @returns {Object|null} Verification result with inliers and a deformation mesh initial state
 */
export function validateDeformableMatches({ matches, thresholdPx = 15, minInliers = 6 }) {
    if (matches.length < minInliers) return null;

    const n = matches.length;
    const threshold2 = thresholdPx * thresholdPx;
    
    let bestInliers = [];
    let bestModel = null;

    const NUM_TRIALS = 50;

    for (let trial = 0; trial < NUM_TRIALS; trial++) {
        // 1. Randomly sample 3 matches
        const idx1 = Math.floor(Math.random() * n);
        let idx2 = Math.floor(Math.random() * n);
        while (idx2 === idx1) idx2 = Math.floor(Math.random() * n);
        let idx3 = Math.floor(Math.random() * n);
        while (idx3 === idx1 || idx3 === idx2) idx3 = Math.floor(Math.random() * n);

        const m1 = matches[idx1];
        const m2 = matches[idx2];
        const m3 = matches[idx3];

        // Ensure target keypoint has spectral coordinates
        if (m1.keypoint.sx === undefined || m2.keypoint.sx === undefined || m3.keypoint.sx === undefined) {
            continue;
        }

        const s1x = m1.keypoint.sx, s1y = m1.keypoint.sy;
        const s2x = m2.keypoint.sx, s2y = m2.keypoint.sy;
        const s3x = m3.keypoint.sx, s3y = m3.keypoint.sy;

        const q1x = m1.querypoint.x, q1y = m1.querypoint.y;
        const q2x = m2.querypoint.x, q2y = m2.querypoint.y;
        const q3x = m3.querypoint.x, q3y = m3.querypoint.y;

        // 2. Solve 3x3 local affine matrix inverse: M * A = Q
        // Det check to prevent collinear points in spectral space
        const det = s1x * (s2y - s3y) + s2x * (s3y - s1y) + s3x * (s1y - s2y);
        if (Math.abs(det) < 1e-7) continue;

        const invDet = 1.0 / det;

        // Inverse of M = [[s1x, s1y, 1], [s2x, s2y, 1], [s3x, s3y, 1]]
        const m00 = (s2y - s3y) * invDet;
        const m01 = (s3y - s1y) * invDet;
        const m02 = (s1y - s2y) * invDet;

        const m10 = (s3x - s2x) * invDet;
        const m11 = (s1x - s3x) * invDet;
        const m12 = (s2x - s1x) * invDet;

        const m20 = (s2x * s3y - s3x * s2y) * invDet;
        const m21 = (s3x * s1y - s1x * s3y) * invDet;
        const m22 = (s1x * s2y - s2x * s1y) * invDet;

        // Coefficients for X projection: q_x = a*s_x + b*s_y + tx
        const a = m00 * q1x + m01 * q2x + m02 * q3x;
        const b = m10 * q1x + m11 * q2x + m12 * q3x;
        const tx = m20 * q1x + m21 * q2x + m22 * q3x;

        // Coefficients for Y projection: q_y = c*s_x + d*s_y + ty
        const c = m00 * q1y + m01 * q2y + m02 * q3y;
        const d = m10 * q1y + m11 * q2y + m12 * q3y;
        const ty = m20 * q1y + m21 * q2y + m22 * q3y;

        // Check if this is a valid scale projection (no extreme shearing)
        const detA = a * d - b * c;
        if (Math.abs(detA) < 1e-4) continue;

        // 3. Count inliers
        const inliers = [];
        for (let i = 0; i < n; i++) {
            const m = matches[i];
            if (m.keypoint.sx === undefined) continue;

            const sx = m.keypoint.sx;
            const sy = m.keypoint.sy;

            // Project spectral coordinate using the local affine transform
            const px = a * sx + b * sy + tx;
            const py = c * sx + d * sy + ty;

            const dx = px - m.querypoint.x;
            const dy = py - m.querypoint.y;
            const err2 = dx * dx + dy * dy;

            if (err2 < threshold2) {
                inliers.push(m);
            }
        }

        if (inliers.length > bestInliers.length) {
            bestInliers = inliers;
            bestModel = { a, b, tx, c, d, ty };
        }
    }

    if (bestInliers.length < minInliers) {
        return null;
    }

    // 4. Construct the initial deformed state of the mesh vertices
    // We map the target's template keypoints to their corresponding 2D screen positions
    // using the best local affine model as a baseline.
    return {
        inliers: bestInliers,
        model: bestModel,
        isDeformable: true
    };
}
