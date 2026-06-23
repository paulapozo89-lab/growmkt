# Data Sources — Laura Aguilar Reports

## Apify Token
```
$APIFY_TOKEN   # configurado en ~/.zshrc (NO hardcodear)
```
NUNCA mencionar Apify en reportes para cliente.

## Instagram — Apify Actor shu8hvrXbJbY3Eb9W

### Posts
```bash
curl -X POST "https://api.apify.com/v2/acts/shu8hvrXbJbY3Eb9W/run-sync-get-dataset-items?token=$TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"directUrls":["https://www.instagram.com/lauaguilarro/"],"resultsType":"posts","resultsLimit":40,"addParentData":false}'
```
- Filtrar: `ownerUsername == 'lauaguilarro'`
- Campos clave: `timestamp`, `likesCount`, `commentsCount`, `videoPlayCount`, `videoViewCount`, `type` (Sidecar/Video/Image), `url`, `shortCode`, `caption`, `latestComments[]`
- Timeout: 600s

### Profile
```bash
curl -X POST "https://api.apify.com/v2/acts/shu8hvrXbJbY3Eb9W/run-sync-get-dataset-items?token=$TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"directUrls":["https://www.instagram.com/lauaguilarro/"],"resultsType":"details","resultsLimit":1}'
```
- Campos: `followersCount`, `followsCount`, `biography`, `postsCount`

### IG CSV de Meta Business Suite
Cuando Paula sube un CSV de IG, la estructura incluye:
- `Nombre de usuario de la cuenta` — filtrar por `lauaguilarro`
- `Fecha` — incluye fila "Total" que tiene acumulado
- Usar filas "Total" para cada post
- Campos extra vs Apify: `Veces que se compartió`, `Veces que se guardó`, `Alcance`, `Seguimientos`

## Facebook — CSV de Meta Business Suite

Paula sube el CSV manualmente. Meta bloquea TODOS los scrapers.

### Estructura del CSV
- Cada post tiene múltiples filas (1 por día del rango seleccionado)
- `identificador de la publicación` / `Identificador de la publicación` — ID único del post
- Para obtener el acumulado real: `groupby('post_id').agg({'Reacciones':'sum', 'Comentarios':'sum', 'Veces que se compartió':'sum', 'Segundos reproducidos':'sum', 'Título':'first', 'Hora de publicación':'first', 'Enlace permanente':'first', 'Tipo de publicación':'first'})`
- El campo de shares puede ser `Veces que se ha compartido` o `Veces que se compartió` (varía entre exportaciones)
- Encoding: `utf-8-sig` (BOM)

### Datos disponibles
- Reacciones, Comentarios, Shares, Segundos reproducidos
- Tipo de publicación (generalmente "Vídeos" = Reels)
- Enlace permanente (link directo al reel/post)
- NO incluye: followers de la página, reach, impressions

## TikTok — Apify Actor clockworks~tiktok-profile-scraper

```bash
curl -X POST "https://api.apify.com/v2/acts/clockworks~tiktok-profile-scraper/run-sync-get-dataset-items?token=$TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"profiles":["lauaguilarro"],"resultsPerPage":30,"shouldDownloadVideos":false,"shouldDownloadCovers":false}'
```
- Campos: `createTimeISO`, `text`, `diggCount` (likes), `playCount` (views), `commentCount`, `shareCount`, `collectCount` (saves), `webVideoUrl`
- Timeout: 300s

## X (Twitter) — Apify Actor xtdata~twitter-x-scraper

```bash
curl -X POST "https://api.apify.com/v2/acts/xtdata~twitter-x-scraper/run-sync-get-dataset-items?token=$TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"twitterHandles":["LauAguilarro"],"maxTweets":30,"proxyConfiguration":{"useApifyProxy":true}}'
```
- Filtrar: `author.screen_name.lower() == 'lauaguilarro'`
- Campos: `full_text`, `created_at` (formato: `'%a %b %d %H:%M:%S %z %Y'`), `favorite_count`, `retweet_count`, `reply_count`, `views.count`, `url`
- **CUIDADO**: guardar respuesta con nombre de archivo distinto al de procesamiento posterior (ej. `x_data.json`, no `x_raw3.json` que se sobrescribe)
- Followers: `data[0].author.followers_count`

## Social Listening — Web Search

### Queries a ejecutar (3-5)
1. `"Laura Aguilar" Querétaro [mes] [año]`
2. `"Laura Aguilar" aldialogo columna [mes] [año]`
3. `"Laura Aguilar" "ser yo sin dejar" OR "Jefatura de Gabinete" [mes] [año]`
4. `"Lau Aguilar" OR "Laura Aguilar Roldán" site:6enpunto.mx OR site:expresoqueretaro.com`

### Fuentes a monitorear
| Fuente | Tipo | Frecuencia esperada |
|---|---|---|
| Al Diálogo | Columna propia | Semanal (lunes) |
| Publimetro | Columna propia | Semanal (jueves) |
| 6enpunto.mx | Cobertura tercera | Esporádica |
| Expreso Querétaro | Cobertura tercera | Esporádica |
| Críptica Querétaro | Cobertura tercera | Esporádica |
| El Queretano | Cobertura tercera | Esporádica |
| Noticias de Querétaro | Cobertura tercera | Esporádica |
| Radar Querétaro / Stereo Cristal 101.1 | Radio | Esporádica (ver posts de Laura en IG) |

### Clasificar cada mención
- Fecha, Medio, Tipo (columna propia / cobertura tercera / radio / mención), Título, Tono (positivo/neutro/negativo), URL
