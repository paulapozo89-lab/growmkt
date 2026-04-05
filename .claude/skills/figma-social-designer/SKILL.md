# Skill: Figma Social Media Designer

## Descripción
Diseña posts profesionales para redes sociales con la línea gráfica de cualquier marca. Extrae el ADN visual de la marca desde su sitio web y logos, presenta los diseños en HTML para aprobación, y los construye como plantillas completamente editables por capas en Figma.

## Triggers
- 'crea los posts', 'diseña el contenido', 'arma la parrilla'
- 'genera los diseños de redes', 'hazme las plantillas'
- 'diseña los posts para [marca]', 'contenido para redes de [marca]'
- 'parrilla + figma', 'diseños de la parrilla', 'posts de la parrilla'
- Cuando el usuario suba una parrilla (Excel, Google Sheet, lista) y pida diseños

---

## FLUJO GENERAL (resumen ejecutivo)

```
1. EXTRAER ADN de marca → web + logos → branding-[cliente].md
2. DISEÑAR en HTML → Claude genera todos los posts como HTML renderizado
3. APROBAR en HTML → el usuario revisa, pide ajustes, se itera hasta perfección
4. CONSTRUIR en Figma → Claude replica EXACTAMENTE lo aprobado como plantilla editable por capas
5. ENTREGAR → archivo Figma + branding.md + PNGs opcionales
```

**REGLA DE ORO: NUNCA se toca Figma hasta que los diseños estén aprobados en HTML.**

---

## Fase 1: Extracción del ADN de marca

Antes de diseñar cualquier cosa, Claude necesita reunir la identidad visual completa. Si no existe un archivo `branding-[cliente].md`, Claude lo crea.

### Información a recopilar (preguntar lo que falte)

**Obligatorio:**
1. **URL del sitio web** → Claude hace web_fetch + extrae CSS variables, colores hex, fuentes, gradientes
2. **Logos** → El usuario sube los archivos (PNG/SVG). Mínimo: versión clara y versión oscura
3. **Nombre comercial exacto** (como aparece en el logo)
4. **¿Hay algún color que NO deba usar?** (preguntar siempre)

**Se extrae automáticamente del sitio:**
5. **Paleta de colores** → CSS custom properties, backgrounds, gradientes
6. **Tipografía** → font-family declarations
7. **Tono de comunicación** → Análisis del copy del sitio
8. **Estilo visual** → Dark/light theme, texturas, tipo de iconografía

**Se confirma con el usuario:**
9. **Formato de posts** → Dimensiones (1080×1080, 1080×1440, 1080×1920)
10. **Redes objetivo** → Instagram, Facebook, LinkedIn, TikTok

### Proceso de extracción
```
1. web_fetch(url) → extraer HTML completo
2. Buscar: CSS custom properties (--color-*), hex codes, font-family, gradientes
3. Extraer colores dominantes de los logos con ImageMagick
4. Analizar: ¿dark theme o light theme? ¿texturas? ¿iconografía?
5. Generar branding-[cliente].md con toda la info estructurada
6. Presentar paleta y estilo al usuario para aprobación antes de diseñar
7. Preguntar: "¿hay algún color que NO deba usar?"
```

### Estructura del archivo branding-[cliente].md
```markdown
# Brand Kit — [Nombre de la marca]

## 1. Identidad (datos comerciales, contacto, giro)
## 2. Logos (archivos, reglas de uso, colores del logo)
## 3. Paleta de colores (primarios, acentos, neutros, funcionales, gradientes)
## 4. Tipografía (fuentes, jerarquía de tamaños, reglas)
## 5. Estilo visual (principios, texturas CSS, iconografía, fotografía)
## 6. Tono de comunicación (voz, frases de marca, palabras clave, hashtags)
## 7. Formatos de contenido (dimensiones por red, anatomía de un post tipo)
## 8. Pilares de contenido sugeridos (temas y frecuencia)
## 9. Aplicación por formato (HTML, DOCX, PPTX, Figma, matplotlib)
```

---

## Fase 2: Preview en HTML (OBLIGATORIO — antes de tocar Figma)

**ESTA FASE ES OBLIGATORIA.** Claude SIEMPRE presenta los diseños en HTML para aprobación del usuario ANTES de crear nada en Figma. No hay excepciones.

### ¿Por qué HTML primero?
- **Iteración instantánea:** Cambios de texto, color, posición son inmediatos (sed, str_replace)
- **Cero consumo de Figma MCP:** Todo el diseño y aprobación ocurre aquí
- **Fidelidad total:** El HTML usa los colores, fuentes, texturas y logos reales de la marca
- **PNGs listos:** Si se necesitan publicar urgente, se renderizan directo desde el HTML

### Proceso
```
1. Claude genera un archivo HTML con TODOS los posts de la parrilla
   - Cada post a escala real (1080×[altura])
   - Con las variaciones visuales por tipo de contenido
   - Con logos embebidos en base64 (procesados con ImageMagick para transparencia)
   - Con texturas del isotipo como CSS background-image repetido
   - Con gradientes, líneas decorativas, esquinas — todo fiel al branding
   
2. Claude entrega el HTML como archivo descargable
   - El usuario lo abre en su navegador para revisar
   
3. El usuario revisa y pide ajustes
   - "Cambia el título del post 2"
   - "El CTA debería ser más grande"
   - "Quita ese color, no es de la marca"
   
4. Claude itera en HTML hasta que el usuario apruebe
   - Cambios instantáneos via sed/str_replace
   - Re-entrega el HTML actualizado
   
5. Una vez aprobado, Claude pasa a Fase 4 (Figma)
   - NUNCA antes de la aprobación explícita del usuario
```

### Estructura del HTML de preview
```html
<!-- Cada post como un div escalado para vista previa -->
<div class="post" style="width:1080px; height:[altura]px; transform:scale(0.45);">
  <!-- Fondo gradiente (CSS) -->
  <!-- Textura isotipo repetida (CSS pattern con base64) -->
  <!-- Isotipo fantasma decorativo (posicionado según tipo) -->
  <!-- Línea de acento top (CSS gradient) -->
  <!-- Esquinas decorativas (CSS borders) -->
  <!-- Logo real (base64 embebido, procesado con transparencia) -->
  <!-- Tag pill (div con border, dot, texto) -->
  <!-- Título con palabras en color accent -->
  <!-- Divider (div con gradient) -->
  <!-- Contenido variable (párrafo / pasos numerados / stat grande) -->
  <!-- CTA button (div con borde accent) -->
  <!-- Footer (URL + contacto) -->
</div>
```

### Generación de PNGs desde HTML (opcional)
Si el usuario quiere PNGs listos para publicar sin esperar a Figma:
```bash
pip install playwright --break-system-packages
playwright install chromium
python3 render_posts.py  # Captura cada .post como PNG individual a escala real
```

---

## Fase 3: Sistema de variaciones por tipo de contenido

Cada tipo de post usa la MISMA estructura base pero con variaciones sutiles para diferenciarse visualmente sin romper la identidad.

### Variables que cambian según tipo de post

| Variable | Urgencia/Problema | Educativo/Proceso | Dato/Autoridad | CTA/Contacto |
|----------|-------------------|-------------------|----------------|---------------|
| **Gradiente dirección** | 155° | 135° diagonal | 170° vertical | 145° |
| **Color línea top** | Color alerta → accent | Accent → accent-bright | Accent-bright → accent | Accent → alerta |
| **Color del tag pill** | Color de alerta de la marca | Accent principal | Accent bright | Color de alerta |
| **Layout contenido** | Título + párrafo | Título + pasos numerados | Número grande + párrafo | Título + bullet benefits |
| **Posición isotipo fantasma** | Top-right, rotado 15° | Centrado, sin rotación | Bottom-right, rotado -10° | Top-left, rotado -5° |
| **Línea decorativa vertical** | Derecha | Izquierda | Derecha | Sin línea |
| **Tono del gradiente** | Más cálido (hacia alerta) | Neutro (accent base) | Más frío (deep) | Equilibrado |

### Variables que NUNCA cambian
- Paleta de colores aprobada
- Tipografía (fuentes y pesos)
- Posición del logo (mismo lugar siempre)
- Estructura general: logo → tag → título → divider → contenido → CTA → footer
- Esquinas decorativas
- Footer (URL + contacto)
- Dimensiones del frame

---

## Fase 4: Construcción en Figma (SOLO después de aprobación en HTML)

**REQUISITO:** El usuario ya aprobó los diseños en HTML. Claude replica EXACTAMENTE lo aprobado.

### Pre-requisitos
- Figma MCP conectado (verificar con Figma:whoami)
- Archivo de Figma creado o proporcionado por el usuario
- Logos procesados con transparencia (ImageMagick)
- Diseños ya aprobados en HTML

### Crear archivo base
```
1. Figma:whoami → obtener planKey
2. Figma:create_new_file → "[Marca] - Templates Social Media"
3. Guardar fileKey para todas las operaciones posteriores
```

### Preparar logos
```bash
# Hacer fondo transparente si los PNGs tienen fondo negro/sólido
convert logo.png -fuzz 20% -transparent black logo-transparente.png

# Verificar dimensiones
identify logo-transparente.png

# Extraer isotipo (si el logo tiene ícono + texto)
convert logo.png -crop [ancho_icono]x[alto]+0+0 +repage isotipo.png
convert isotipo.png -fuzz 20% -transparent black isotipo-transparente.png
```

### Estructura de capas en Figma (TODAS editables por separado)

Cada post se crea como una página en Figma con TODAS las capas individuales editables:

```
Frame "[Tipo] — [Tema corto]" (1080×[altura])
├── 1. Fondo gradiente (Rectangle con GRADIENT_LINEAR)
├── 2. Línea acento top (Rectangle 1080×5 con GRADIENT_LINEAR)
├── 3. Esquina TL (Frame con 2 líneas)
├── 4. Esquina BR (Frame con 2 líneas)
├── 5. Logo (imagen real insertada, NO placeholder)
├── 6. Tag pill (Frame auto-layout: dot + texto)
├── 7. Título (Text con rangeFills para palabras en accent)
├── 8. Divider (Rectangle 72×3 con gradiente)
├── 9. Contenido variable:
│   ├── Párrafo (para urgencia/autoridad)
│   ├── Pasos numerados (para educativo — cada paso con badge + texto)
│   └── Número grande + label (para dato)
├── 10. CTA (Frame auto-layout con borde)
├── 11. Línea footer (Rectangle 1px)
├── 12. Footer URL (Text)
├── 13. Footer contacto (Text + dot)
└── 14. Línea decorativa vertical (Rectangle con gradiente fade)
```

**IMPORTANTE:** Cada elemento es una capa separada y editable. El usuario puede hacer click en cualquier texto y cambiarlo directamente en Figma. NO son imágenes aplanadas.

### Reglas críticas de Figma Plugin API
- Siempre cargar fuentes antes de usarlas: `await figma.loadFontAsync({ family: "...", style: "..." })`
- Inter styles: "Regular", "Semi Bold" (con espacio), "Bold"
- Para nueva página: `figma.createPage()` + `await figma.setCurrentPageAsync(page)`
- Para colorear palabras específicas del título: `text.setRangeFills(startIdx, endIdx, [fill])`
- Para bold parcial: `text.setRangeFontName(start, end, { family: "Inter", style: "Semi Bold" })`
- Opacidad en fills: `{ type: "SOLID", color: {...}, opacity: 0.5 }`
- Auto-layout para pills/botones: `frame.layoutMode = "HORIZONTAL"`

### Optimización de llamadas MCP (CRÍTICO)

Las ESCRITURAS en Figma (use_figma, create_new_file) NO cuentan contra el rate limit.
Las LECTURAS (get_screenshot, whoami, get_design_context) SÍ cuentan.

1. **Crear TODOS los posts en UNA SOLA llamada** `use_figma` cuando sea posible
   - Crear múltiples páginas en el mismo bloque de código
   - Máximo ~50,000 caracteres por llamada
2. **Agrupar operaciones:** No hacer llamadas separadas para "crear frame", "agregar texto", "agregar logo" — todo en un solo bloque
3. **NO hacer screenshots de verificación:** El usuario ya aprobó en HTML y puede verificar directamente en Figma abriendo el archivo
4. **Preparar todo el contenido antes de llamar a Figma:** Tener todos los textos, colores y posiciones calculados antes de la llamada API
5. **Si hay muchos posts (+5), dividir en lotes de 5 páginas por llamada**

---

## Fase 5: Flujo desde parrilla

Cuando el usuario proporciona una parrilla de contenido:

### Input esperado (cualquier formato)
- Excel/CSV con columnas: fecha, tipo, título, body, CTA
- Google Sheet (buscar con google_drive_search)
- Lista en el chat
- PPTX de parrilla existente

### Proceso completo
```
1. Leer la parrilla completa
2. Clasificar cada post por tipo (urgencia, educativo, dato, CTA)
3. Asignar variaciones visuales según tipo
4. GENERAR HTML con TODOS los posts → entregar para revisión
5. ITERAR en HTML hasta aprobación del usuario
6. Una vez aprobado, crear en Figma:
   - Ejecutar en lotes de ~5 posts por llamada Figma:use_figma
   - Cada post = 1 página en el archivo Figma
   - Todas las capas editables por separado
   - Logo real incluido (NO placeholders)
   - Nombrar páginas: "Post [N] — [Tipo] — [Tema corto]"
7. Compartir link del archivo Figma al usuario
```

### Ejemplo de parrilla → posts
```
| # | Tipo      | Título                          | Body                                    | CTA                         |
|---|-----------|--------------------------------|----------------------------------------|------------------------------|
| 1 | Urgencia  | ¿Producto retenido en aduana?  | Tramitamos tu carta de validación...   | Diagnóstico gratuito →       |
| 2 | Educativo | ¿Qué NOM aplica a tu producto? | 4 pasos del proceso...                 | Diagnóstico en 48h →         |
| 3 | Dato      | 30+ NOMs documentadas          | 6 sectores regulatorios...             | Conoce nuestros sectores →   |
| 4 | CTA       | Diagnóstico normativo gratuito | Sin compromiso, en 48 horas...         | WhatsApp: 55 7416 6209       |
```

---

## Fase 6: Entregables finales

Al terminar, Claude entrega:

1. **Archivo Figma** con todas las páginas/posts — completamente editables por capas
2. **branding-[cliente].md** — Brand Kit documentado
3. **Kit de elementos PNG** (ZIP) — fondos, logos, isotipos, texturas, líneas, esquinas — todo con transparencia
4. **Posts renderizados como PNG** (opcional) — vía Playwright si el usuario los quiere listos para publicar

---

## Notas importantes

### Sobre colores
- NUNCA usar colores que no estén en la paleta aprobada del branding
- Si la marca no tiene un color de alerta, usar el accent más cálido
- Si la marca es light theme, invertir: fondos claros, textos oscuros, misma estructura
- Preguntar siempre: "¿hay algún color que NO deba usar?"

### Sobre tipografía
- Verificar que las fuentes estén disponibles en Figma (Google Fonts generalmente sí)
- Si la fuente del sitio no está en Figma, proponer la alternativa más cercana
- Inter es el fallback seguro universal

### Sobre el logo
- Siempre procesar con ImageMagick para transparencia antes de usar
- Verificar si el logo tiene isotipo separable para texturas de fondo
- Crear versión isotipo como textura repetida (tile) con opacidad 2-3%
- En Figma: insertar el logo REAL como imagen, NUNCA un placeholder de texto

### Sobre Figma MCP limits
- Plan Starter: 6 lecturas/mes (screenshots, whoami, get_design_context)
- Escrituras (use_figma, create_new_file): ILIMITADAS
- Plan Professional ($16/mes Full seat): 200 lecturas/día
- Agrupar todo en mínimas llamadas `use_figma`
- No hacer screenshots — el usuario verifica directo en Figma
- La aprobación visual se hace en HTML, no en Figma
