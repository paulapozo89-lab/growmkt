---
name: social-listening
description: "Social listening + social media metrics + combined reporting. Generates branded reports (HTML + PDF slides + Word) with auto-deploy. 3 modes: solo listening, solo metrics, combined. Dual branding SE/GROW. Triggers: 'social listening', 'monitoreo de marca', 'reporte de redes', 'reporte integral', 'reporte completo', 'métricas de redes', 'engagement report', 'benchmarking', 'escucha social', 'menciones de marca', 'qué se dice de', 'share of voice', 'analizar cuenta', 'comparar meses', 'reporte combinado'. Also triggers on Apify CSV/JSON uploads. Use for any social/digital analytics report request."
---

# Social Listening + Social Media Reports — Skill Unificado

Skill que genera reportes profesionales de presencia digital en 3 modalidades, con branding dual (Somos Estrategia / GROW), deploy automático a Vercel, y salida en HTML interactivo + PDF slides + Word.

## Los 3 modos de reporte

| Modo | Trigger del usuario | Qué incluye |
|---|---|---|
| **Solo Listening** | "reporte de listening de X", "qué se dice de X", "monitoreo de X" | Menciones web + sentiment + IG/FB comments + alertas + cobertura editorial |
| **Solo Metrics** | "reporte de redes de X", "métricas de X", "analizar cuenta @X" | Seguidores, engagement, content mix, top posts, horarios, hashtags, Reels |
| **Combinado** | "reporte integral de X", "reporte completo", "reporte combinado" | Todo lo anterior unificado + panorama multiplataforma + conclusiones cruzadas |

### Cómo determinar el modo
1. Si el usuario dice "listening", "monitoreo", "qué se dice", "menciones", "sentimiento" → **Solo Listening**
2. Si dice "redes", "métricas", "engagement", "analizar cuenta", "reporte de Instagram" → **Solo Metrics**
3. Si dice "completo", "integral", "combinado", o pide ambos → **Combinado**
4. Si hay ambigüedad → **preguntar al usuario**

## Branding dual — SE / GROW

| Config | Somos Estrategia | GROW Marketing |
|---|---|---|
| **Trigger** | Default, o dice "para Somos", "branding SE" | Dice "para GROW", "branding GROW", "dominio GROW" |
| **Repo** | `paulapozo89-lab/somosestrategia` | `paulapozo89-lab/growmkt` |
| **Dominio HTML** | `somosestrategia.vercel.app` | `reportes.growmkt.mx` |
| **Color primario** | `#00F0C8` | `#2BAECC` |
| **Color secundario** | `#1A1A1A` | `#2F95EA` |
| **Color alerta** | `#FF6B6B` | `#E5526C` |
| **Logo HTML** | Embebido como base64 (cyan transparent) | Embebido como base64 (color transparent) |
| **Logo PDF** | Negro transparent (portada/cierre) + cyan (footer) | Color transparent (portada) + small (footer) |
| **Brand ref** | `references/brand-se.md` | `references/brand-grow.md` |

IMPORTANTE: Siempre leer el archivo brand-*.md correspondiente antes de generar el reporte.

## Periodo de análisis

**CRÍTICO:** El usuario define las fechas. Tanto el listening (web search + Apify) como las métricas (Apify scrape) deben usar EL MISMO rango de fechas. Preguntar siempre:
- "¿De qué fecha a qué fecha?"
- Si no especifica, asumir últimos 30 días y confirmar.

El periodo debe aparecer consistente en: portada, KPIs, filtros de datos, conclusiones.

## Flujo de trabajo completo

### Paso 0: Preguntas al usuario
Antes de ejecutar CUALQUIER cosa, confirmar:
1. **Sujeto**: ¿Quién o qué marca? (nombre, handles de IG/FB/YT)
2. **Periodo**: ¿De qué fecha a qué fecha?
3. **Modo**: ¿Listening, métricas o combinado? (inferir del contexto si es claro)
4. **Branding**: ¿SE o GROW? (default SE)
5. **Tema**: ¿Fondo blanco o fondo negro? (SIEMPRE preguntar, aplica a ambas marcas)
6. **Plataformas**: ¿IG + FB + YT + Web? ¿O solo algunas?

### Paso 1: Recolección de datos (Apify + Web Search)

Leer `references/apify-setup.md` para configuración de cada actor.

#### Para Listening:
1. **Web search** — Buscar menciones en medios usando el buscador. 3-5 queries con keywords del sujeto.
2. **Facebook Posts Search** — Actor `TMBawM4LZpKN15DZX` (keyword, max 30 chars)
3. **YouTube Search** — Actor `sK6m1ZqXSX3AEJMQd`
4. **Instagram** — Actor `shu8hvrXbJbY3Eb9W` (requiere URL de perfil, resultsType: "posts")
5. **Facebook Comments** — Actor `apify/facebook-comments-scraper` (requiere URLs de posts)

#### Para Metrics:
1. **Instagram Profile** — Actor `shu8hvrXbJbY3Eb9W` (resultsType: "details")
2. **Instagram Posts** — Actor `shu8hvrXbJbY3Eb9W` (resultsType: "posts", limit 50+)
3. **Facebook Page** — Actor `apify/facebook-pages-scraper` (URL de página)

#### Para Combinado:
Ejecutar TODO lo anterior.

### Paso 2: Análisis de datos

#### Métricas a calcular (Instagram):
| Métrica | Fórmula |
|---|---|
| Engagement Rate | (avg likes + avg comments) / followers × 100 |
| Follow Ratio | followers / following |
| Posts per Week | posts en periodo / semanas |
| Content Type | clips=Reel, Sidecar=Carrusel, Image=Imagen |
| Views promedio | sum(videoPlayCount) / count(reels) |

#### Métricas a calcular (Facebook):
| Métrica | Fórmula |
|---|---|
| Reacciones promedio | total reactionsCount / posts propios |
| Comentarios total | sum(commentsCount) de posts propios |
| Comparativa vs IG | (FB followers / IG followers - 1) × 100 |

#### Métricas a calcular (YouTube):
| Métrica | Datos |
|---|---|
| Views totales | sum(viewCount) |
| Videos propios vs menciones | filtrar por channelName |

#### Análisis de Horarios (Instagram):
- Parsear timestamp de cada post → hora CST (UTC-6)
- Construir heatmap día × hora
- Identificar mejores 3 horarios y mejores 3 días

#### Análisis de Sentimiento:
**Criterio para clientes políticos:**
- **Negativo** = crítica directa al sujeto, su partido, o gobierno aliado
- **Neutro** = trolleo inter-partidista entre terceros, preguntas informativas, comparaciones no críticas
- **Positivo** = apoyo, felicitaciones, emojis positivos
- **NUNCA** clasificar herramientas internas (Apify, etc.) como contenido del cliente

**Criterio para marcas comerciales:**
- **Negativo** = queja de producto/servicio, experiencia mala, decepción
- **Neutro** = preguntas, menciones informativas
- **Positivo** = recomendación, satisfacción, recompra

**Score** = (% positivos - % negativos). Rango: -100 a +100.
Siempre incluir nota explicativa del score en el reporte.

### Paso 3: Verificación de datos

**CRÍTICO — VERIFICAR ANTES DE GENERAR:**
1. ¿Los datos de Apify son del periodo solicitado? Filtrar por fecha.
2. ¿Los posts son del perfil correcto? Filtrar por ownerUsername.
3. ¿Los comentarios negativos son realmente negativos? Revisar contexto.
4. ¿Los números cuadran? Verificar que sumas y promedios sean correctos.
5. ¿Hay datos duplicados? Deduplicar por URL/ID.
6. ¿Las URLs de las notas web son reales y accesibles? Verificar con web_fetch si es posible.
7. **NUNCA inventar datos, URLs, o métricas.** Si no hay dato, decir "No disponible".

### Paso 4: Generación de gráficas (matplotlib 600 DPI)

Generar charts a 600 DPI como PNG. Fondo blanco, tipografía Arial, spines solo izquierda/abajo.
Siempre `matplotlib.use('Agg')`.

**Charts por modo:**

| Chart | Listening | Metrics | Combinado |
|---|---|---|---|
| Followers comparison (IG vs FB) | — | ✅ | ✅ |
| Engagement comparison | — | ✅ | ✅ |
| Content type pie | — | ✅ | ✅ |
| Engagement by type bar | — | ✅ | ✅ |
| Top 5 posts | — | ✅ | ✅ |
| Top Reels | — | ✅ | ✅ |
| Heatmap horarios | — | ✅ | ✅ |
| Hashtags | — | ✅ | ✅ |
| FB posts bar | — | ✅ | ✅ |
| YT views bar | — | ✅ | ✅ |
| Sentiment donuts | ✅ | — | ✅ |
| Sentiment layers | ✅ | — | ✅ |
| Conv comparison (IG vs FB) | ✅ | — | ✅ |
| Neg themes | ✅ | — | ✅ |
| Timeline mentions | ✅ | — | ✅ |
| Sources bar | ✅ | — | — |

### Paso 5: Generación de reportes

Generar 3 archivos por reporte:
1. **HTML** — Dark o light theme (según elección del usuario), Chart.js vectorial, responsive, logo embebido como base64
2. **PPTX → PDF slides** — SIEMPRE fondo blanco, logo en proporciones correctas (calcular height = width / ratio_original). pptxgenjs. 16:9.
3. **DOCX → PDF documento** — SIEMPRE fondo blanco, tamaño carta (letter 8.5x11"), toda la info del reporte en formato documento con tablas, KPIs como texto, links incluidos. docx-js. NO convertir HTML a PDF — generar DOCX propio y convertir.

**REGLA DE LOGOS EN PDF:**
- Calcular proporciones correctas: height = width / (original_width / original_height)
- NUNCA estirar ni comprimir el logo
- Portada: logo centrado grande
- Footer: logo pequeño esquina inferior derecha

El HTML debe incluir botón "📄 Descargar PDF" flotante con 2 opciones: slides y documento.

### Reglas de tema (SIEMPRE aplicar)

**Tema oscuro (fondo negro):**
- body background: `#0a0a0a`, color: `#fff`
- Cards: `#1A1A1A` (SE) o `#141414` (GROW)
- Tablas: headers dark, rows alternating dark/darker

**Tema claro (fondo blanco):**
- body background: `#ffffff`, color: `#000`
- Cards: `#f5f5f5` con borde `#e0e0e0`
- Tablas: headers light gray, rows alternating white/very light

**PDF slides SIEMPRE en fondo blanco** (estilo CCQ), sin importar el tema del HTML. Aplica a AMBAS marcas (SE y GROW). Esta regla es permanente y no se pregunta al usuario.

### Reglas de responsive móvil (SIEMPRE aplicar)

```css
/* OBLIGATORIO en todas las tablas */
.table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
table { min-width: 700px; }

@media (max-width: 768px) {
    .kpi-grid { grid-template-columns: repeat(2, 1fr); }
    .chart-row, .chart-grid, .concl-grid { grid-template-columns: 1fr; }
    .table-wrap { margin-left: -16px; margin-right: -16px; border-radius: 0; }
    table { min-width: 600px; font-size: 12px; }
    .container { padding: 20px 16px; }
}
```

NUNCA usar `overflow: hidden` en contenedores de tablas. SIEMPRE `overflow-x: auto`.

### Links a contenido (OBLIGATORIO)

**CRÍTICO:** Todas las tablas de contenido (Top posts, Reels, menciones web, notas editoriales) DEBEN incluir una columna "Ver" con link directo al contenido original. Nunca generar un reporte sin links verificables a cada pieza de contenido analizada.

- **Instagram posts/reels**: `https://www.instagram.com/p/{shortcode}/`
- **Facebook posts**: URL completa del post
- **YouTube videos**: `https://www.youtube.com/watch?v={id}`
- **Notas web**: URL de la nota original
- **Formato**: `<a href="{url}" target="_blank" class="link">Ver ↗</a>`

Si no hay URL disponible para una pieza, marcar como "N/D" pero NUNCA omitir la columna.

### Reproducciones / Views en tablas (OBLIGATORIO)

**CRÍTICO:** Cuando una publicación es video (Reel, Short, TikTok, video de FB/YT), SIEMPRE incluir columna "Views" o "Reproducciones" en:
- Top 10 publicaciones → columna Views (mostrar "—" si no es video)
- Tabla de Reels → columna Views (obligatoria)
- Cualquier tabla que incluya contenido de video

Los views deben mostrarse con formato numérico: 112,192 (no 112K en tablas, sí en KPIs).

### Ranking de Top Publicaciones (OBLIGATORIO)

**CRÍTICO:** El Top 10 NO se ordena solo por likes. Se ordena por IMPACTO combinado:
- Un Reel con 112K views y 24 likes ES top content aunque tenga pocos likes
- Criterio: considerar likes + comments + views (para video) como indicadores de impacto
- Si un video tiene views excepcionales (>10x del promedio), DEBE estar en el Top 10
- Los PDFs deben tener las MISMAS tablas que el HTML, con links clicables y columna de views

### Links en PDFs (OBLIGATORIO)

Los PDFs (tanto slides como documento) DEBEN incluir links clicables a cada contenido:
- En DOCX: usar `ExternalHyperlink` de docx-js
- En PPTX: incluir columna "Link" con URLs cortas en tablas
- Los links DEBEN ser funcionales al abrir el PDF

### Paso 6: Deploy automático

Leer `references/deploy-config.md` para tokens y configuración.

1. Agregar `<meta name="robots" content="noindex, nofollow">` al HTML
2. Embeber logos como base64 (no URLs externas)
3. Generar hash de 6 chars para URL
4. Subir HTML + PDF slides + PDF doc a GitHub via API
5. Vercel auto-deploy ~30s
6. Verificar HTTP 200
7. Entregar link al usuario

**URL format:** `{dominio}/reportes/{cliente}-{periodo}-{hash}.html`

### Paso 7: Conclusiones estratégicas

**CRÍTICO — Las conclusiones deben ser:**
- Basadas 100% en datos reales del reporte
- Cruzadas entre todas las fuentes disponibles (no aisladas por plataforma)
- Accionables y específicas (no genéricas)
- Sin recomendaciones de herramientas internas (Apify, Claude, etc.)
- Organizadas por plataforma en recomendaciones

**Estructura de conclusiones por modo:**

**REGLAS PARA TODAS LAS CONCLUSIONES (OBLIGATORIO):**

1. **Siempre cuali + cuanti:** Cada sección (fortalezas, áreas de oportunidad, recomendaciones) debe mezclar hallazgos cuantitativos (con números, porcentajes, deltas) Y cualitativos (percepción, narrativa, tono, estrategia).

2. **Recomendaciones siempre en 2 bloques:**
   - **De contenido:** qué publicar, qué formato, qué narrativa, qué frecuencia
   - **Estratégicas:** crecimiento, comunidad, cross-platform, posicionamiento, depuración de perfil

3. **Hashtags:** NUNCA recomendar usar muchos hashtags. El CEO de Instagram ha declarado públicamente que la cantidad de hashtags no impacta el alcance. Recomendar máximo 3-5 relevantes y específicos. Mostrar los datos de uso de hashtags como información, no como recomendación de aumentar cantidad.

4. **Las conclusiones deben ser accionables y específicas**, nunca genéricas. Incluir el dato duro que las respalda. Ejemplo correcto: "Concentrar 80% del contenido en Lun/Mié/Vie entre 12-14h (donde ER es 7.0% vs 2.3% del domingo)". Ejemplo incorrecto: "Publicar en los mejores horarios".

#### Solo Listening:
- Hallazgos: percepción pública, cobertura editorial, alertas, temas dominantes
- Recomendaciones: gestión de reputación, respuesta a crisis, relación con medios

#### Solo Metrics:
- Hallazgos: rendimiento por plataforma, content mix, horarios, engagement
- Recomendaciones: qué publicar, cuándo, en qué formato, frecuencia

#### Combinado:
- Hallazgos: cruzan métricas + percepción + conversación
- Recomendaciones: por plataforma (IG, FB, YT, Web) con datos duros de ambas fuentes

## Comparativo entre meses

Cuando el usuario pide "compara febrero vs marzo" o "evolución mes a mes":

1. Necesita datos de ambos periodos (puede requerir 2 corridas de Apify)
2. Genera tabla comparativa lado a lado con deltas (↑↓)
3. Genera gráficas de tendencia (líneas) para métricas clave
4. Las conclusiones destacan qué mejoró, qué empeoró, y por qué

**Formato de tabla comparativa:**

| Métrica | Mes 1 | Mes 2 | Delta | Tendencia |
|---|---|---|---|---|
| Seguidores | 30,000 | 31,598 | +1,598 (+5.3%) | ↑ |
| Eng. Rate | 1.1% | 1.33% | +0.23% | ↑ |

## Estructura de archivos del skill

```
SKILL.md                          ← Este archivo
scripts/
  apify_integration.py            ← Script de integración con Apify API
references/
  apify-setup.md                  ← Configuración de actores por plataforma
  brand-se.md                     ← Paleta y reglas visuales Somos Estrategia
  brand-grow.md                   ← Paleta y reglas visuales GROW Marketing
  deploy-config.md                ← GitHub token, repos, dominios, flujo de deploy
```

## Dependencias

```bash
pip install matplotlib numpy pandas --break-system-packages
npm install docx pptxgenjs
```

## Checklist antes de entregar

- [ ] ¿Se preguntó al usuario tema claro/oscuro?
- [ ] ¿El periodo es correcto y consistente en todo el reporte?
- [ ] ¿Los datos son reales y verificados?
- [ ] ¿No hay URLs inventadas?
- [ ] ¿El sentimiento fue clasificado con el criterio correcto?
- [ ] ¿Se filtraron trolleos y ruido?
- [ ] ¿Las conclusiones cruzan datos de todas las fuentes?
- [ ] ¿No hay recomendaciones de herramientas internas?
- [ ] ¿El branding es el correcto (SE o GROW)?
- [ ] ¿El HTML tiene logo embebido como base64?
- [ ] ¿Las tablas tienen overflow-x:auto (scroll en móvil)?
- [ ] ¿Las conclusiones tienen hallazgos cuanti + cuali?
- [ ] ¿Las recomendaciones están separadas en contenido + estratégicas?
- [ ] ¿No se recomienda usar muchos hashtags?
- [ ] ¿El botón PDF existe y descarga slides + documento?
- [ ] ¿El PDF slides tiene fondo blanco, logo negro/color, footer?
- [ ] ¿Se deployó y se verificó HTTP 200?
- [ ] ¿Se entregó el link al usuario?
