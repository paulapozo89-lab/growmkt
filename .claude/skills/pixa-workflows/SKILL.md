---
name: pixa-workflows
description: Generate and edit images and videos with the Pixa MCP server for SE, GROW, and client work. Use this skill whenever the user wants to generate, create, edit, batch-process, upscale, remove background from, expand, or animate any image or video for marketing content, social media posts, websites, or client deliverables. Triggers include: "genera una imagen", "crea un hero shot", "necesito un visual para [cliente]", "remueve el fondo", "haz batch upscale", "anima esta foto", "genera un video corto", "hazme un reel", "expande esta imagen a 9:16", "crea un post para [marca]", "genera contenido visual", or any mention of Pixa, Nano Banana, Seedream, Flux, Ideogram, Veo, Kling, Sora, Recraft, or any AI image/video model. Also use when the user uploads product photos, event photos, or stock images that need processing for client work.
---

# Pixa Workflows

Skill for using the Pixa MCP server (`PIXA:*` tools) to generate, edit, and process images and videos for Paula's agencies (SE and GROW) and her clients.

## ⚠️ Reglas obligatorias antes de cualquier ejecución

### 1. Confirmación de créditos SIEMPRE

**Nunca ejecutar una operación de Pixa sin antes:**
1. Calcular cuántos créditos consumirá (ver tabla abajo)
2. Avisarle a Paula: *"Esta operación va a consumir aprox X créditos. ¿Procedo?"*
3. Esperar confirmación explícita (`sí`, `ok`, `procede`, etc.)

**Excepción:** operaciones gratis (background removal, upscale básico, magic eraser estándar) no requieren confirmación previa, solo aviso al final.

### 2. Tracking de créditos

Si en algún momento Paula menciona que va corta de créditos, o si después de una operación grande sospechas que quedan ≤100 créditos del mes, **avísale explícitamente**: *"Heads-up: con esta operación quedarías cerca del límite mensual. Considera revisar tu balance en account."*

Para revisar balance real usar `PIXA:account`.

### 3. Branding por cliente — SIEMPRE aplicar

Antes de generar cualquier imagen para un cliente conocido, aplicar las reglas de branding pre-cargadas (ver sección "Branding por cliente" más abajo). Si no es claro para qué cliente es, **preguntar primero**.

### 4. PNG con transparencia → image-handler

Cualquier PNG generado por Pixa que vaya a insertarse en un DOCX o PPTX **debe pasar por la skill `image-handler` antes**. Esto resuelve el bug recurrente del fondo negro.

---

## Tabla de selección de modelo

Esta es la tabla maestra. Siempre consultarla antes de elegir modelo.

### Imagen

| Caso de uso | Modelo recomendado | Costo aprox (créditos) | Por qué |
|---|---|---|---|
| **Default — imagen general** | Nano Banana Pro | ~5/img | Mejor balance calidad/costo |
| **Realismo fotográfico (producto, gente, lifestyle)** | Seedream v4 | ~7/img | Detalle fotográfico superior |
| **Imagen con texto/tipografía** (posters, banners) | Ideogram v3 | ~10/img | Único modelo que respeta texto bien |
| **Editar imagen existente preservando estilo** | Flux Kontext Pro | ~7/img | Edición consistente sin perder coherencia |
| **Logos, vectores, ilustración plana** | Recraft v4 Vector | ~10/img | Salida vectorial real |
| **Pruebas y exploración rápida** | Flux Klein 4B | ~1/img | El más barato — usar para iterar prompts |
| **Hero ultra-premium para campaña importante** | Flux 2 Pro | ~7/img | Top de gama actual |

### Video (cuidado, consume más)

| Caso de uso | Modelo recomendado | Costo aprox (créditos por video 5s) | Por qué |
|---|---|---|---|
| **Default video corto eficiente** | Kling v2.5 Turbo Pro | ~12/video | Mejor relación costo/calidad |
| **Animación sutil de foto estática** | Hailuo v2.0 Standard | ~12/video | Económico para "mover" fotos |
| **Reel hero con calidad cinematográfica** | Veo 3.1 | ~70/video | Premium, solo para piezas hero |
| **Spot estilo film** | Sora 2 | ~17/video | Excelente narrativa visual |
| **Producto en movimiento (e-commerce)** | Seedance v1.5 Pro | ~17/video | Especializado en producto |

**Nota crítica sobre video:** un solo Veo 3.1 puede comerse casi 12% del presupuesto mensual. **Siempre confirmar antes de generar video premium.**

### Edición (estas operaciones son gratis o casi gratis)

| Operación | Tool | Costo |
|---|---|---|
| Remove background | `PIXA:edit_image` action `remove_background` | Gratis (Pro) |
| Upscale 2x o 4x | `PIXA:edit_image` action `upscale` | Gratis (Pro) |
| Expand (extender canvas) | `PIXA:edit_image` action `expand` | Gratis (Pro) |
| Batch (cualquier acción) | Pasar array al parámetro `image` | Mismo costo unitario × N |

---

## Workflows estándar

### WF-1: Hero shot para post de redes (Nivel B → handoff a figma-social-designer)

1. **Identificar cliente y branding** → cargar reglas de la sección "Branding por cliente"
2. **Construir prompt** incorporando paleta, estilo y restricciones del cliente
3. **Calcular créditos y confirmar con Paula**
4. **Llamar `PIXA:generate_media`** con modelo seleccionado
5. **Si la imagen tiene fondo que estorba** → `PIXA:edit_image` action `remove_background`
6. **Si necesita más resolución** → `PIXA:edit_image` action `upscale` scale `2`
7. **Descargar localmente** usando `PIXA:get_download_url` y guardar el archivo
8. **Si va a DOCX/PPTX** → pasar por `image-handler` skill
9. **Para llevar a Figma** → pasar el path local a Paula con instrucción: *"Listo, esta imagen está en `[path]`. Para meterla a Figma usa la skill `figma-social-designer` con este asset"*
10. **NO intentar subir directo a Figma** desde aquí (regla del Nivel B — reutilizar la skill validada)

### WF-2: Batch de productos con fondo limpio

Caso típico: Global Solutions S&L manda 10 fotos de productos con fondo blanco sucio.

1. **Recibir array de imágenes** (URLs o paths locales)
2. **Si son locales** → `PIXA:upload` cada una para obtener `asset_id`
3. **Confirmar con Paula:** *"Voy a procesar N imágenes: remove_background + upscale 2x. Esto es gratis en tu plan Pro. ¿Procedo?"*
4. **Batch remove_background:** `PIXA:edit_image` con `action: "remove_background"` y `image: [array de asset_ids]`
5. **Batch upscale:** `PIXA:edit_image` con `action: "upscale"`, `scale: "2"`, mismo array
6. **Descargar todas** usando `PIXA:get_download_url`
7. **Guardar en carpeta del cliente** con nombres consistentes (`cliente_producto_01.png`, etc.)
8. **Si van a DOCX/PPTX** → `image-handler` antes
9. **Reportar:** total procesadas, paths, tiempo

### WF-3: Reel corto desde imagen base (animar foto estática)

1. **Generar o recibir imagen base** (foto del cliente, producto, escenario)
2. **Definir el movimiento deseado** con Paula: *¿qué quieres que se mueva? ¿cámara o sujeto? ¿cuántos segundos?*
3. **Calcular créditos:** Kling v2.5 Turbo Pro = ~12 créditos por video de 5s
4. **Confirmar:** *"Esto consumirá ~12 créditos. ¿Procedo?"*
5. **Llamar `PIXA:generate_media`** con `media_type: "video"`, modelo Kling, `attachments: [imagen_base]`
6. **Polling con `PIXA:get_job_status`** hasta terminal state
7. **Descargar** con `PIXA:get_download_url`
8. **Entregar a Paula** con nota: *"Listo para CapCut. Path: [x]"*

**Si Paula pide explícitamente Veo 3.1 o Sora 2:** advertir el costo (~70 y ~17 créditos respectivamente) ANTES de ejecutar.

### WF-4: Expandir imagen a múltiples formatos (1:1 → 9:16 + 16:9)

Caso típico: una foto cuadrada de Instagram que se necesita en Reel y LinkedIn sin recortar.

1. **Recibir imagen original**
2. **Calcular padding necesario** o usar `aspect_ratio` directamente:
   - Para 9:16 desde 1:1: `aspect_ratio: "9:16"`
   - Para 16:9 desde 1:1: `aspect_ratio: "16:9"`
3. **Confirmar con Paula:** *"Voy a generar 2 versiones extendidas. Es gratis en tu Pro. ¿Procedo?"*
4. **Ejecutar `PIXA:edit_image`** con `action: "expand"` para cada formato
5. **Descargar y entregar** ambos paths

### WF-5: Editar imagen existente preservando estilo (Flux Kontext)

Caso típico: tienes una foto del cliente que casi funciona pero necesita cambios (cambiar fondo, agregar elemento, modificar color de un objeto).

1. **Recibir imagen original + descripción de cambio** ("cambia el fondo de esta foto del Senador a un auditorio lleno", "ponle traje azul en lugar de gris", etc.)
2. **Construir prompt de edición** describiendo SOLO el cambio (Kontext preserva el resto)
3. **Confirmar créditos:** ~7 por edición
4. **Llamar `PIXA:generate_media`** con modelo `flux-kontext-pro`, `attachments: [imagen_original]`, prompt = descripción del cambio
5. **Iterar si es necesario** (hasta 4 variaciones con `num_variations: 4`)
6. **Entregar la mejor**

---

## Branding por cliente

Aplicar SIEMPRE estas reglas al construir prompts. Si el cliente no está en esta lista, preguntar a Paula por referencia visual o branding doc.

### SOMOS ESTRATEGIA (SE)
- **Naming:** "SOMOS ESTRATEGIA" (todo caps, sin "+")
- **Colores:** cyan vibrante `#00F0C8`, dark `#1A1A1A`
- **Estilo visual:** moderno, tech, contraste alto, sensación de movimiento, profesionalismo institucional
- **Tono fotográfico:** editorial, dramático, alta definición
- **Evitar:** colores cálidos saturados, estilos retro, vintage

### GROW
- **Colores:** azul cyan `#2BAECC`, azul `#2F95EA`, coral `#E5526C`
- **Estilo visual:** dinámico, vibrante, juvenil pero profesional, energía positiva
- **Tono fotográfico:** lifestyle, brillante, optimista
- **Evitar:** estilos oscuros o corporativos rígidos

### Global Solutions S&L
- **Colores:** `#1F2036`, `#161729`, `#282A42`, `#7B8FBF`, `#9AADDA`, `#C4733F`
- **Tipografía referencia:** Inter
- **Estilo visual:** corporativo premium, ejecutivo, sobrio
- **Tono fotográfico:** entornos de oficina ejecutiva, mármol, vidrio, iluminación dramática
- **REGLA CRÍTICA:** **NUNCA usar verde de ningún tipo** (ni acentos, ni follaje predominante, ni overlays)
- **Evitar:** estilos casuales, colores brillantes saturados

### Viajes LeGrand
- **Estilo visual:** lujo aspiracional, editorial revista de viajes (referencia: Condé Nast Traveler)
- **Tono fotográfico:** golden hour, composición cinematográfica, destinos icónicos, paletas naturales saturadas
- **Sujetos típicos:** parejas, familias bien vestidas, escenarios premium (resorts, infinity pools, monumentos al atardecer)
- **Evitar:** stock obvio, turistas en chanclas, estilos amateur

### Senador Agustín Dorantes (SE)
- **Estilo visual:** institucional cálido, cercano pero serio, sensación de proximidad ciudadana
- **Tono fotográfico:** documental, luz natural, escenarios de Querétaro reconocibles
- **Sujetos típicos:** ciudadanos diversos, manos, símbolos cívicos (firmas, urnas, documentos), espacios públicos
- **Evitar:** estilos partidistas agresivos, propaganda obvia, imágenes que se vean AI-generadas
- **Para Ley Reembolso:** enfatizar el ángulo ciudadano, no político

---

## Prompts plantilla en español mexicano

### Hero político (SE / Senador Dorantes)
```
Documentary photography, [sujeto: ej. "manos diversas firmando un documento sobre una mesa de madera"], natural warm sunlight from window, shallow depth of field, Querétaro setting, photojournalism style, Magnum Photos aesthetic, no text, hyperrealistic, 8k
```

### Producto comercial (Global Solutions)
```
Product photography, [producto], placed on dark marble surface, executive office background blurred, palette of deep navy #1F2036 and burnt orange #C4733F accents, dramatic side lighting, premium commercial style, no green tones anywhere, 8k, hyperrealistic
```

### Lifestyle viaje (Viajes LeGrand)
```
Editorial travel photography, [escena: ej. "well-dressed couple at infinity pool overlooking Santorini caldera at golden hour"], Condé Nast Traveler style, cinematic composition, warm saturated colors, aspirational luxury, ultra detailed, 8k
```

### Post comercial dinámico (GROW)
```
Vibrant lifestyle photography, [sujeto], bright optimistic mood, palette accents of cyan #2BAECC and coral #E5526C, modern dynamic composition, professional but youthful energy, high resolution
```

### Imagen institucional con texto (Ideogram)
```
Modern poster design with text "[TEXTO EXACTO]", clean typography, [palette del cliente], minimalist composition, [estilo: editorial / corporate / dynamic], professional graphic design
```

---

## Integración con otras skills

### → image-handler
Después de generar y descargar cualquier PNG que vaya a un DOCX/PPTX, llamar a `image-handler` para procesar transparencia.

### → figma-social-designer (Nivel B handoff)
Después de generar imágenes para post de redes:
1. Descargar localmente con `PIXA:get_download_url`
2. Entregar a Paula el path
3. Indicar: *"Imagen lista en [path]. Cuando quieras, dime para usar `figma-social-designer` y meterla al template de [cliente]"*
4. **NO intentar subir a Figma directamente** desde esta skill

### → social-listening / social-media-report
Si Paula pide visuales para acompañar reportes generados por estas skills, generar con branding SE o GROW según corresponda al reporte.

---

## Tools de Pixa MCP — referencia rápida

- `PIXA:generate_media` — Genera imagen o video. Params clave: `model`, `prompt`, `media_type`, `aspect_ratio`, `num_variations`, `attachments`
- `PIXA:edit_image` — Edita. Actions: `remove_background`, `upscale`, `expand`. Soporta batch pasando array a `image`
- `PIXA:upload` — Sube imagen local para obtener `asset_id`
- `PIXA:get_download_url` — Convierte asset_id en URL descargable directa
- `PIXA:get_job_status` — Polling para jobs async (necesario para video con `sync: true`)
- `PIXA:account` — Info de cuenta y créditos restantes
- `PIXA:assets` — Gestionar assets generados
- `PIXA:collections` — Organizar en colecciones
- `PIXA:models` — Listar modelos disponibles (action `list`) — usar si dudas qué modelo está vigente
- `PIXA:pipelines` — Workflows multi-step reutilizables
- `PIXA:share_links` — Crear links compartibles

**Importante:** siempre usar `asset_id` para encadenar operaciones (no URLs temporales).

---

## Checklist mental antes de cada ejecución

- [ ] ¿Sé para qué cliente es? (si no, preguntar)
- [ ] ¿Cargué el branding correcto?
- [ ] ¿Elegí el modelo óptimo según la tabla?
- [ ] ¿Calculé créditos y le avisé a Paula?
- [ ] ¿Tengo confirmación explícita para proceder?
- [ ] ¿Si es PNG para DOCX/PPTX, tengo agendado pasar por image-handler?
- [ ] ¿Si es para Figma, voy a hacer handoff Nivel B (no automático)?
