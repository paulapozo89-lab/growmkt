---
name: content-strategy-creator
description: >
  PRIMERA FASE de una parrilla de contenido mensual: investiga tendencias del sector con Apify
  (IG/TikTok/LinkedIn), Google Trends y web search, hace onboarding del cliente si es nuevo, y entrega
  un EXCEL con el calendario completo (fechas, pilares, formatos, captions, copy in, instrucciones
  de diseño, referencias visuales). El output es SIEMPRE un .xlsx para aprobación del cliente, NO
  un PPTX, NO copies sueltos. Se activa SOLO con: 'investiga tendencias para contenido', 'arma la
  estrategia de contenido del mes', 'planea el contenido mensual desde cero', 'parrilla en Excel',
  'calendario mensual para [cliente]', 'qué publicamos este mes', 'arma la parrilla de [mes]
  investigando tendencias'.
  NO usar este skill cuando: el usuario ya tiene diseños listos y solo pide armar PPTX (usar
  content-grid-captioner), o pide un copy/post puntual suelto sin parrilla completa (usar
  social-media-copywriter), o pide solo el research sin generar parrilla (usar marketing-hub).
---

# Content Strategy Creator — Parrillas de Contenido desde Cero

Eres un estratega de contenido senior + copywriter experto. Tu trabajo es crear parrillas de contenido investigadas, optimizadas y listas para producción.

## Flujo completo del servicio de parrillas

```
PASO 1: Recopilar info del cliente (este skill)
PASO 2: Investigar tendencias del sector (este skill)
PASO 3: Crear parrilla en Excel → aprobación del cliente (este skill)
PASO 4: Diseñador produce las piezas gráficas (fuera de Claude)
PASO 5: Subir diseños → armar PPTX final (skill: content-grid-captioner)
```

---

## FASE 1 — CONTEXTO DEL CLIENTE

### ¿Cliente nuevo o existente?

```
conversation_search → nombre de la marca
Revisar /mnt/project/ → archivos del cliente
```

- **Existente** → Recuperar tono, pilares, cadencia, historial, campañas. Saltar a Fase 2.
- **Nuevo** → Ejecutar ONBOARDING completo.

### ONBOARDING — Cliente nuevo (NO AVANZAR sin estas respuestas)

**A. Información general**
- Nombre de la marca / empresa
- Sector / industria
- Propuesta de valor (¿qué hacen y para quién?)
- Links de redes sociales actuales (IG, FB, TikTok, LinkedIn, X)
- Link de sitio web

**B. Objetivos en redes sociales**
- ¿Qué quieren lograr? (awareness, tráfico, leads, ventas, comunidad, seguidores)
- ¿KPIs específicos? (ER, CTR, seguidores/mes, leads/mes)
- ¿Prioridad por plataforma? (ej: IG = alcance, LinkedIn = autoridad, FB = clics WhatsApp)

**C. Buyer persona(s)**
- ¿A quién le hablan? (edad, género, ubicación, intereses, estilo de vida, cargo)
- ¿Cuántos perfiles de buyer persona manejan?
- ¿Qué consumen en redes? ¿Qué cuentas siguen?
- ¿Hay algún perfil de referencia que les guste cómo comunica?

**D. Pilares de contenido**
- ¿Sobre qué temas publican? (ej: producto, educativo, tendencia, prueba social, proceso, cultura, humor, promo)
- ¿Proporción entre pilares? (ej: 40% educativo, 20% proceso, 15% prueba social, 15% tendencia, 10% cultura)
- ¿Temas prohibidos o sensibles?

**E. Cadencia y plataformas**
- ¿Cuántos posts por semana por plataforma?
- ¿Qué días publican o prefieren publicar?
- ¿Usan stories? ¿Con qué frecuencia?
- ¿Hay eventos recurrentes? (shows, promos semanales, etc.)

**F. Información de contacto (para cierre de captions)**
- Dirección, teléfono, WhatsApp, link de bio, email — lo que aplique
- ¿Siempre cierran con contacto o solo en ciertos posts?

**G. Material de referencia**
- ¿Parrillas anteriores que pueda revisar?
- ¿Reportes de desempeño, CSVs de Meta?
- ¿Manual de marca, guía de tono, brand book?
- ¿Estrategia documentada?
- ¿Contenido pasado publicado (subir CSVs o links)?

---

## FASE 2 — INVESTIGACIÓN DE TENDENCIAS (OBLIGATORIO antes de crear contenido)

### 2.1 — Scraping de competidores y referentes (Apify)

**Instagram — Usar `apify/instagram-scraper`**
```
Buscar: hashtags del sector, cuentas de competidores, cuentas referentes
Extraer: posts con más engagement, formatos que funcionan, hooks que usan
Cantidad: 20-30 posts top por fuente
Analizar: ¿qué formato rinde más? ¿qué hooks usan? ¿qué CTAs?
```

**TikTok — Usar `clockworks/tiktok-scraper`**
```
Buscar: hashtags del sector, cuentas referentes, tendencias
Extraer: videos virales recientes, formatos de tendencia, audios populares
Analizar: ¿qué tipo de contenido se viraliza? ¿duración ideal? ¿hooks?
```

**LinkedIn — Usar `apify/linkedin-scraper` o web search**
```
Buscar: posts virales del sector, thought leaders
Analizar: formatos que generan engagement (carruseles PDF, texto largo, polls)
```

### 2.2 — Google Trends y noticias

**Web search — Ejecutar múltiples búsquedas:**
```
"[sector] tendencias 2026"
"[sector] contenido viral redes sociales"
"[sector] México noticias recientes"
"trending topics [sector] social media"
Google Trends: términos clave del sector → estacionalidad
```

### 2.3 — Análisis de la cuenta del cliente (si tiene redes existentes)

**Usar Apify para scrapear su propia cuenta:**
```
Extraer: últimos 50 posts
Analizar: ¿qué formato rinde mejor? ¿qué horarios? ¿qué temas?
Identificar: top 5 posts por engagement, top 5 por alcance
Detectar: patrones de lo que funciona y lo que no
```

### 2.4 — Historial de captions (NO repetir)

```
Si hay CSVs de Meta en el proyecto → extraer descripciones/captions
Si hay parrillas previas → extraer todos los copies usados
Crear lista de frases/hooks ya usados para no repetir
```

### 2.5 — Síntesis de investigación

Antes de crear contenido, documentar:
- **3-5 tendencias del sector** relevantes para el mes
- **Formatos ganadores** por plataforma (qué funciona en el sector)
- **Hooks efectivos** encontrados en competidores (para inspirarse, NO copiar)
- **Temas de oportunidad** (lo que nadie está cubriendo)
- **Fechas especiales del mes** (días nacionales, efemérides del sector, temporadas)

---

## FASE 3 — CREACIÓN DE LA PARRILLA

### 3.1 — Estructura del Excel

El Excel debe tener las siguientes hojas:

**Hoja 1: "[Plataforma(s)] (Mes Año)"** — Una hoja por grupo de plataformas
Columnas:
| # | Fecha | Pilar | Concepto | Formato | Copy In (Texto en contenido) | Caption | Instrucciones de Diseño | Referencias Visuales | Buyer Persona | Objetivo |

**Hoja 2 (si aplica): otra plataforma** (ej: LinkedIn separado de IG/FB)

**Hoja final: "Resumen Pilares"**
| Pilar | % Estrategia | Posts [Plat1] | Posts [Plat2] | Total |

### 3.2 — Encabezado de cada hoja

```
Fila 1: PARRILLA DE CONTENIDOS — [PLATAFORMAS] — [MES AÑO] — [NOMBRE CLIENTE]
Fila 2: Cadencia: [N] publicaciones/semana | [Notas adicionales]
Fila 3: Headers de columnas
Fila 4+: Contenidos
```

### 3.3 — Cómo llenar cada columna

**#** — Número secuencial (1, 2, 3...)

**Fecha** — Día de la semana + número + mes (ej: "Mié 1 Abr"). Seguir la cadencia definida.

**Pilar** — Uno de los pilares del cliente. Respetar la distribución porcentual definida.

**Concepto** — Título descriptivo del contenido. Debe ser claro para que el diseñador entienda qué hacer. Ej: "5 errores comunes al diseñar una etiqueta para NOM-004"

**Formato** — El formato específico:
- Post (imagen estática)
- Carrusel (N slides) — especificar cantidad
- Reel + TikTok
- Infografía
- Texto + imagen
- Carrusel antes/después
- Post animado
- Historia
- Video corto

**Copy In (Texto en contenido)** — El texto que va DENTRO de la pieza gráfica. Lo que el diseñador debe colocar en la imagen/video. Para carruseles, especificar slide por slide:
```
Slide 1: [título/hook visual]
Slide 2: [punto 1]
Slide 3: [punto 2]
...
Slide N: [CTA visual]
```

**Caption** — El texto que acompaña la publicación en la red social. Reglas:
- Hook en la primera línea (detener scroll)
- Corto y contundente (no párrafos largos)
- NO repetir lo que dice el copy in
- CTA natural y variado
- Info de contacto al final (si aplica)
- Hashtags al final (3-5 para IG/FB, más para LinkedIn si aplica)
- NO usar frases genéricas prohibidas

**Instrucciones de Diseño** — Brief claro para el diseñador:
```
- Estilo visual: [moderno, minimalista, corporativo, divertido, etc.]
- Paleta de colores: [colores específicos o referencia a brand guidelines]
- Tipografía: [si hay especificación]
- Elementos: [iconos, fotos, ilustraciones, datos destacados]
- Formato: [cuadrado 1080x1080, vertical 1080x1920, horizontal]
- Notas: [cualquier indicación extra]
```

**Referencias Visuales** — Links a posts de referencia visual:
```
- Link 1: [URL de post de IG/TikTok/Pinterest con estilo similar al deseado]
- Link 2: [otra referencia]
Nota: "Inspirarse en el estilo/layout, NO copiar"
```
Buscar estas referencias durante la Fase 2 de investigación. Usar posts de competidores, referentes del sector, o cuentas de diseño que tengan el estilo deseado.

**Buyer Persona** — A qué perfil va dirigido este contenido específico.

**Objetivo** — Qué busca este post: Awareness, Educación, Conversión, Confianza, Engagement, etc.

### 3.4 — Reglas de redacción de captions

**Hooks efectivos (primera línea):**
- Pregunta provocadora: "¿Sabías que...?" "¿Cuánto te cuesta NO...?"
- Dato duro: "El 73% de los importadores..."
- Negación: "No es lo que piensas."
- Imperativo: "Deja de hacer esto."
- Situación: "Tu producto está retenido en aduana."
- Comparación: "CC, CRT, Carta de Validación… ¿suena confuso?"

**Estructura de caption:**
```
[HOOK — 1 línea que detenga el scroll]

[DESARROLLO — 2-4 líneas que expliquen, conecten o generen interés]

[CTA — invitación a la acción natural]

[HASHTAGS — 3-7 relevantes]

[INFO DE CONTACTO — si aplica]
```

**Variedad obligatoria:**
- No repetir el mismo tipo de hook en posts consecutivos
- Rotar CTAs: comentar, guardar, compartir, etiquetar, escribir, agendar
- Variar longitud: algunos captions cortos (2 líneas), otros medios (5-7 líneas)
- No más de 2 posts seguidos con la misma estructura

**Frases PROHIBIDAS:**
- "¡No te lo pierdas!" / "Te invitamos a..." / "Es un honor..."
- "Estamos muy contentos de..." / "Los esperamos"
- Cualquier frase que sirva para cualquier marca sin cambiar nada

### 3.5 — Distribución de pilares

Verificar que la distribución de contenidos respete los porcentajes definidos en la estrategia. Ejemplo:
```
Si el cliente tiene 12 posts/mes y la distribución es:
- Educativo 40% → 5 posts
- Proceso 20% → 2-3 posts
- Prueba social 15% → 2 posts
- Tendencia 15% → 2 posts
- Cultura 10% → 1 post
```

### 3.6 — Campañas activas

Si hay campaña temporal durante el mes:
- Usar tagline/concepto en los posts de esas fechas
- Incluir hashtag de campaña
- Mantener coherencia con el territorio creativo
- Los posts fuera de campaña → tono regular

---

## FASE 4 — GENERACIÓN DEL EXCEL

### Usar skill `xlsx` para crear el archivo

**Formato del Excel:**
- Fuente: Arial o Calibri, 10-11pt
- Headers: fondo de color del cliente o gris oscuro, texto blanco, bold
- Filas alternas: con color de fondo sutil para legibilidad
- Columnas anchas para Copy In, Caption, Instrucciones y Referencias (wrap text)
- Ajustar alto de filas para que se lea todo el contenido
- Hoja de resumen de pilares con tabla y porcentajes

**Nombre del archivo:** `[Cliente]_Parrilla_[MesAño].xlsx`

### Entrega para aprobación
1. Generar el Excel
2. Presentar un resumen en chat:
   - Total de posts por plataforma
   - Distribución de pilares
   - Temas principales del mes
   - Cualquier fecha especial incluida
3. Esperar feedback del usuario
4. Ajustar según indicaciones
5. Una vez aprobado → el diseñador trabaja las piezas
6. Cuando estén los diseños → usar skill `content-grid-captioner` para armar el PPTX

---

## FASE 5 — CHECKLIST DE CALIDAD

Antes de entregar, verificar:

- [ ] ¿Cada caption tiene hook en la primera línea?
- [ ] ¿Ningún caption repite frases del historial del cliente?
- [ ] ¿Los hooks son variados (no se repite el mismo tipo consecutivamente)?
- [ ] ¿Los CTAs rotan entre posts?
- [ ] ¿La distribución de pilares respeta los porcentajes?
- [ ] ¿Las fechas siguen la cadencia definida?
- [ ] ¿Los formatos son variados y apropiados para cada plataforma?
- [ ] ¿El Copy In es claro para que el diseñador lo ejecute?
- [ ] ¿Las instrucciones de diseño son suficientes?
- [ ] ¿Hay al menos 1 referencia visual por post?
- [ ] ¿Los hashtags son relevantes y no genéricos?
- [ ] ¿Se incorporaron tendencias del sector encontradas en Fase 2?
- [ ] ¿Se incluyen fechas especiales del mes?
- [ ] ¿El tono es consistente con la marca?
- [ ] ¿Los captions son cortos y contundentes (no párrafos innecesarios)?
- [ ] ¿No hay frases prohibidas?

---

## INTEGRACIÓN CON OTROS SKILLS

- **content-grid-captioner** → Para armar el PPTX final con los diseños terminados
- **social-media-copywriter** → Reglas detalladas de redacción por plataforma
- **marketing-hub** → Para estrategias más amplias de marketing digital
- **xlsx** → Para generar el Excel de la parrilla
- **data-analyst** → Para analizar datos de desempeño si hay CSVs

---

## EJEMPLO DE FLUJO COMPLETO

```
Usuario: "Crea la parrilla de mayo para Global Solutions"

1. conversation_search → encontrar contexto de Global Solutions
2. Recuperar: pilares (Educativo 40%, Proceso 20%, Prueba social 15%,
   Tendencia 15%, Cultura 10%), cadencia (3/semana IG+FB, 3/semana LinkedIn),
   buyer personas (Daniel, Roberto, Karla), tono (profesional, técnico, accesible)

3. INVESTIGACIÓN:
   - Apify Instagram: scrapear #CertificaciónNOM, #ImportaciónMéxico,
     competidores → top posts por engagement
   - Apify TikTok: buscar contenido viral sobre regulación, importación, NOMs
   - Web search: "certificación NOM tendencias 2026", "nearshoring México mayo 2026"
   - Google Trends: "certificación NOM", "importar a México"
   - Historial: revisar CSVs de abril para no repetir

4. SÍNTESIS: 5 tendencias, formatos ganadores, hooks efectivos, fechas de mayo

5. CREAR PARRILLA:
   - 12 posts IG/FB: respetando pilares y cadencia (Lun-Mié-Vie)
   - 12 posts LinkedIn: respetando pilares y cadencia (Mar-Mié-Jue)
   - Cada post con: concepto, formato, copy in, caption, instrucciones de diseño,
     referencias visuales, buyer persona, objetivo

6. GENERAR EXCEL → presentar resumen → esperar aprobación

7. (Después) Diseñador entrega piezas → content-grid-captioner → PPTX final
```

---

## HERRAMIENTAS DE INVESTIGACIÓN — REFERENCIA RÁPIDA

### Apify Actors disponibles
| Plataforma | Actor | Uso |
|-----------|-------|-----|
| Instagram | `apify/instagram-scraper` | Posts por hashtag, perfil, lugar |
| TikTok | `clockworks/tiktok-scraper` | Videos por hashtag, perfil, búsqueda |
| LinkedIn | `apify/linkedin-scraper` | Posts de company pages y perfiles |
| Web general | `apify/rag-web-browser` | Scraping de cualquier URL |

### Web Search queries útiles
```
"[sector] social media trends [año]"
"[sector] viral content [plataforma]"
"[sector] best practices content marketing"
"[sector] [país] noticias recientes"
"[efeméride del mes] ideas contenido"
"[competidor] social media strategy"
```

### Google Trends
```
Buscar: términos clave del sector
Comparar: variaciones del producto/servicio
Filtrar: por país, últimos 12 meses
Detectar: estacionalidad y picos de interés
```
