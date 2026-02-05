# 🖼️ IMAGE GENERATOR GUIDE
## Guía Completa para Generación de Ilustraciones Académicas
### Basado en PaperBanana Framework (SOTA - NeurIPS 2025)

> **Referencia:** Este documento está basado en el paper "PaperBanana: Automating Academic Illustration for AI Scientists" (arXiv:2601.23265v1), que representa el estado del arte en generación automatizada de ilustraciones académicas.

---

## 📋 ÍNDICE
1. [Visión General del Framework](#1-visión-general-del-framework)
2. [Tipos de Ilustraciones Académicas](#2-tipos-de-ilustraciones-académicas)
3. [Fase 1: Generación de Descripción Textual](#3-fase-1-generación-de-descripción-textual)
4. [Fase 2: Estilización Académica](#4-fase-2-estilización-académica)
5. [Fase 3: Visualización](#5-fase-3-visualización)
6. [Fase 4: Crítica y Refinamiento](#6-fase-4-crítica-y-refinamiento)
7. [Guía de Estilo para Diagramas de Metodología](#7-guía-de-estilo-para-diagramas-de-metodología)
8. [Guía de Estilo para Gráficos Estadísticos](#8-guía-de-estilo-para-gráficos-estadísticos)
9. [Categorías de Diagramas por Dominio](#9-categorías-de-diagramas-por-dominio)
10. [Errores Comunes a Evitar](#10-errores-comunes-a-evitar)
11. [Criterios de Evaluación](#11-criterios-de-evaluación)
12. [Plantillas de Prompts](#12-plantillas-de-prompts)
13. [Flujo de Mejora de Diagramas Existentes](#13-flujo-de-mejora-de-diagramas-existentes-enhancement-flow)
14. [Gestión de Archivos de Imagen Generados](#14-gestión-de-archivos-de-imagen-generados)

---

## 1. VISIÓN GENERAL DEL FRAMEWORK

### Objetivo
Transformar contenido científico (sección de metodología + caption) en ilustraciones de calidad publicable que cumplan con los estándares de conferencias top-tier (NeurIPS, CVPR, IEEE).

### Formulación de la Tarea
```
I = f(S, C, E)

Donde:
- S: Contexto fuente (descripción de metodología)
- C: Intención comunicativa (caption de la figura)
- E: Ejemplos de referencia (opcional)
- I: Imagen generada
```

### Pipeline del Framework
```
┌─────────────────────────────────────────────────────────────────────────┐
│                        FASE DE PLANIFICACIÓN LINEAL                     │
├─────────────────────────────────────────────────────────────────────────┤
│  [Entrada]     →     [Planner]     →     [Stylist]                      │
│   S + C                 ↓                    ↓                          │
│                   Descripción P      Descripción P*                     │
│                    (Detallada)      (Optimizada)                        │
└─────────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    BUCLE DE REFINAMIENTO ITERATIVO                      │
├─────────────────────────────────────────────────────────────────────────┤
│         ┌─────────────────────────────────────────┐                     │
│         │                                         │                     │
│   P* →  │  [Visualizer] → I_t → [Critic] → P_{t+1}│  → (T=3 rondas)    │
│         │                                         │                     │
│         └─────────────────────────────────────────┘                     │
└─────────────────────────────────────────────────────────────────────────┘
                              ↓
                        [Imagen Final I_T]
```

---

## 2. TIPOS DE ILUSTRACIONES ACADÉMICAS

### 2.1 Diagramas de Metodología
**Uso:** Visualizar flujos de trabajo, arquitecturas de sistemas, pipelines de procesamiento.
**Características:**
- Fidelidad al contenido técnico
- Abstracción visual del método
- Flujo lógico claro (típicamente izquierda→derecha)

### 2.2 Gráficos Estadísticos
**Uso:** Visualizar datos cuantitativos, comparaciones, resultados experimentales.
**Tipos soportados:**
- Bar Chart (Gráfico de Barras)
- Line Chart (Gráfico de Líneas)
- Scatter Plot (Diagrama de Dispersión)
- Heatmap (Mapa de Calor)
- Radar Chart (Gráfico de Radar)
- Tree & Pie Chart (Árbol y Circular)

---

## 3. FASE 1: GENERACIÓN DE DESCRIPCIÓN TEXTUAL

### Rol del Planner Agent
El Planner transforma la sección de metodología en una descripción textual detallada del diagrama.

### Instrucciones Obligatorias para la Descripción

```
Tu descripción DEBE ser lo más detallada posible:

SEMÁNTICAMENTE:
- Describe cada elemento claramente
- Especifica todas las conexiones entre elementos
- Define el propósito de cada bloque/componente

FORMALMENTE:
- Estilo de fondo (típicamente blanco puro o pastel muy claro)
- Paleta de colores con códigos HEX específicos
- Grosor de líneas
- Estilos de iconos
- Tipografía a usar

⚠️ RECUERDA: Especificaciones vagas solo harán que la figura generada sea peor.
```

### Estructura Recomendada de Descripción

```markdown
La figura es un diagrama [TIPO] que ilustra [FRAMEWORK/SISTEMA].
El layout fluye de [DIRECCIÓN] sobre un fondo [COLOR].

**1. Sección [NOMBRE]: [Descripción]**
- Elementos visuales: [Lista de iconos/bloques]
- Labels: [Texto de etiquetas]
- Flujo: [Dirección de flechas]

**2. Región [NOMBRE]: [Descripción]**
- Contenedor: [Forma y color]
- Agentes/Bloques: [Lista con descripciones]
- Inputs/Outputs: [Conexiones]

**3. Estilización**
- Agentes: [Descripción de iconos]
- Tipografía: Sans-serif para texto, Serif Italic para variables
- Colores: [Esquema cromático específico]
```

---

## 4. FASE 2: ESTILIZACIÓN ACADÉMICA

### Rol del Stylist Agent
Refinar la descripción para cumplir con estándares estéticos de publicaciones académicas.

### Instrucciones del Stylist

```
## ROL
Eres un Lead Visual Designer para conferencias top-tier de AI (NeurIPS 2025).

## TAREA
Refinar y enriquecer la descripción preliminar basándote en las 
[Guías de Estilo NeurIPS 2025].

## INSTRUCCIONES CRUCIALES

1. **PRESERVAR Estéticas de Alta Calidad:**
   - Si la descripción ya describe un diagrama profesional, PRESÉRVALO
   - NO aplanar ni simplificar solo para cumplir con preferencias "flat"

2. **INTERVENIR Solo Cuando Sea Necesario:**
   - Aplicar ajustes solo si la descripción carece de detalle
   - Si se ve anticuada o visualmente desordenada

3. **RESPETAR Diversidad:**
   - Diferentes dominios tienen diferentes estilos
   - Papers de agentes: estilos ilustrativos/cartoon
   - Papers teóricos: estilos minimalistas

4. **ENRIQUECER Detalles:**
   - Colores específicos (códigos HEX)
   - Fuentes
   - Estilos de líneas
   - Ajustes de layout

5. **PRESERVAR Contenido:**
   - NO alterar el contenido semántico, lógica o estructura
   - Tu trabajo es PURAMENTE refinamiento estético
```

---

## 5. FASE 3: VISUALIZACIÓN

### Rol del Visualizer Agent

#### Para Diagramas de Metodología
```
Eres un ilustrador experto en diagramas científicos. 
Genera diagramas científicos de alta calidad basados en las solicitudes del usuario.

NOTA: NO incluir títulos de figura en la imagen.
```

#### Para Gráficos Estadísticos
```
Eres un ilustrador experto en gráficos estadísticos.
Escribe código para generar gráficos estadísticos de alta calidad.
```

### Parámetros de Generación Recomendados
- **Aspect Ratio:** Coincidir con diagramas de referencia (típicamente 3:2, 16:9, 21:9)
- **Resolución:** 2K mínimo para calidad de publicación
- **Temperatura:** 1 (para balance creatividad/consistencia)

---

## 6. FASE 4: CRÍTICA Y REFINAMIENTO

### Rol del Critic Agent
Inspeccionar la imagen generada y proporcionar retroalimentación para refinamiento.

### Reglas de Crítica y Revisión

```
## 1. CONTENIDO

### Fidelidad y Alineación
- Asegurar que el diagrama refleja EXACTAMENTE el método descrito
- Verificar alineación con la sección de metodología y caption
- Simplificaciones razonables permitidas
- NINGÚN componente crítico debe omitirse o malinterpretarse
- NO debe contener contenido alucinado

### QA de Texto
- Verificar errores tipográficos
- Detectar texto sin sentido
- Revisar labels poco claros

### Validación de Ejemplos
- Si incluye ejemplos ilustrativos, verificar que sean:
  - Factualmente correctos
  - Lógicamente consistentes

### Exclusión de Caption
- El texto del caption ("Figure 1: Overview...") NO debe estar 
  incluido dentro de la imagen misma

## 2. PRESENTACIÓN

### Claridad y Legibilidad
- Evaluar claridad visual general
- Si el flujo es confuso o el layout desordenado, sugerir mejoras

### Manejo de Leyendas
- Si hay leyendas redundantes basadas en texto, eliminarlas
```

### Formato de Salida del Critic

```json
{
  "critic_suggestions": "Crítica detallada y sugerencias específicas de mejora. 
                         Si el diagrama es perfecto, escribir 'No changes needed.'",
  "revised_description": "Descripción revisada incorporando todas las sugerencias.
                          Si no se necesitan cambios, escribir 'No changes needed.'"
}
```

### Número de Iteraciones
- **Recomendado:** T = 3 rondas de refinamiento
- Cada iteración mejora significativamente Faithfulness (+15.1%)

---

## 7. GUÍA DE ESTILO PARA DIAGRAMAS DE METODOLOGÍA

### El "Look NeurIPS 2025"

> **Estética Predominante:** "Soft Tech & Scientific Pastels"
> 
> Atrás quedaron los días de colores primarios intensos y cajas negras afiladas. 
> El diagrama moderno de NeurIPS se siente accesible pero preciso. Utiliza fondos 
> de alto valor (claros) para organizar complejidad, reservando saturación para 
> los elementos activos más críticos.
>
> **Balance:** Modularidad limpia + Flujo narrativo (progresión izquierda→derecha)

### A. Paletas de Color

#### Fondos (Estrategia de "Zonas")
Usados para encapsular etapas o ambientes.

| Opción | Código HEX | Sensación |
|--------|------------|-----------|
| Cream/Beige | `#F5F5DC` | Cálida, académica |
| Pale Blue/Ice | `#E6F3FF` | Limpia, técnica |
| Mint/Sage | `#E0F2F1` | Suave, orgánica |
| Pale Lavender | `#F3E5F5` | Distintiva, moderna |

**Regla de opacidad:** ~10-15% para fondos pastel.

**Alternativa (~20%):** Fondos blancos con bordes coloreados discontinuos para look minimalista.

#### Colores de Elementos Funcionales
- **Módulos "Activos"** (Encoders, MLP, Attention): Saturación media
  - Combinaciones comunes: Blue/Orange, Green/Purple, Teal/Pink
  
- **Por estado:**
  - **Elementos Entrenables:** Tonos cálidos (Red, Orange, Deep Pink)
  - **Elementos Frozen/Estáticos:** Tonos fríos (Grey, Ice Blue, Cyan)

- **Highlights/Resultados:** Alta saturación (Primary Red, Bright Gold) 
  - SOLO para "Error/Loss", "Ground Truth", o salida final

### B. Formas y Contenedores

> **Filosofía:** "Geometría Suavizada" - Esquinas afiladas para datos; 
> esquinas redondeadas para procesos.

#### Componentes Core
| Tipo | Forma | Uso |
|------|-------|-----|
| Nodos de Proceso | Rectángulos Redondeados (radio 5-10px) | ~80% de los elementos |
| Tensors & Datos | Pilas 3D/Cuboides | Implica profundidad/volumen |
| Matrices/Tokens | Cuadrados/Grillas Planas | Atención maps |
| Memoria/Buffer | Cilindros | EXCLUSIVAMENTE |

#### Agrupamiento y Jerarquía
- **Patrón "Macro-Micro":** Contenedor sólido claro = vista global, 
  con módulo específico conectado a caja de detalle "zoom-in"

- **Bordes:**
  - **Sólidos:** Componentes físicos
  - **Discontinuos:** Etapas lógicas, Paths opcionales, Scopes

### C. Líneas y Flechas

> **Filosofía:** El estilo de línea dicta el tipo de flujo.

#### Estilos de Conectores
| Estilo | Uso |
|--------|-----|
| Ortogonal/Codo (ángulos rectos) | Arquitecturas de Red (precisión, matrices, tensores) |
| Curvo/Bezier | Lógica de Sistema, Loops de Feedback, Flujo de Datos Alto Nivel |

#### Semántica de Líneas
| Estilo | Significado |
|--------|-------------|
| Sólido Negro/Gris | Flujo de datos estándar (Forward pass) |
| Líneas Discontinuas | "Flujo Auxiliar" - Gradient updates, Skip connections, Loss |

#### Operadores Matemáticos en Líneas
- ⊕ para Add
- ⊗ para Concat/Multiply
- Colocados directamente sobre la línea o intersección

### D. Tipografía e Iconos

> **Filosofía:** Separación estricta entre "Etiquetado" y "Matemáticas"

#### Tipografía
| Tipo | Fuente | Estilo |
|------|--------|--------|
| Labels (Nombres de Módulos) | **Sans-Serif** (Arial, Roboto, Helvetica) | Bold para headers, Regular para detalles |
| Variables (Math) | **Serif** (Times New Roman, LaTeX) | Siempre Serif e Italizado |

**Regla:** Si es una variable en tu ecuación (x, θ, L), DEBE ser Serif e Italizada.

#### Iconografía Común
| Concepto | Opciones de Iconos |
|----------|-------------------|
| Entrenable | 🔥 Fuego, ⚡ Rayo |
| Frozen | ❄️ Copo de nieve, 🔒 Candado |
| Inspección | 🔍 Lupa |
| Procesamiento | ⚙️ Engranaje, 🖥️ Monitor |
| Texto/Prompt | 📄 Documento, 💬 Burbuja de Chat |
| Imagen | Thumbnail real de imagen |

---

## 8. GUÍA DE ESTILO PARA GRÁFICOS ESTADÍSTICOS

### El "Look NeurIPS 2025" para Plots

> **Estética:** Profesional, limpia, densa en información.
> 
> **Fondos:** Fuerte tendencia hacia fondos blancos puros para máximo contraste.
> El estilo "Seaborn" (gris claro) también es aceptado.
> 
> **Accesibilidad:** Énfasis fuerte en distinguir datos no solo por color, 
> sino por textura (patrones) y forma (marcadores).

### Paletas de Color

#### Datos Categóricos
| Estilo | Descripción |
|--------|-------------|
| Soft Pastels | Colores mate, baja saturación (salmon, sky blue, mint, lavender) |
| Muted Earth Tones | Paletas "académicas" (olive, beige, slate grey, navy) |
| High-Contrast Primaries | Uso moderado cuando categorías deben ser muy distintas |
| Accessibility Mode | Combinar color con patrones geométricos (rayas, puntos) |

#### Heatmaps (Secuenciales)
| Tipo | Colormap |
|------|----------|
| Perceptualmente Uniforme | "Viridis" (blue-to-yellow), "Magma/Plasma" (purple-to-orange) |
| Divergente | "Coolwarm" (blue-to-red) para splits positivo/negativo |
| ❌ EVITAR | Jet/Rainbow - considerado anticuado y perceptualmente engañoso |

### Ejes y Grillas

| Elemento | Estilo Recomendado |
|----------|-------------------|
| Líneas de Grilla | NUNCA sólidas. Usar `--` (dashed) o `:` (dotted) en gris claro |
| Placement | Siempre detrás de datos (Z-order bajo) |
| Spines "Boxed" | Marco completo (bordes negros en 4 lados) |
| Spines "Open" | Remover spines top y right para look minimalista |
| Ticks | Sutiles, hacia adentro, o removidos completamente |

### Layout y Tipografía

| Elemento | Recomendación |
|----------|---------------|
| Fuente | Exclusivamente **Sans-Serif** (Helvetica, Arial, DejaVu Sans) |
| Rotación de Labels X | Solo 45° cuando necesario para evitar overlap |
| Leyendas | Dentro del plot (top-left/right) o horizontal arriba del título |
| Anotaciones | Direct labeling preferido sobre leyendas |

### Guías Específicas por Tipo de Gráfico

#### Bar Charts & Histograms
- Bordes: Black outlines (alto contraste) O sin borde (con fondo gris claro)
- Agrupamiento: Barras juntas, espacio significativo entre grupos
- Error Bars: Negros, con caps planos

#### Line Charts
- **SIEMPRE** incluir marcadores geométricos (círculos, cuadrados, diamantes)
- Líneas discontinuas `--` para límites teóricos/baselines
- Líneas sólidas para datos experimentales primarios
- Incertidumbre: Bandas sombreadas semi-transparentes (no barras de error verticales)

#### Pie/Donut Charts
- Separadores: Bordes blancos gruesos entre slices
- Preferir **Donut** sobre Pie tradicional
- "Exploding" de slice específico para énfasis

#### Scatter Plots
- Shape Coding: Diferentes marcadores para dimensión categórica
- Marcadores típicamente sólidos y opacos
- Plots 3D: "Walls" con grillas o drop-lines al "floor"

#### Heatmaps
- Celdas: **ESTRICTAMENTE cuadradas**
- Anotación: Valor exacto DENTRO de celda (texto blanco o negro)
- Sin bordes o separados por líneas blancas muy finas

#### Radar Charts
- Fills: Transparentes (alpha ~0.2)
- Perímetro: Línea sólida más oscura

---

## 9. CATEGORÍAS DE DIAGRAMAS POR DOMINIO

### 1. Agent & Reasoning
- **Dominios:** LLM agents, multi-agent systems, reasoning, planning, tool use
- **Keywords:** agent, llm, language model, reasoning, planning, prompt
- **Estilo Visual:** 
  - Ilustrativo, Narrativo, "Amigable", Cartoon
  - Uso de estética UI/UX, burbujas de chat, iconos de documentos
  - Común usar robots 2D cute, avatares humanos, emojis

### 2. Vision & Perception
- **Dominios:** Computer vision, 3D reconstruction, object detection
- **Keywords:** vision, image, 3d, gaussian, nerf, detection, segmentation, camera
- **Estilo Visual:**
  - Espacial, Denso, Geométrico
  - Frustums (conos de cámara), líneas de rayos, point clouds
  - Codificación RGB para ejes, heatmaps (Rainbow/Viridis) para activación

### 3. Generative & Learning
- **Dominios:** Diffusion, GANs, VAEs, Reinforcement learning
- **Keywords:** diffusion, generative, gan, denoising, reinforcement, policy, reward
- **Estilo Visual:** Técnico, con énfasis en flujos de información

### 4. Science & Applications
- **Dominios:** AI for Science (biology, chemistry, physics, medicine)
- **Keywords:** protein, molecule, biology, graph, node, theorem, theory
- **Estilo Visual:**
  - Minimalista, Abstracto, "Textbook"
  - Focus en nodos de grafos (círculos) y manifolds (planos/superficies)
  - Color restringido: Mayormente Grayscale con un color de acento

---

## 10. ERRORES COMUNES A EVITAR

### ❌ Look "PowerPoint Default"
- Usar presets Blue/Orange estándar con outlines negros pesados

### ❌ Mezcla de Fuentes
- Usar Times New Roman para labels de "Encoder" (se ve anticuado de los 90s)

### ❌ Dimensión Inconsistente
- Mezclar cajas 2D flat y cubos 3D isométricos sin razón clara
- ✅ OK: 2D para lógica, 3D para tensores (con propósito)
- ❌ NO: Mezcla aleatoria

### ❌ Fondos Primarios
- Usar fondos Yellow o Blue saturados para agrupamiento

### ❌ Flechas Ambiguas
- Mismo estilo de línea para "Data Flow" y "Gradient Flow"

### ❌ Look "Excel Default"
- Efectos 3D pesados en barras
- Shadow drops
- Fuentes serif (Times New Roman) en ejes

### ❌ Rainbow Map
- Evitar colormap Jet/Rainbow - anticuado y perceptualmente engañoso

### ❌ Líneas sin Marcadores
- Line charts SIN marcadores se ven ambiguos con datos dispersos

### ❌ Dependencia Exclusiva de Color
- Fallar en usar patrones/formas para distinguir grupos = inaccesible para daltónicos

### ❌ Grillas Cluttered
- Líneas de grilla sólidas negras compiten con los datos

---

## 11. CRITERIOS DE EVALUACIÓN

### Dimensiones de Evaluación (en orden de prioridad)

#### PRIMARIAS (Decisivas)

##### 1. Faithfulness (Fidelidad)
> Alineación técnica entre el diagrama y el contenido del paper.

**El diagrama DEBE:**
- Ser factualmente correcto
- Lógicamente sólido
- Seguir estrictamente el scope descrito en el caption
- Preservar flujo lógico core e interacciones de módulos
- NO introducir fabricaciones

**Veto Rules (Líneas Rojas):**
1. ❌ **Alucinación Mayor:** Inventar módulos, entidades o conexiones no mencionadas
2. ❌ **Contradicción Lógica:** Flujo visual opuesto al método descrito
3. ❌ **Violación de Scope:** Contenido inconsistente con el caption
4. ❌ **Contenido Gibberish:** Texto sin sentido, labels ilegibles, notación matemática falsa

##### 2. Readability (Legibilidad)
> Qué tan fácil puede un lector extraer y navegar la información core.

**El diagrama DEBE tener:**
- Flujo visual claro
- Alta legibilidad
- Interferencia visual mínima

**Veto Rules:**
1. ❌ **Ruido Visual:** Título de figura renderizado en la imagen, labels duplicados, watermarks
2. ❌ **Oclusión/Overlap:** Text labels solapándose con flechas u otros elementos
3. ❌ **Routing Caótico:** Flechas "spaghetti" con cruces excesivos e innecesarios
4. ❌ **Fuente Ilegible:** Texto muy pequeño o tamaños inconsistentes
5. ❌ **Bajo Contraste:** Texto claro sobre fondo claro (o oscuro sobre oscuro)
6. ❌ **Layout Ineficiente:** Elementos que protruyen creando márgenes vacíos grandes
7. ❌ **Fondo Negro:** Típicamente incompatible con publicaciones académicas

#### SECUNDARIAS (Desempate)

##### 3. Conciseness (Concisión)
> "Visual Signal-to-Noise Ratio"

**El diagrama DEBE:**
- Actuar como abstracción visual de alto nivel
- Destilar lógica compleja en bloques limpios
- Usar shorthand estructural (flechas, agrupamiento) y keywords
- EVITAR descripciones explícitas, notación matemática pesada

**Veto Rules:**
1. ❌ **Sobrecarga Textual:** Boxes con oraciones completas (>15 palabras)
   - ✅ Excepción: Oraciones que muestran ejemplos de datos
2. ❌ **Copiado Literal:** Diagrama = copy-paste "boxificado" del Method Section
3. ❌ **Math Dump:** Cluttered con ecuaciones crudas en lugar de bloques conceptuales

##### 4. Aesthetics (Estética)
> Pulido visual, madurez profesional, armonía de diseño.

**El diagrama DEBE cumplir estándares de:**
- Conferencias top-tier (NeurIPS, CVPR)
- Esquemas de color armoniosos
- Elementos consistentes

**Veto Rules:**
1. ❌ **Artifacts de Baja Calidad:** Grillas de fondo visibles (draw.io), elementos borrosos
2. ❌ **Violaciones de Color:** Colores "neón" chillones, esquemas inconsistentes
3. ❌ **Fondo Negro:** Típicamente no profesional para publicaciones académicas

---

## 12. PLANTILLAS DE PROMPTS

### 12.1 Prompt de Planificación (Planner Agent)

```
Estoy trabajando en una tarea: dado la sección 'Metodología' de un paper y el 
caption de la figura deseada, generar automáticamente un diagrama ilustrativo 
correspondiente.

INPUT:
- Sección de Metodología: [CONTENIDO]
- Caption de la Figura: [CONTENIDO]

Tu output debe ser una descripción ULTRA DETALLADA de una figura ilustrativa 
que represente efectivamente los métodos descritos en el texto.

** IMPORTANTE: **
Tu descripción debe ser lo más detallada posible:

SEMÁNTICAMENTE:
- Describe claramente cada elemento y sus conexiones

FORMALMENTE:
- Estilo de fondo (típicamente blanco puro o pastel muy claro)
- Colores específicos (códigos HEX)
- Grosor de líneas
- Estilos de iconos
- Tipografía

RECUERDA: Especificaciones vagas o poco claras solo harán que la figura 
generada sea PEOR, no mejor.
```

### 12.2 Prompt de Estilización (Stylist Agent)

```
## ROL
Eres un Lead Visual Designer para conferencias top-tier de AI (NeurIPS 2025).

## TAREA
Se te proporciona una descripción preliminar de un diagrama de metodología.
Tu tarea es refinar y enriquecer esta descripción basándote en las 
[Guías de Estilo NeurIPS 2025] para asegurar que la imagen final sea un 
diagrama de alta calidad, listo para publicación.

## INSTRUCCIONES CRUCIALES

1. **Preservar Estéticas de Alta Calidad:** Si la descripción ya describe 
   un diagrama profesional (iconos 3D nice, texturas ricas, buena armonía 
   de color), PRESÉRVALO.

2. **Intervenir Solo Cuando Sea Necesario:** Aplicar ajustes solo si la 
   descripción carece de detalle, se ve anticuada, o está visualmente 
   desordenada.

3. **Respetar Diversidad:** Diferentes dominios tienen diferentes estilos.

4. **Enriquecer Detalles:** Si el input es plain, enriquécelo con atributos 
   visuales específicos (colores, fuentes, estilos de línea).

5. **Preservar Contenido:** NO alterar el contenido semántico, lógica o 
   estructura. Tu trabajo es PURAMENTE refinamiento estético.

## INPUT
- Descripción Detallada: [CONTENIDO]
- Guías de Estilo: [CONTENIDO]
- Sección de Método: [CONTENIDO]
- Caption de Figura: [CONTENIDO]

## OUTPUT
Output SOLO la Descripción Detallada final pulida. No incluir texto 
conversacional ni explicaciones.
```

### 12.3 Prompt de Visualización (Visualizer Agent)

```
Eres un ilustrador experto en diagramas científicos. Genera diagramas 
científicos de alta calidad basados en las solicitudes del usuario.

NOTA: NO incluir títulos de figura en la imagen.

DESCRIPCIÓN DEL DIAGRAMA A GENERAR:
[DESCRIPCIÓN_DETALLADA]

PARÁMETROS:
- Aspect Ratio: [RATIO] (ej: 21:9 para diagramas anchos)
- Resolución: 2K
- Fondo: [ESPECIFICACIÓN_DEL_FONDO]
```

### 12.4 Prompt de Crítica (Critic Agent)

```
## ROL
Eres un Lead Visual Designer para conferencias top-tier de AI.

## TAREA
Realizar un sanity check y proporcionar crítica del diagrama basándote 
en su contenido y presentación. Asegurar alineación con la 'Sección de 
Metodología' y 'Caption de Figura'.

## REGLAS DE CRÍTICA Y REVISIÓN

### 1. Contenido
- **Fidelidad y Alineación:** ¿El diagrama refleja precisamente el método?
- **QA de Texto:** Buscar errores tipográficos, texto sin sentido
- **Validación de Ejemplos:** Verificar precisión de ejemplos ilustrativos
- **Exclusión de Caption:** El caption NO debe estar en la imagen

### 2. Presentación
- **Claridad y Legibilidad:** Evaluar claridad visual general
- **Manejo de Leyendas:** Eliminar leyendas redundantes basadas en texto

## INPUT
- Diagrama Target: [IMAGEN]
- Descripción Detallada: [CONTENIDO]
- Sección de Metodología: [CONTENIDO]
- Caption de Figura: [CONTENIDO]

## OUTPUT (JSON Estricto)
{
  "critic_suggestions": "Crítica detallada aquí. Si es perfecto: 
                         'No changes needed.'",
  "revised_description": "Descripción revisada completa aquí. Si no hay 
                          cambios: 'No changes needed.'"
}
```

---

## 📚 REFERENCIA RÁPIDA

### Checklist Pre-Generación
- [ ] ¿Tengo la sección de metodología completa?
- [ ] ¿Tengo el caption específico de la figura?
- [ ] ¿Identifiqué la categoría del dominio (Agent, Vision, Generative, Science)?
- [ ] ¿Definí claramente los componentes principales del diagrama?

### Checklist Post-Generación
- [ ] ¿El diagrama es FIEL al contenido de la metodología?
- [ ] ¿El flujo lógico es claro y legible?
- [ ] ¿Los colores siguen las guías de estilo académico?
- [ ] ¿La tipografía es correcta (Sans-Serif para labels, Serif para math)?
- [ ] ¿NO hay texto gibberish ni alucinaciones?
- [ ] ¿El caption NO está renderizado dentro de la imagen?

---

## 🔗 INTEGRACIÓN CON DOCUMENTACION.md

Este documento complementa `DOCUMENTACION.md` en la sección:

```
=================================================
4. PASO 2 – OUTLINE VISUAL DE FIGURAS (CRÍTICO)
=================================================
```

**Uso:** Cuando `DOCUMENTACION.md` requiere generar figuras, consultar esta guía para:
1. Determinar la categoría del diagrama (Sección 9)
2. Generar descripción detallada (Sección 3 + Plantilla 12.1)
3. Aplicar estilización académica (Sección 4 + Guías Sección 7/8)
4. Ejecutar refinamiento iterativo (Sección 6)
5. Validar contra criterios (Sección 11)

---

## 13. FLUJO DE MEJORA DE DIAGRAMAS EXISTENTES (Enhancement Flow)

> **Basado en:** Sección 6.1 del paper - "Enhancing Aesthetics of Human-Drawn Diagrams"
> 
> **Resultado demostrado:** Win/Tie/Loss ratio de 56.2% / 6.8% / 37.0% en estética vs diagramas originales

### Cuándo Usar Este Flujo
- Cuando ya existe un diagrama dibujado por humanos
- Cuando se quiere mejorar la estética sin rediseñar desde cero
- Cuando el contenido es correcto pero la presentación es deficiente

### Pipeline de Mejora Simplificado

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      FLUJO DE MEJORA (ENHANCEMENT)                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [Diagrama Original]  +  [Guías Estéticas G]                           │
│         ↓                        ↓                                      │
│         └────────┬───────────────┘                                      │
│                  ↓                                                      │
│         ┌────────────────────┐                                          │
│         │   SUGGESTION       │                                          │
│         │     AGENT          │  → Genera hasta 10 sugerencias           │
│         │                    │    accionables de mejora                 │
│         └────────────────────┘                                          │
│                  ↓                                                      │
│         [Lista de 10 Sugerencias]                                       │
│                  ↓                                                      │
│         ┌────────────────────┐                                          │
│         │   REFINEMENT       │                                          │
│         │     AGENT          │  → Ejecuta las sugerencias               │
│         │                    │    sobre la imagen original              │
│         └────────────────────┘                                          │
│                  ↓                                                      │
│         [Diagrama Mejorado]                                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 13.1 Prompt del Suggestion Agent

```
## ROL
Eres un Lead Visual Designer para conferencias top-tier de AI (NeurIPS 2025).

## TAREA
Analizar el diagrama proporcionado y generar HASTA 10 sugerencias 
accionables de mejora estética, basándote en las Guías de Estilo NeurIPS 2025.

## INPUT
- Diagrama Original: [IMAGEN]
- Guías de Estilo: [CONTENIDO de Sección 7 o 8 según tipo]

## INSTRUCCIONES

1. **Analizar Estado Actual:**
   - Identificar paleta de colores actual
   - Evaluar tipografía y estilos de línea
   - Detectar problemas de layout o composición

2. **Generar Sugerencias Accionables:**
   - Cada sugerencia debe ser ESPECÍFICA y EJECUTABLE
   - Incluir valores concretos (códigos HEX, tamaños, etc.)
   - Priorizar por impacto visual

3. **Preservar Contenido:**
   - NO alterar la lógica o estructura del diagrama
   - Mantener todos los componentes y conexiones
   - Solo modificar aspectos ESTÉTICOS

## OUTPUT (JSON)
{
  "current_analysis": "Análisis breve del estado actual del diagrama",
  "suggestions": [
    {
      "priority": 1,
      "category": "color|typography|layout|shapes|lines",
      "description": "Descripción específica de la mejora",
      "current_value": "Valor/estado actual",
      "suggested_value": "Nuevo valor recomendado (con HEX/px/etc.)",
      "impact": "high|medium|low"
    },
    // ... hasta 10 sugerencias
  ]
}
```

### 13.2 Prompt del Refinement Agent

```
## ROL
Eres un ilustrador experto en diagramas científicos con capacidad de edición.

## TAREA
Aplicar las sugerencias de mejora al diagrama original para producir 
una versión refinada con mejor estética académica.

## INPUT
- Diagrama Original: [IMAGEN]
- Lista de Sugerencias: [OUTPUT del Suggestion Agent]

## INSTRUCCIONES

1. **Aplicar Sugerencias en Orden de Prioridad:**
   - Comenzar por sugerencias de mayor impacto
   - Mantener coherencia visual entre cambios

2. **Preservar Integridad:**
   - NO alterar contenido, texto o conexiones lógicas
   - Mantener proporciones y layout general
   - Solo aplicar mejoras estéticas

3. **Verificar Calidad:**
   - Asegurar que los cambios mejoran la legibilidad
   - Verificar coherencia de la paleta de colores
   - Confirmar que no se introdujeron artefactos

## OUTPUT
Imagen refinada con las mejoras aplicadas.
```

### 13.3 Tipos de Mejoras Comunes

| Categoría | Antes | Después |
|-----------|-------|---------|
| **Color** | Grises genéricos, colores primarios saturados | Pasteles armoniosos, esquema coherente |
| **Tipografía** | Mezcla de fuentes, tamaños inconsistentes | Sans-serif para labels, Serif para math |
| **Layout** | Espaciado irregular, elementos desalineados | Grid consistente, balance visual |
| **Formas** | Esquinas afiladas mezcladas con curvas | Radio de bordes uniforme (5-10px) |
| **Líneas** | Grosores variables, estilos inconsistentes | Grosor uniforme, semántica clara |
| **Iconos** | Iconos genéricos o ausentes | Iconografía consistente con dominio |

### 13.4 Ejemplo de Mejoras Aplicadas

```markdown
## Diagrama Original: Pipeline de Procesamiento

### Sugerencias Generadas:
1. [HIGH] Color: Cambiar fondo gris (#CCCCCC) a Pale Blue (#E6F3FF)
2. [HIGH] Bordes: Añadir radio 8px a todos los rectángulos
3. [MEDIUM] Tipografía: Cambiar Arial 10pt a Roboto 11pt Bold para headers
4. [MEDIUM] Líneas: Usar grosor 2px para flujo principal, 1px discontinuo para auxiliar
5. [MEDIUM] Color: Usar Blue (#4A90D9) para módulos de proceso, Orange (#F5A623) para datos
6. [LOW] Espaciado: Aumentar padding interno de boxes a 12px
7. [LOW] Flechas: Cambiar cabezas de flecha triangulares a tipo "stealth"

### Resultado:
- Win rate en estética: +56.2% vs original
- Concisión mejorada: eliminación de elementos redundantes
- Legibilidad: flujo más claro con semántica de colores
```

### 13.5 Cuándo NO Usar Enhancement Flow

❌ **No usar si:**
- El diagrama original tiene errores de contenido (usar flujo completo de regeneración)
- La estructura lógica es incorrecta
- Se requiere agregar nuevos componentes
- El aspecto ratio no es compatible con el target

✅ **Usar mejor el flujo completo (Secciones 3-6) si:**
- Se necesita un rediseño completo
- No existe diagrama previo
- El contenido del diagrama está desactualizado

---

## 14. GESTIÓN DE ARCHIVOS DE IMAGEN GENERADOS

> **⚠️ REGLA DE ORO:** Ninguna imagen generada debe perderse. Todas deben ser persistidas en la estructura del proyecto.

### 14.1 Persistencia e Integración
Tan pronto como una imagen sea generada o refinada:
- **DEBE** copiarse inmediatamente a `project/figures/`.
- **VALIDACIÓN OBLIGATORIA:** Antes de realizar "commit" o "push", el proyecto DEBE compilarse localmente para asegurar que las nuevas imágenes no rompen el documento.
  - Ejecutar: `qtex .\project\ --verify` (Validación de estructura y figuras)
  - Ejecutar: `qtex .\project\` (Compilación a PDF)
- **SI QTEX FALLA:** El cambio NO se guarda en Git. Se deben corregir las referencias en LaTeX antes de persistir.

### 14.2 Versionado y Nomenclatura
Para evitar sobreescrituras accidentales y mantener un historial de variaciones:
1. **Imagen Principal:** El nombre definido en el prompt (ej: `architecture.png`).
2. **Variaciones/Alternativas:** Si se genera una nueva versión pero no se va a usar como principal inmediatamente (o si se quiere conservar la anterior), se debe añadir un sufijo numérico:
   - `architecture.png` (Principal/Actual)
   - `architecture(1).png` (Variación 1)
   - `architecture(2).png` (Variación 2)
   - ...etc.

### 14.3 Sincronización con LaTeX
Cuando una nueva versión sea seleccionada como la "definitiva" para el paper:
- Se debe renombrar a la versión principal referenciada en el código LaTeX.
- Las versiones anteriores deben conservarse con su sufijo numérico en la misma carpeta para consulta o recuperación.

---

> **Última actualización:** Basado en PaperBanana Framework (arXiv:2601.23265v1)
> 
> **Método:** SOTA para generación automatizada de ilustraciones académicas

