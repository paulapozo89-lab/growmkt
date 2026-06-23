---
name: laura-aguilar-report
description: "Genera reportes semanales de presencia digital de Laura Aguilar Roldán (GROW). Scrapea IG con Apify, procesa CSVs de FB (Meta Business Suite), scrapea TikTok y X, genera gráficas matplotlib 300 DPI, arma PPTX con secciones separadas por portada (IG/FB/TK/X/Listening) o HTML con Chart.js interactivo, y hace deploy a reportes.growmkt.mx. Usa este skill cuando el usuario diga: 'reporte de Laura', 'reporte semanal Laura Aguilar', 'reporte GROW Laura', 'hazme el reporte de esta semana', 'reporte de redes Laura', 'social listening Laura', o suba CSVs de Meta Business Suite para la cuenta de Laura Aguilar. También se activa cuando se pide cualquier reporte de presencia digital de @lauaguilarro, LauAguilarQro, o Laura Aguilar Roldán en cualquier formato (HTML, PPTX, DOCX)."
---

# Reportes Semanales Laura Aguilar Roldán — GROW

Skill que genera reportes profesionales de presencia digital de Laura Aguilar Roldán, Coordinadora General de la Jefatura de Gabinete del Gobierno del Estado de Querétaro.

## Datos del cliente

| Campo | Valor |
|---|---|
| **Nombre** | Laura Aguilar Roldán |
| **Cargo** | Coordinadora General de la Jefatura de Gabinete |
| **Instagram** | @lauaguilarro |
| **Facebook** | LauAguilarQro |
| **TikTok** | @lauaguilarro |
| **X (Twitter)** | @LauAguilarro |
| **Branding** | GROW |
| **Repo deploy** | paulapozo89-lab/growmkt → reportes.growmkt.mx/reportes/ |
| **Narrativa Q2** | "Abrazando causas con el corazón en la gente" / "Las causas se convierten en soluciones" |

## KPIs Q2 2026

| KPI | Baseline | Meta |
|---|---|---|
| IG Engagement Rate | 0.20% | 1.0%+ |
| IG Seguidores | 16,190 | 17,500 |
| TikTok reproducciones | 141K | 200K+ |
| X seguidores | 85 | 500+ |

## Branding GROW — Reglas permanentes

| Elemento | Valor |
|---|---|
| Color principal (cyan) | `#2BAECC` |
| Color secundario (coral) | `#E5526C` |
| Color azul | `#2F95EA` |
| Color oscuro | `#1A1A1A` |
| Font | Inter (HTML) / Arial (PPTX, fallback) |
| Logo | `grow_logo_color.png` del skill content-grid-captioner → compositear sobre blanco antes de insertar en DOCX/PPTX |
| Logo fuente web | `https://growmkt.mx/assets/grow-logo-color-Dma9RsSM.png` |
| Fondo slides | SIEMPRE blanco — nunca fondo oscuro, ni en portada ni cierre |
| Logo GROW | SIEMPRE usar la imagen PNG real, NUNCA texto sustituto |

## Reglas críticas

1. **ChocoLau NO es de Laura Aguilar.** Nunca incluir en ningún entregable.
2. **Gráficas PPTX**: SIEMPRE matplotlib 300 DPI PNG insertadas con `addImage`. NUNCA `addChart` (Google Slides lo renderiza como imagen fallback). NUNCA shapes nativos simulando gráficas (pie charts salen negros, etiquetas se enciman).
3. **Sentimiento**: trolleo inter-partidista = neutro, NO negativo.
4. **Contenido**: nunca mencionar Apify, scraping o herramientas internas en reportes para cliente.
5. **Columnas CSV de FB**: cada post tiene múltiples filas (una por día). SUMAR todas las filas del mismo post_id para obtener acumulado real.
6. **Logo PNG**: compositear RGBA sobre fondo blanco RGB antes de insertar en DOCX/PPTX (transparencia causa fondo negro).

## Formatos de entrega

### PPTX (formato principal para entregas semanales)

**Estructura aprobada — ~20 slides con secciones separadas:**

```
1. Portada (fondo blanco, logo GROW, periodo actual + comparativo + plataformas)
2. KPIs globales (IG+FB+TK+X combinados, desglose por red en cada card)
3. PORTADA SECCIÓN Instagram
4. IG KPIs (8 cards: posts, likes prom, comments prom, ER, reels, views, saves/follows, seguidores)
5. IG Comparativa (gráfica matplotlib barras agrupadas)
6. IG Engagement Rate (gráfica + card de lectura)
7. IG Content Mix (gráfica pie + hallazgo)
8. IG Top Posts (gráfica barras horizontales + leyenda por tipo)
9. IG Tabla Posts (todos los posts con fecha, tipo, caption, likes, com, shares, saves, views, LINK clicable)
10. IG Horarios (gráfica doble eje: eng prom + n° posts por día + tabla detallada)
11. PORTADA SECCIÓN Facebook
12. FB KPIs (6 cards: posts, reactions, comments, shares, engagement, seg reproducidos)
13. FB Gráficas (comparativa semana vs semana + engagement por tipo)
14. FB Tabla Posts (detalle con reactions, comments, shares, seg reprod, LINK clicable)
15. PORTADA SECCIÓN TikTok
16. TK KPIs + Comparativa (cards + gráfica)
17. TK Tabla Videos (detalle con views, likes, comments, shares, saves, LINK clicable)
18. PORTADA SECCIÓN X (si hay actividad)
19. X KPIs + Tabla tweets (con links)
20. PORTADA SECCIÓN Social Listening
21. Listening medios + Sentimiento overview (panel doble)
22. Sentimiento detallado (donut matplotlib + tabla clasificación comentarios con links)
23. Notas y observaciones (5 cards con hallazgos)
24. Conclusiones (7 bullets con cyan dots)
25. Cierre (logo GROW + "LET'S GROW TOGETHER" + periodo)
```

**Nota:** El número de slides es flexible (17-25 según las plataformas activas). Si una plataforma no tiene actividad (ej. X con 0 tweets), incluir solo 1 slide con nota.

### HTML (formato para social listening mensual o reportes deployados)

- Chart.js interactivo (no imágenes)
- Logo embebido como base64
- `<meta name="robots" content="noindex, nofollow">`
- Responsive mobile con `overflow-x: auto` en tablas
- Deploy a GitHub → reportes.growmkt.mx

## Flujo de ejecución

### Paso 0: Confirmar periodo y datos disponibles

1. **Periodo actual**: ¿qué semana? (ej. 6-12 mayo 2026)
2. **Periodo comparativo**: semana anterior (ej. 27 abr - 3 may 2026)
3. **CSVs de FB**: ¿Paula los subió? Si no, pedir.
4. **Formato**: ¿PPTX o HTML? (default: PPTX)

### Paso 1: Recolección de datos

#### Instagram — Apify + CSV
- **Si hay CSV de Meta Business Suite**: usar el CSV (tiene shares, saves, follows que Apify no da)
- **Si no hay CSV**: scrapear con Apify actor `shu8hvrXbJbY3Eb9W`
  - Posts: `directUrls: ["https://www.instagram.com/lauaguilarro/"]`, `resultsType: "posts"`, `resultsLimit: 40`
  - Profile: `resultsType: "details"`, `resultsLimit: 1`
- **Para sentimiento**: SIEMPRE scrapear con Apify aunque haya CSV (el CSV no incluye texto de comentarios)
- Filtrar posts del periodo + calcular ER con followers actuales
- Filtrar solo `ownerUsername == 'lauaguilarro'`

#### Facebook — CSV de Meta Business Suite
- Paula sube el CSV manualmente (Meta bloquea todos los scrapers)
- **Deduplicar**: cada post tiene 1 fila por día del rango → `groupby(post_id).sum()` para métricas, `.first()` para metadata
- Si no hay CSV → incluir sección FB con nota "pendiente datos"

#### TikTok — Apify
- Actor: `clockworks~tiktok-profile-scraper`
- Input: `{"profiles": ["lauaguilarro"], "resultsPerPage": 30}`
- Filtrar por fecha del periodo
- Timeout: 300s

#### X (Twitter) — Apify
- Actor: `xtdata~twitter-x-scraper`
- Input: `{"twitterHandles": ["LauAguilarro"], "maxTweets": 30}`
- Filtrar por `author.screen_name == 'lauaguilarro'` (case insensitive)
- Filtrar por fecha del periodo
- **CUIDADO**: guardar respuesta con nombre de archivo DIFERENTE al de la variable de procesamiento (evitar sobrescribir)

#### Social Listening — Web Search
- 3-5 queries: `"Laura Aguilar" Querétaro [mes] [año]`, `"Laura Aguilar" aldialogo columna`, `"Laura Aguilar" 6enpunto OR expresoqueretaro OR criptica`
- Buscar: columnas Al Diálogo, coberturas terceras, apariciones radio, menciones negativas
- La columna sale los lunes en Al Diálogo (verificar en https://aldialogo.mx/autor/lauraaguilarroldan)

### Paso 2: Procesamiento y cálculos

#### Métricas IG
| Métrica | Fórmula |
|---|---|
| ER | (avg_likes + avg_comments) / followers × 100 |
| Impact score (top posts) | likes + comments×5 + views/50 |
| Posts/semana | posts / (días/7) |
| Content mix | Counter por type: Sidecar→Carrusel, Video→Video/Reel, Image→Imagen |

#### Sentimiento IG
- Keywords positivos: felicidades, bravo, excelente, gracias, hermosa, orgullo, amor, bendic, ❤, 💜, 👏, ✨, 💪, fuerza, apoyo, éxito, mejor, guapa, bella, feliz, 🎂, 🩷
- Keywords negativos: corrup, mentir, fals, lad, ratera, robo, inútil, mediocre, odio, asco, farsa, demagog, hipócrita, vergüenza, traidor
- Score = (pos - neg) / total × 100
- Trolleo inter-partidista = NEUTRO, no negativo

#### Deltas
- Delta % = ((actual - pasado) / pasado) × 100
- Indicador: ▲ si positivo, ▼ si negativo
- Color: cyan si favorable, coral si desfavorable

### Paso 3: Gráficas matplotlib 300 DPI

**Estilo obligatorio:**
```python
CYAN='#2BAECC'; CORAL='#E5526C'; DARK='#1A1A1A'; GRAY='#666666'; BLUE='#2F95EA'
plt.rcParams.update({
    'font.family': 'DejaVu Sans', 'font.size': 14,
    'axes.edgecolor': '#CCC', 'axes.spines.top': False, 'axes.spines.right': False
})
# Guardar con: dpi=300, bbox_inches='tight', facecolor='white', edgecolor='none'
```

**Gráficas a generar:**
1. `ig_comparativa` — barras agrupadas (gris=pasado, cyan=actual) para Posts, Likes prom, Comments prom, ER
2. `ig_er` — 3 barras: pasado (gris), actual (cyan), meta Q2 (coral) + línea punteada meta
3. `ig_content_mix` — pie chart con colores por tipo (cyan=carrusel, coral=reel, blue=imagen)
4. `ig_top_posts` — barras horizontales ordenadas por impact, colores por tipo, detalles L/C/V al lado
5. `ig_horarios` — doble eje: barras (eng prom, cyan) + línea (n° posts, coral)
6. `sentimiento` — donut con hueco central mostrando Score, colores cyan/gris/coral
7. `fb_engagement` — 3 barras: reactions (cyan), comments (coral), shares (blue)
8. `fb_comparativa` — barras agrupadas FB semana vs semana
9. `tk_comparativa` — barras agrupadas TK semana vs semana (si hay datos)

### Paso 4: Construcción del PPTX

**Dependencia**: `pptxgenjs` via Node.js
```bash
npm install pptxgenjs  # si no está instalado
NODE_PATH=$(npm root -g) node build.js
```

**Helpers reutilizables del script:**
- `footer(slide)` — texto pie + logo GROW en esquina inferior derecha
- `eye(slide, text)` — eyebrow cyan en mayúsculas con letter-spacing
- `stit(slide, text)` — título grande en dark
- `ci(slide, name, x, y, w, h)` — insertar gráfica matplotlib
- `kpiCard(slide, x, y, w, h, label, value, delta, deltaColor, sub)` — tarjeta KPI reutilizable
- `sect(title, subtitle)` — slide divisor de sección con línea cyan

**Tablas con links clicables:**
```javascript
{text: "Ver ↗", options: {
  color: T, bold: true, fontSize: 7, fontFace: F,
  align: "center", valign: "middle",
  hyperlink: {url: post.url}
}}
```

### Paso 5: Deploy (solo HTML)

1. Generar HTML con Chart.js interactivo
2. Embeber logo como base64
3. Generar hash de 6 chars para URL
4. Push a GitHub via API (fetch SHA primero si existe)
5. Esperar ~30s, verificar HTTP 200
6. Entregar link

### Paso 6: Verificación

- [ ] ¿Periodo correcto y consistente en portada, KPIs, gráficas?
- [ ] ¿Datos reales verificados? (no inventados)
- [ ] ¿Todos los posts con links clicables?
- [ ] ¿Sentimiento clasificado correctamente?
- [ ] ¿ChocoLau excluida?
- [ ] ¿Branding GROW correcto? (colores, logo real, fondo blanco)
- [ ] ¿Gráficas son matplotlib PNG, no addChart ni shapes?
- [ ] ¿FB deduplicado correctamente del CSV?
- [ ] ¿Secciones separadas por portada?
- [ ] ¿KPIs globales indican "IG+FB+TK+X combinados"?

## Datos del periodo pasado como referencia

Los datos del periodo anterior se guardan en archivos JSON en el workspace:
- `s3_metrics.json` — métricas consolidadas del periodo previo
- `s3_posts.json` — posts IG del periodo previo
- `fb_semana.json` — FB del periodo previo
- `tk_sem2.json` — TK del periodo previo
- `x_sem2.json` — X del periodo previo

Si estos archivos no existen (primera vez), scrapear el periodo comparativo completo con Apify.

## Archivos de referencia

- Leer `references/data-sources.md` para configuración detallada de cada fuente de datos

## Generación del PPTX (sin template externo)

No hay un script template pre-armado. Generar el PPTX desde cero con **pptxgenjs**, siguiendo la estructura de ~20 slides documentada arriba ("Estructura aprobada"):

1. Leer primero `/mnt/skills/public/pptx/pptxgenjs.md` para la referencia de la librería.
2. Construir el deck respetando: fondo SIEMPRE blanco, secciones separadas por portada (IG/FB/TK/X/Listening), logo GROW real PNG (nunca texto), gráficas matplotlib 300 DPI insertadas con `addImage` (NUNCA `addChart` ni shapes nativos), tablas con columna de LINK clicable.
3. Helpers recomendados a definir inline en el script: `eye(slide, text)` (eyebrow cyan en mayúsculas con letter-spacing) y `sect(title, subtitle)` (slide divisor con línea cyan).
4. Paleta a usar en todo el deck: cyan `#2BAECC`, coral `#E5526C`, azul `#2F95EA`, oscuro `#1A1A1A`.

Si en el futuro se estabiliza un template reutilizable, guardarlo como `references/pptx-template.md` y volver a referenciarlo aquí.
