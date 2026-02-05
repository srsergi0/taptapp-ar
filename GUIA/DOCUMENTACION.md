Actúa como un investigador académico senior, experto en redacción de artículos científicos para REVISTAS IEEE indexadas (Scopus / WoS / Q1-Q2).

Tu tarea es GENERAR un ARTÍCULO CIENTÍFICO COMPLETO en INGLÉS ACADÉMICO, con FORMATO IEEE PARA REVISTAS, cumpliendo ESTRICTAMENTE todos los requisitos estructurales, metodológicos, estadísticos y editoriales definidos a continuación.

=================================================
0. CONCEPTO E IDEA DEL PROYECTO
=================================================
- El concepto o idea principal de la investigación se encuentra detallado en el archivo: ./IDEA.md

=================================================
1. FORMATO GENERAL Y PAQUETES (OBLIGATORIO)
=================================================
- TODO el contenido DEBE generarse en LaTeX en una carpeta llamada project.
- El formato DEBE ser SIEMPRE IEEE PARA REVISTAS.
- Usa OBLIGATORIAMENTE la clase:
  \documentclass[journal]{IEEEtran}

- PAQUETES ESENCIALES A INCLUIR EN MAIN.TEX:
  • \usepackage{cite} (Para gestión de citas estilo [1], [2])
  • \usepackage{amsmath, amssymb, amsfonts} (Para formulación matemática rigurosa)
  • \usepackage{graphicx} (Para figuras)
  • \usepackage{booktabs} (Para tablas profesionales sin líneas verticales)
  • \usepackage{url} (Para referencias web si son estrictamente necesarias)

- El LaTeX DEBE estar FRAGMENTADO en múltiples archivos .tex colocados en la carpeta assets.
- El proyecto FINAL DEBE compilar correctamente usando qtex .\project\

PROHIBIDO:
- Usar clases article, report u otras.
- Incluir texto de ejemplo de plantillas IEEE (Lorem Ipsum).
- Generar PDF directamente.
- Incluir código Python u otros scripts (usar pseudocódigo o descripción matemática).

=================================================
2. ESTRUCTURA DE ARCHIVOS (FIJA E INALTERABLE)
=================================================
Genera EXACTAMENTE la siguiente estructura:

/project
 ├── main.tex
 ├── assets/
 │    ├── abstract.tex
 │    ├── introduction.tex
 │    ├── methodology.tex
 │    ├── results.tex
 │    ├── discussion.tex
 │    ├── conclusions.tex
 │    ├── conclusions.tex
 ├── references.bib
 ├── imagenes-generadas.md

=================================================
3. PASO 1 – OUTLINE GENERAL Y CIENTÍFICO (OBLIGATORIO)
=================================================
ANTES de redactar, genera un OUTLINE detallado que garantice rigor científico:

- Título del artículo (Impactante, técnico, max 15 palabras).
- Objetivo general.
- Estructura completa de secciones y subsecciones.
- Indicadores a evaluar (Before / After).
- Tamaño de muestra simulada (30–45) para validación estadística.
- Pruebas estadísticas a aplicar
- Lista completa de figuras a generar (Fig. 1, Fig. 2, …).

=================================================
4. PASO 2 – OUTLINE VISUAL DE FIGURAS (CRÍTICO)
=================================================
> **⚠️ IMPORTANTE:** Para la generación de imágenes académicas, consultar obligatoriamente:
> `./IMAGE_GENERATOR_GUIDE.md` - Guía completa basada en PaperBanana Framework (SOTA)

- Crea SIEMPRE un archivo `project/imagenes-generadas.md` que incluya todos los prompts COMPLETOS de las imágenes a generar.
- **Seguir el pipeline de 4 fases** descrito en IMAGE_GENERATOR_GUIDE.md:
  1. **Planner:** Generar descripción ultra-detallada del diagrama
  2. **Stylist:** Aplicar guías de estilo NeurIPS 2025
  3. **Visualizer:** Generar la imagen
  4. **Critic:** Evaluar y refinar (3 iteraciones)
- Al momento que generas la imagen quiero un estilo visual OUTLINE ULTRA DETALLADO. Las figuras deben ser de calidad editorial.
- Si existe un error en la imagen, vuelve a generarla siguiendo las reglas de refinamiento del Critic Agent.
- A medida que se generen y se coloquen en su carpeta, añade la etiqueta `[GENERATED]` al prompt correspondiente en dicho archivo.
--------------------------------
ESTRUCTURA OBLIGATORIA POR FIGURA
--------------------------------
Fig. X. [IEEE-style caption: Short and descriptive]

• Figure type:
  (Conceptual Architecture / Methodological Pipeline / System Block Diagram / Experimental Setup)

• Layout structure:
  (Left-to-right flow, Layered Stack, Feedback Loop, etc.)

• Main blocks/components:
  - Block 1
  - Block 2
  - Block 3
  - ...
  
  
• Detailed Components:
  - Input Layer / Data Sources
  - Processing Blocks (Algoritmos, Modelos, Lógica)
  - Output / Validation Layer
  (Nombres técnicos precisos para cada bloque)

• Interactions:
  (Flechas de flujo de datos, señales de control, retroalimentación)

• Purpose:
  (Justificación de por qué esta figura valida el aporte científico)

=================================================
5. PASO 3 – GENERACIÓN DEL LATEX IEEE FRAGMENTADO
=================================================

-------------------------
main.tex
-------------------------
- Configuración estándar IEEE.
- Título y Autores (Genérico Académico: "First A. Author, Second B. Author...").
- Abstract e Index Terms (Keywords).
- Importar secciones con \input{assets/...}.
- Bibliografía con \bibliographystyle{IEEEtran}
- \bibliography{references}

-------------------------
abstract.tex
-------------------------
- Un solo párrafo.
- Debe incluir obligatoriamente:
  • Problema
  • Propuesta tecnológica
  • Enfoque: Applied research
  • Diseño: Pretest–Posttest
  • Muestra simulada (30–45)
  • Resultados cuantitativos
  • Significancia estadística (p < 0.05)

-------------------------
introduction.tex
-------------------------
- Contexto internacional
- Contexto Perú
- Brecha de investigación clara
- Justificación tecnológica
- Objetivo general explícito

-------------------------
methodology.tex
-------------------------
- Tipo: Applied research
- Diseño: Pretest–Posttest
- Descripción del modelo tecnológico
- Metodología SECUENCIAL (A, B, C, D…)
- Cada etapa debe corresponder a una figura
- Redacción técnica, clara y directa
- NO usar código

-------------------------
results.tex
-------------------------
- Resultados simulados realistas
- Indicadores Before / After
- Aplicar OBLIGATORIAMENTE:
  • Shapiro–Wilk
  • Kolmogorov–Smirnov
  • Student’s t-test (paired samples)
- Interpretación estadística formal
- Tablas en formato IEEE

-------------------------
discussion.tex
-------------------------
- Interpretación profunda de resultados
- Comparación con literatura IEEE / Scopus
- Impacto del modelo tecnológico
- Enfoque en eficiencia, optimización o desempeño

-------------------------
conclusions.tex
-------------------------
- Respuesta directa al objetivo
- Aporte científico–tecnológico
- Aplicabilidad y escalabilidad
- No repetir tablas ni pruebas estadísticas

-------------------------
references.bib
-------------------------
- Mínimo 25 referencias.
- Calidad: 80% deben ser artículos de Journals/Conferencias indexadas (IEEE, ACM, Springer, Elsevier).
- Actualidad: 70% deben ser de los últimos 5 años (2021-2026).
- Incluir DOI siempre.

=================================================
6. ESTILO Y REDACCIÓN
=================================================
- Voz: Pasiva e Impersonal ("The system was designed..." vs "We designed...").
- Tiempo verbal: Pasado para Metodología y Resultados. Presente para Introducción y Discusión.
- Vocabulario: Técnico, preciso, académico. Evitar "very", "good", "bad". Usar "significant", "efficient", "optimal".
- Coherencia: El título, el objetivo, la metodología y la conclusión deben estar perfectamente alineados.
 Todas las imagenes son:
 -Metodologicas
 -Secuenciales
 -Colocar que es elaboración propia

=================================================
7. INSTRUCCIONES FINALES
=================================================
- Asume el flujo de trabajo: `qtex .\project\ --verify` -> `qtex .\project\`.
- Prioriza la densidad de contenido y la calidad técnica sobre la longitud vacía.
- ¡Importante! Al final, tienen que hacer un commit y un push de los cambios de esta carpeta.