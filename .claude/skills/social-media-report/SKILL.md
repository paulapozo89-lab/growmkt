---
name: social-media-report
description: "Generate professional social media analysis reports as branded Word documents (.docx) with charts, tables, and Somos Estrategia branding. Use this skill whenever the user wants to create a social media report, analyze Instagram/TikTok/Facebook/X metrics, generate engagement reports, create audience growth analysis, compare or benchmark social media accounts, or produce any social media analytics document. Also triggers when the user uploads CSV or JSON data from Apify, Meta Business Suite, or any social media scraper/export and wants it analyzed or turned into a report. Trigger keywords: 'reporte de redes', 'análisis de redes sociales', 'social media report', 'engagement report', 'benchmarking redes', 'métricas de redes', 'Instagram report', 'reporte Instagram', 'analizar cuenta', 'scraping redes'. Even if the user just uploads an Apify CSV without explicit instructions, use this skill to process it."
---

# Social Media Report Generator

Generates branded `.docx` reports with embedded charts (matplotlib → PNG) and formatted tables from social media data exports (Apify CSV/JSON, Meta Business Suite, manual input).

## Brand Identity — SOMOS ESTRATEGIA

All reports use this palette:

| Token | Hex | Usage |
|-------|-----|-------|
| PRIMARY_CYAN | `#00F0C8` | Accents, KPI numbers, table headers text, chart lines |
| BLACK | `#000000` | Primary text |
| DARK_GRAY | `#1A1A1A` | Table header backgrounds, KPI card backgrounds |
| MID_GRAY | `#B8B8B8` | Borders, secondary text, footer |
| LIGHT_GRAY | `#E0E0E0` | Table borders, grid lines |
| VERY_LIGHT | `#F5F5F5` | Alternating table row shading |
| WHITE | `#FFFFFF` | Page background, chart background |

Brand name in all documents: **SOMOS ESTRATEGIA** (no "+", no "plus").

## Workflow

### Step 0: Check for uploaded data

```bash
ls ./data/*.csv ./data/*.json ./data/*.xlsx 2>/dev/null
```

Look for Apify exports, Meta Business Suite exports, or any social media data files.

### Step 1: Read the docx skill

Always read `docx best practices` before generating the document. Follow its rules for tables, images, validation, etc.

### Step 2: Analyze the data

Read the scripts in this skill's `scripts/` folder:
- `scripts/analyze_and_chart.py` — Data analysis + chart generation
- `scripts/build_docx.js` — Document assembly with docx-js

These are **reference implementations**. Adapt column names, metrics, and sections based on what data is actually available. The scripts handle the most common Apify Instagram export format.

### Step 3: Detect data format

Apify Instagram exports typically have these key columns:
- `caption`, `commentsCount`, `likesCount`, `timestamp`, `type`, `url`, `shortCode`
- `ownerUsername`, `ownerFullName`, `videoPlayCount`, `videoViewCount`, `videoDuration`
- `productType` (clips = Reel, igtv = IGTV)
- `hashtags/0`, `hashtags/1`, etc.

Profile scrapes (single row) have:
- `biography`, `followersCount`, `followsCount`, `postsCount`, `username`, `fullName`

If column names don't match, auto-detect by inspecting the first few rows and mapping to the closest equivalent.

### Step 4: Generate charts with matplotlib

**CRITICAL rules:**
- Always `matplotlib.use('Agg')` (no display)
- Save at 300 DPI as PNG
- Use brand colors for ALL visual elements
- White background on all charts
- Clean style: no top/right spines, light grid, Arial font

**Charts to generate (in order of priority):**

1. **Posts per month** — Bar chart showing publishing frequency over time
2. **Engagement by content type** — Horizontal bar comparing Reels vs Carruseles vs Imagen etc.
3. **Likes distribution** — Histogram showing how likes are distributed across posts
4. **Posting heatmap** — Day of week × hour matrix showing when posts are published
5. **Content type pie** — Donut chart showing content mix (Reel %, Carrusel %, Imagen %)
6. **Reel views evolution** — Bar + rolling average line for video views over time (if video data available)

### Step 5: Build the DOCX

Use `docx-js` (npm). Key structural rules from the docx skill:
- US Letter: 12240 × 15840 DXA, 1" margins (1440 DXA)
- Content width: 9360 DXA
- Always use `WidthType.DXA` (never percentages)
- `ShadingType.CLEAR` (never SOLID)
- Set both `columnWidths` AND cell `width`
- Arial font throughout

**Report structure (7 sections, always in Spanish):**

#### Portada
- Brand bar with "SOMOS ESTRATEGIA" in cyan
- "REPORTE DE REDES SOCIALES" large title
- Platform name (INSTAGRAM, TIKTOK, etc.) in cyan
- Client name, account handle, period, generation date
- "Documento confidencial | Somos Estrategia"

#### 1. Resumen Ejecutivo
- Profile overview card (dark background, cyan account name, bio in gray italic)
- 2 rows of KPI cards (dark bg, large cyan numbers): Seguidores, Siguiendo, Posts, Engagement Rate, Likes Prom, Comentarios Prom, Posts/Semana, Views Prom/Reel
- Key findings paragraph

#### 2. Actividad de Publicación
- Posts per month chart
- Monthly detail table (Mes, Posts, Likes, Comentarios, Likes Promedio)

#### 3. Engagement por Tipo de Contenido
- Engagement by type chart
- Type comparison table (Tipo, Cantidad, Likes Prom, Coment Prom, Engage Prom)
- Content type pie chart
- Likes distribution chart

#### 4. Top 10 Publicaciones
- Table: #, Fecha, Tipo, Contenido (caption truncado 80 chars), Likes, Comentarios

#### 5. Rendimiento de Reels (if video data available)
- Reel views evolution chart
- Key stats: count, avg views, max views

#### 6. Frecuencia y Horarios
- Posting heatmap chart
- Day-of-week table (Día, Posts, Likes Prom, Engage Prom)
- Top hashtags table (Hashtag, Frecuencia)

#### 7. Conclusiones y Recomendaciones
- Diagnóstico General (paragraph with real numbers)
- Fortalezas (numbered list as paragraphs)
- Áreas de Oportunidad (numbered list with specific actionable items)
- Plan de Acción Recomendado (numbered strategic recommendations)
- Closing brand bar

**Table styling:**
```javascript
// Header cells: dark bg (#1A1A1A) + cyan text (#00F0C8)
// Data cells: alternating white/#F5F5F5 + black text
// Highlight values: green #00A87D for positive metrics
// Border: 1px #E0E0E0 on all cells
// Cell margins: top:80, bottom:80, left:120, right:120
```

**KPI card styling:**
```javascript
// Background: #1A1A1A
// Number: bold, #00F0C8, size 44pt
// Label: #FFFFFF, size 16pt
// No visible borders
```

### Step 6: Validate and deliver

```bash
python validate.py report.docx
cp report.docx ./output/Reporte_Redes_{Client}_{YYYY-MM}_{Platform}.docx
```

## Handling different scenarios

### Only posts data (no profile)
- Skip follower count and engagement rate calculation
- Note in report: "Engagement rate no disponible — se requiere scrape de perfil"
- Still generate all other sections

### Only profile data (no posts)
- Generate a profile overview card only
- Note: "Se requiere scrape de publicaciones para análisis completo"

### Both datasets
- Merge: use followers from profile, metrics from posts
- Calculate real engagement rate: (avg_likes + avg_comments) / followers × 100

### Manual data (user types numbers in chat)
- Parse what's available
- Generate report with available sections only
- Mark missing sections as "[DATOS PENDIENTES]"

### Multiple accounts (benchmarking)
- Add "Benchmarking Comparativo" section
- Side-by-side bar charts
- Color-coded comparison table (green = winning, red = losing)

## Key metrics calculated

| Metric | Formula |
|--------|---------|
| Engagement Rate | (avg likes + avg comments) / followers × 100 |
| Follow Ratio | followers / following |
| Posts per Week | total posts / (date range in weeks) |
| Content Type | Video+clips=Reel, Video+igtv=IGTV, Sidecar=Carrusel, Image=Imagen |
| Total Engagement | likes + comments per post |

## Dependencies

```bash
pip install matplotlib numpy pandas openpyxl --break-system-packages
npm install -g docx
```

## File naming

```
Reporte_Redes_{ClientName}_{YYYY-MM}_{Platform}.docx
```

## NaN handling

When exporting data to JSON for the docx builder, always replace NaN with null:
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
```
