---
name: social-listening
description: "Social listening + social media metrics + combined reporting. Generates branded reports (HTML + PDF slides + Word) with auto-deploy. 3 modes: solo listening, solo metrics, combined. Dual branding SE/GROW. Covers Instagram, Facebook, TikTok, YouTube, X/Twitter, and web mentions. Supports manual data input (user types numbers in chat) and multi-account benchmarking side-by-side. Triggers: 'social listening', 'monitoreo de marca', 'reporte de redes', 'reporte integral', 'reporte completo', 'métricas de redes', 'engagement report', 'benchmarking', 'escucha social', 'menciones de marca', 'qué se dice de', 'share of voice', 'analizar cuenta', 'comparar meses', 'reporte combinado', 'reporte de X', 'reporte de Twitter', 'reporte de Instagram', 'reporte de TikTok', 'reporte de Facebook', 'reporte de YouTube', 'comparar cuentas'. Also triggers on Apify CSV/JSON uploads or Meta Business Suite exports. Use for any social/digital analytics report request."
---

# Social Listening + Social Media Reports — Skill Unificado (v5.2 self-contained)

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
| **Logo SE fuente** | `~/somosestrategia/public/` (cyan, negro y blanco transparent) | — |
| **Logo GROW fuente** | — | `https://growmkt.mx/assets/grow-logo-color-Dma9RsSM.png` |

**Reglas de logo (ambas marcas):**
- SIEMPRE usar la imagen PNG real del logo, NUNCA texto sustituto
- SE en todo caps: SOMOS ESTRATEGIA, sin "+"
- PNG con transparencia → compositear sobre el fondo destino (skill `image-handler`) antes de insertar en DOCX/PPTX; en HTML embeber base64 con transparencia intacta
- Proporciones: height = width / (original_width / original_height). NUNCA estirar ni comprimir

## ⚠️ Reglas de terminología y exclusiones (OBLIGATORIAS, no preguntar)

1. **"Total de interacciones"** — NUNCA usar "Engagement total" en ningún entregable (HTML, PPTX, DOCX, gráficas, conclusiones).
2. **Exclusión política por default:** Adrián Alvaradejo y Carlos Retes NUNCA aparecen en listening, monitoreo, benchmarks ni menciones, salvo que Paula lo pida explícitamente para una tarea específica.
3. **No conectar a Agustín Dorantes con otros actores políticos** en análisis o conclusiones salvo petición explícita.
4. **Nunca mencionar herramientas internas** (Apify, Claude, scrapers, MCP) en entregables para cliente.
5. **Nunca fabricar datos, URLs ni métricas.** Sin dato → "No disponible".

## ⚡ Pipeline Automatizado (Vercel Serverless)

Existe un formulario web que genera reportes automáticamente sin intervención manual:
- **URL**: `somosestrategia.vercel.app/reportes/nuevo.html` (protegido con password — Paula lo gestiona, no documentarlo aquí)
- **Endpoint**: `/api/generate-report.js` en Vercel Pro (maxDuration: 300s)
- **Flow**: Form → Apify IG → Claude ×3 secuencial (análisis + propuesta + listening) → HTML con 15 gráficas Chart.js → GitHub → link automático

### Limitaciones del pipeline automatizado:
- **Facebook**: Para cliente SE usa **Metricool MCP** (confiable). Para cliente GROW: preguntar a Paula si pasa archivo de Meta Business Suite o si se scrapea. Para páginas con acceso admin propio: Meta Graph API. Para competidores sin acceso: web_search (intermitente). Scrapers de Apify NO funcionan (bloqueados por FB).
- **Rate limit Anthropic**: 30K tokens/min — las 3 llamadas a Claude corren en secuencia con 15s delay entre cada una
- **Tiempo total**: ~180s por reporte combinado
- **Labels**: Todas en español (Prom. Likes, Comentarios por Mes, etc.)

### Cuándo usar el pipeline vs la skill manual:
- **Pipeline (formulario)**: Reportes estándar de clientes, cualquier persona puede solicitarlos
- **Skill manual (aquí en Claude)**: Reportes que requieren mayor calidad, análisis profundo, reportes con múltiples plataformas o FB de competidores, presentaciones PPTX, documentos Word

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

**Configuración de actores Apify (cuenta `polito_mkt`) — inline, no requiere archivos externos:**

| Plataforma | Actor | Input clave | Estado |
|---|---|---|---|
| Instagram (perfil) | `shu8hvrXbJbY3Eb9W` | `directUrls: ["https://instagram.com/{user}/"]`, `resultsType: "details"`, `resultsLimit: 1` | ✅ Probado |
| Instagram (posts) | `shu8hvrXbJbY3Eb9W` | `resultsType: "posts"`, `resultsLimit: 40-50` | ✅ Probado |
| Instagram (comments) | `shu8hvrXbJbY3Eb9W` | `resultsType: "comments"` sobre URLs de posts | ✅ Probado |
| TikTok | `clockworks~tiktok-profile-scraper` | `{"profiles": ["{user}"], "resultsPerPage": 30}`, timeout 300s | ✅ Probado (reportes Laura) |
| X / Twitter | `xtdata~twitter-x-scraper` | `{"twitterHandles": ["{user}"], "maxTweets": 30}`, filtrar `author.screen_name` case-insensitive | ✅ Probado (reportes Laura) |
| YouTube | `bernardo~youtube-scraper` | búsqueda por canal o keyword | ⚠️ No fully tested |
| Facebook Comments | `us5srxAYnsrkgUv2v` | URLs de posts | ⚠️ Intermitente |
| Facebook Posts/Pages | — | **NINGÚN scraper de Apify funciona** (bloqueados, probado mar 2026). Usar rutas de la sección Facebook abajo | 🚫 |

Reglas de uso: filtrar siempre por `ownerUsername`/`screen_name` del sujeto y por rango de fechas del periodo. Guardar la respuesta cruda con nombre de archivo distinto al de la variable de procesamiento (evitar sobrescribir).

#### Para Listening:
1. **Web search** — Buscar menciones en medios usando el buscador. 3-5 queries con keywords del sujeto.
2. **Instagram** — Actor `shu8hvrXbJbY3Eb9W` (requiere URL de perfil, resultsType: "posts")
3. **YouTube Search** — Actor `bernardo~youtube-scraper`
4. **Facebook Comments** — Actor `us5srxAYnsrkgUv2v` (requiere URLs de posts)

#### Para Metrics:
1. **Instagram Profile** — Actor `shu8hvrXbJbY3Eb9W` (resultsType: "details") ✅
2. **Instagram Posts** — Actor `shu8hvrXbJbY3Eb9W` (resultsType: "posts", limit 50+) ✅
3. **Facebook** — La ruta depende del branding del reporte:
   - **Cliente SE** → usar **Metricool MCP** (credenciales en `~/.zshrc`: blogId=3780305, userId=369001). Es la ruta confiable y siempre disponible.
   - **Cliente GROW** → **preguntar a Paula primero**: (a) ¿me pasas el export de Meta Business Suite (CSV)?, o (b) ¿scrapeamos?
   - **Páginas con acceso admin propio (cualquier marca)** → Meta Graph API con `FB_GRAPH_TOKEN`.
   - **Competidores sin acceso admin** → Claude web_search (intermitente). Scrapers de Apify NO funcionan (todos bloqueados por FB, probados mar 2026).
4. **TikTok** — Actor `clockworks~tiktok-profile-scraper` (✅ probado en producción)
5. **X / Twitter** — Actor `xtdata~twitter-x-scraper` (✅ probado en producción)
6. **YouTube** — Actor `bernardo~youtube-scraper` (no fully tested)

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

**Configuración de deploy — inline, no requiere archivos externos:**

| Config | SE | GROW |
|---|---|---|
| Repo | `paulapozo89-lab/somosestrategia` | `paulapozo89-lab/growmkt` |
| Dominio | `somosestrategia.vercel.app` | `reportes.growmkt.mx` |
| Ruta destino | `/reportes/` | `/reportes/` |

**Token:** SIEMPRE `$GITHUB_DEPLOY_TOKEN` desde variable de entorno. NUNCA hardcodear tokens en scripts, commits ni en este skill. Si la variable no está disponible, pedírsela a Paula — no improvisar.

**Git SE:** siempre `git pull --rebase && git push` (el bot de briefings acumula commits en remoto). GROW: inyección explícita del token en la URL del push.

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

## Benchmarking multi-cuenta (side-by-side)

Cuando el usuario pide comparar 2+ cuentas distintas (ej: "compara a Dorantes vs Felifer Macías", "benchmark de las 3 marcas de hotel"):

1. **Recolectar datos de cada cuenta por separado** (una corrida de Apify por cuenta)
2. **Generar tabla comparativa side-by-side** con columna por cuenta y filas por métrica
3. **Generar charts de barras side-by-side** (no overlay) para: Seguidores, Engagement Rate, Posts/Semana, Views Promedio
4. **Color-code en la tabla**: verde (#00A87D) para la cuenta ganadora por métrica, rojo (#FF6B6B) para la perdedora
5. **Conclusiones cruzadas**: identificar fortalezas y debilidades relativas de cada cuenta

**Formato tabla benchmark:**

| Métrica | Cuenta A | Cuenta B | Cuenta C | Líder |
|---|---|---|---|---|
| Seguidores | 30,000 🟢 | 18,500 | 12,200 🔴 | A |
| Eng. Rate | 1.3% | 2.8% 🟢 | 0.9% 🔴 | B |
| Posts/Semana | 4.2 | 3.1 | 6.5 🟢 | C |

## Inputs manuales (datos sin archivo)

Cuando el usuario NO sube un CSV/JSON y en su lugar escribe los números directamente en el chat (ej: "mi cuenta tiene 12,500 seguidores, 850 likes promedio, 45 comentarios promedio, 8 posts al mes"):

1. **Parsear lo que esté disponible** (followers, likes, comentarios, posts)
2. **Generar reporte con secciones disponibles** únicamente
3. **Marcar secciones sin datos** como `[DATOS PENDIENTES — requiere scrape de perfil/posts]`
4. **Calcular métricas derivadas** solo si los inputs lo permiten (ej: ER necesita followers + likes promedio)
5. **NO inventar datos faltantes**. Mejor decir "No disponible" o pedir scrape adicional.

**Casos típicos:**
- Solo perfil (sin posts): genera card de overview + nota "se requiere scrape de publicaciones"
- Solo posts (sin perfil): omite seguidores y ER, mantén lo demás
- Datos parciales: marca campos faltantes, NO uses placeholders genéricos

## Estructura de archivos del skill

```
SKILL.md    ← Este archivo. SELF-CONTAINED (v5.2): toda la configuración
              (branding, actores Apify, deploy) está inline. No depende
              de carpetas references/ ni scripts/ externos.
```

Para llamar la API de Apify directamente: `https://api.apify.com/v2/acts/{actor_id}/run-sync-get-dataset-items?token=$APIFY_TOKEN` (token desde env var, nunca hardcodear).

## Dependencias

```bash
pip install matplotlib numpy pandas --break-system-packages
npm install docx pptxgenjs
```

## Manejo de NaN (técnico — exportar a JSON)

Cuando se exportan datos de pandas/numpy a JSON para alimentar el docx-js o pptxgenjs, los valores `NaN` rompen el parser. Siempre limpiar antes:

```python
import json, math

def clean_nan(obj):
    if isinstance(obj, float) and math.isnan(obj):
        return None
    if isinstance(obj, dict):
        return {k: clean_nan(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [clean_nan(v) for v in obj]
    return obj

# Uso:
data_clean = clean_nan(data)
json.dump(data_clean, open('data.json', 'w'))
```

Aplicar también cuando se calculen métricas con divisiones (ej: engagement rate cuando followers=0).

## Checklist antes de entregar

- [ ] ¿Se preguntó al usuario tema claro/oscuro?
- [ ] ¿El periodo es correcto y consistente en todo el reporte?
- [ ] ¿Los datos son reales y verificados?
- [ ] ¿No hay URLs inventadas?
- [ ] ¿El sentimiento fue clasificado con el criterio correcto?
- [ ] ¿Se filtraron trolleos y ruido?
- [ ] ¿Las conclusiones cruzan datos de todas las fuentes?
- [ ] ¿No hay recomendaciones de herramientas internas?
- [ ] ¿Se usó "Total de interacciones" (NUNCA "Engagement total") en todos los entregables?
- [ ] ¿Se respetaron las exclusiones políticas por default (Alvaradejo, Retes)?
- [ ] ¿El branding es el correcto (SE o GROW)?
- [ ] Si hay datos de Facebook: ¿se usó la ruta correcta? (SE → Metricool MCP; GROW → archivo o scrape confirmado con Paula)
- [ ] ¿El HTML tiene logo embebido como base64?
- [ ] ¿Las tablas tienen overflow-x:auto (scroll en móvil)?
- [ ] ¿Las conclusiones tienen hallazgos cuanti + cuali?
- [ ] ¿Las recomendaciones están separadas en contenido + estratégicas?
- [ ] ¿No se recomienda usar muchos hashtags?
- [ ] ¿El botón PDF existe y descarga slides + documento?
- [ ] ¿El PDF slides tiene fondo blanco, logo negro/color, footer?
- [ ] ¿Se deployó y se verificó HTTP 200?
- [ ] ¿Se entregó el link al usuario?
