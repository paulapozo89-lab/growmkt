# Guía de Configuración — Apify para Social Listening

Guía paso a paso para configurar scrapers de Apify para monitoreo de marca en las 4 plataformas principales.

## Tabla de contenidos

1. Actors recomendados por plataforma
2. Configuración de Facebook
3. Configuración de Instagram
4. Configuración de YouTube
5. Configuración de X/Twitter
6. Automatización (Schedules)
7. Exportación de datos
8. Formato de columnas esperado por el skill

---

## 1. Actors Recomendados

| Plataforma | Actor Recomendado | URL en Apify | Tipo de búsqueda |
|---|---|---|---|
| **Facebook** | Facebook Posts Search (scraper_one) | `apify/facebook-posts-search` | Por keyword |
| **Facebook** | Facebook Search Scraper (alien_force) | `alien_force/facebook-search-scraper` | Por keyword + filtros de fecha |
| **Instagram** | Instagram Scraper | `apify/instagram-scraper` | Por hashtag o perfil |
| **YouTube** | YouTube Scraper | `bernardo/youtube-scraper` o `streamers/youtube-scraper` | Por keyword |
| **X/Twitter** | Twitter/X Scraper | `apidojo/tweet-scraper` o `microworlds/twitter-scraper` | Por keyword |

### Costos aproximados (créditos Apify)

- Facebook: ~$0.35 por cada 1,000 posts
- Instagram: ~$0.50-1.00 por cada 1,000 posts
- YouTube: ~$0.25 por cada 1,000 videos
- X/Twitter: ~$0.50 por cada 1,000 tweets

El plan gratuito de Apify incluye $5 de créditos mensuales, suficiente para ~5,000-10,000 menciones según la plataforma.

---

## 2. Facebook — Configuración

### Actor: Facebook Posts Search

**Input JSON para social listening por keyword:**

```json
{
  "searchQueries": [
    "Agustín Dorantes",
    "Dorantes Lámbarri",
    "senador Querétaro PAN"
  ],
  "maxResults": 200,
  "since": "7d",
  "proxy": {
    "useApifyProxy": true
  }
}
```

**Campos que exporta (los que usa el skill):**

| Campo Apify | Uso en el skill |
|---|---|
| `postText` | Contenido de la mención (para análisis de sentimiento) |
| `url` | URL de la mención |
| `timestamp` / `publishedAt` | Fecha de publicación |
| `authorName` | Autor / fuente |
| `likes` / `reactions` | Interacciones |
| `comments` | Cantidad de comentarios |
| `shares` | Compartidos |

### Actor alternativo: Facebook Search Scraper (alien_force)

Tiene filtros más avanzados:

```json
{
  "keyword": "Agustín Dorantes",
  "search_type": "posts",
  "since": "7d",
  "start_date": "2026-03-01",
  "end_date": "2026-03-10",
  "maxResults": 200
}
```

---

## 3. Instagram — Configuración

### Actor: Instagram Scraper (ya lo tienes)

Para social listening se usa en **modo hashtag** o **modo búsqueda**:

```json
{
  "search": "AgustínDorantes",
  "searchType": "hashtag",
  "resultsLimit": 100,
  "proxy": {
    "useApifyProxy": true
  }
}
```

**Para monitorear menciones en posts de cuentas específicas:**

```json
{
  "directUrls": [
    "https://www.instagram.com/agusdorantes/"
  ],
  "resultsType": "posts",
  "resultsLimit": 50
}
```

**Campos que exporta:**

| Campo Apify | Uso en el skill |
|---|---|
| `caption` | Contenido (sentimiento) |
| `url` / `shortCode` | URL de la mención |
| `timestamp` | Fecha |
| `ownerUsername` | Autor |
| `likesCount` | Likes |
| `commentsCount` | Comentarios |
| `videoPlayCount` | Views (si es Reel/video) |
| `hashtags` | Hashtags asociados |

---

## 4. YouTube — Configuración

### Actor: YouTube Scraper

```json
{
  "searchKeywords": [
    "Agustín Dorantes",
    "Dorantes Querétaro senador"
  ],
  "maxResults": 50,
  "sortBy": "date",
  "proxy": {
    "useApifyProxy": true
  }
}
```

**Campos que exporta:**

| Campo Apify | Uso en el skill |
|---|---|
| `title` | Título del video |
| `description` | Descripción (sentimiento) |
| `url` | URL del video |
| `date` / `uploadDate` | Fecha |
| `channelName` | Canal / fuente |
| `viewCount` | Views |
| `likes` | Likes |
| `commentCount` | Comentarios |

---

## 5. X/Twitter — Configuración

### Actor: Tweet Scraper

```json
{
  "searchTerms": [
    "Agustín Dorantes",
    "@agusdorantes",
    "Dorantes Lámbarri"
  ],
  "maxTweets": 200,
  "sinceDate": "2026-03-01",
  "untilDate": "2026-03-10",
  "sort": "Latest",
  "proxy": {
    "useApifyProxy": true
  }
}
```

**Campos que exporta:**

| Campo Apify | Uso en el skill |
|---|---|
| `text` / `full_text` | Contenido del tweet (sentimiento) |
| `url` | URL del tweet |
| `created_at` | Fecha |
| `user.screen_name` | Autor |
| `favorite_count` / `likeCount` | Likes |
| `retweet_count` | Retweets |
| `reply_count` | Respuestas |
| `user.followers_count` | Followers del autor (para calcular influence) |

---

## 6. Automatización (Schedules)

En Apify Console → Schedules, puedes programar cada actor:

### Frecuencia recomendada por tipo de cliente

| Tipo de monitoreo | Frecuencia | Cron |
|---|---|---|
| Crisis / marca activa | Diario | `0 8 * * *` (8am todos los días) |
| Reporte semanal | Semanal | `0 8 * * 1` (lunes 8am) |
| Reporte mensual | Quincenal | `0 8 1,15 * *` (1 y 15 de cada mes) |

### Pasos para configurar un Schedule:

1. En Apify Console, ve a **Schedules** → **Create new**
2. Selecciona el Actor que quieres programar
3. Pega el Input JSON de la sección correspondiente
4. Configura la frecuencia (cron expression)
5. Activa **"Save dataset to named dataset"** para que se acumulen los datos
6. Nombre sugerido: `social-listening-{cliente}-{plataforma}` (ej: `social-listening-dorantes-facebook`)

### Webhook para notificación (opcional)

Puedes configurar un webhook para que Apify te envíe un email cuando termine cada corrida:

```
Settings → Integrations → Webhooks → Add webhook
Event: ACTOR.RUN.SUCCEEDED
URL: tu email o Slack webhook
```

---

## 7. Exportación de Datos

### Descarga manual

1. En Apify Console → Storage → Datasets
2. Selecciona el dataset del actor
3. Click en **Export** → **CSV** o **JSON**
4. Guarda el archivo

### Descarga por API (para automatización futura)

```bash
# Descargar último dataset en CSV
curl "https://api.apify.com/v2/datasets/{DATASET_ID}/items?format=csv&token={TU_API_TOKEN}" > datos.csv
```

### Nombre de archivo recomendado

```
{plataforma}_{cliente}_{fecha_inicio}_{fecha_fin}.csv
```

Ejemplos:
- `facebook_dorantes_2026-03-01_2026-03-10.csv`
- `instagram_dorantes_2026-03-01_2026-03-10.csv`
- `youtube_dorantes_2026-03-01_2026-03-10.csv`
- `twitter_dorantes_2026-03-01_2026-03-10.csv`

---

## 8. Formato Esperado por el Skill

El skill de social-listening detecta automáticamente la plataforma por las columnas del CSV. Aquí las columnas mínimas que necesita por plataforma:

### Facebook
- `postText` o `text` → contenido
- `url` → enlace
- `timestamp` o `publishedAt` o `date` → fecha
- `authorName` o `pageName` → fuente
- `likes` o `reactions` → interacciones
- `comments` → comentarios
- `shares` → compartidos

### Instagram
- `caption` → contenido
- `url` o `shortCode` → enlace
- `timestamp` → fecha
- `ownerUsername` → fuente
- `likesCount` → likes
- `commentsCount` → comentarios

### YouTube
- `title` + `description` → contenido
- `url` → enlace
- `date` o `uploadDate` → fecha
- `channelName` → fuente
- `viewCount` → views
- `likes` → likes
- `commentCount` → comentarios

### X/Twitter
- `text` o `full_text` → contenido
- `url` → enlace
- `created_at` → fecha
- `user.screen_name` o `author` → fuente
- `favorite_count` o `likeCount` → likes
- `retweet_count` → retweets
- `reply_count` → respuestas

### Web Search (generado por el skill mismo)
- `title` → título
- `snippet` → contenido
- `url` → enlace
- `date` → fecha
- `source` → nombre del medio

---

## Checklist Rápido para Nuevo Cliente

1. [ ] Definir keywords del cliente (marca, competidores, temas)
2. [ ] Crear actors en Apify para cada plataforma con los keywords
3. [ ] Programar schedules según frecuencia necesaria
4. [ ] Exportar CSVs al finalizar el periodo
5. [ ] Subir CSVs a Claude → el skill procesa, analiza sentimiento y genera reporte
6. [ ] Entregar .docx con branding SE o GROW al cliente

## Facebook Comments Scraper

| Campo | Valor |
|---|---|
| Actor | `apify/facebook-comments-scraper` |
| Actor ID | `us5srxAYnsrkgUv2v` |
| Input | Array de URLs de posts de Facebook |
| Output | Comentarios con texto, autor, likes, timestamp, replies |

### Input
```json
{
  "startUrls": [
    {"url": "https://www.facebook.com/reel/771688362685936/"},
    {"url": "https://www.facebook.com/page/posts/pfbid0..."}
  ],
  "resultsLimit": 50,
  "includeNestedComments": true,
  "viewOption": "RANKED_THREADED"
}
```

### Flujo recomendado
1. Correr Facebook Posts Search → obtener URLs de posts
2. Filtrar posts con commentsCount > 0
3. Pasar URLs al Facebook Comments Scraper
4. Analizar sentimiento de comentarios con criterio:
   - **Negativo** = crítica directa al sujeto, su partido o gobierno aliado
   - **Neutro** = trolleo inter-partidista entre terceros, preguntas informativas, comparaciones no críticas
   - **Positivo** = apoyo, felicitaciones, emojis positivos

### Costo
~$0.02-0.05 por ejecución (50 comentarios)
