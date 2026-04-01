---
name: image-handler
description: >
  Procesamiento automático de imágenes para documentos. Usa este skill SIEMPRE que el usuario suba una imagen PNG, JPG, SVG o cualquier archivo de imagen que será insertada en un documento Word (.docx), PowerPoint (.pptx), PDF, o cualquier otro entregable. Este skill resuelve el problema crítico de PNGs con fondo transparente que se renderizan con fondo negro en documentos, y optimiza las imágenes automáticamente (tamaño, resolución, formato). También se activa cuando el usuario dice 'usa esta imagen', 'inserta este logo', 'pon esta foto en el documento', 'agrega la imagen', o cuando se detecta que un archivo PNG subido tiene canal alfa (transparencia). Incluso si el usuario no menciona imágenes explícitamente, este skill debe ejecutarse como paso previo cada vez que un PNG se va a insertar en un DOCX o PPTX.
---

# Image Handler Skill

## Problema que resuelve

Cuando un PNG con transparencia (canal alfa) se inserta en documentos Word o PowerPoint a través de python-docx o python-pptx, el fondo transparente se renderiza como **fondo negro**. Este skill intercepta TODA imagen antes de insertarla en un documento y la procesa automáticamente.

## Regla Principal

**ANTES de insertar cualquier imagen en un DOCX o PPTX, SIEMPRE ejecutar el pipeline de procesamiento de este skill.** No hay excepciones.

## Pipeline de Procesamiento

### Paso 1 — Detectar transparencia

```python
from PIL import Image
import os

def has_transparency(img_path):
    """Detecta si una imagen tiene canal alfa (transparencia)."""
    img = Image.open(img_path)
    if img.mode in ('RGBA', 'LA'):
        # Verificar si realmente usa el canal alfa
        alpha = img.getchannel('A')
        if alpha.getextrema()[0] < 255:  # Hay píxeles no completamente opacos
            return True
    elif img.mode == 'P':
        # Paleta con transparencia
        if 'transparency' in img.info:
            return True
    return False
```

### Paso 2 — Determinar color de fondo

Detectar automáticamente el color de fondo apropiado según el contexto del documento:

```python
def determine_background_color(doc_context):
    """
    Determina el color de fondo basado en el contexto del documento.
    
    doc_context: dict con información del documento destino
        - type: 'docx' | 'pptx'
        - slide_bg: color de fondo del slide (solo pptx)
        - section_bg: color de sección (si aplica)
        - brand: 'se' | 'grow' | 'client' | None
    """
    # PPTX: usar el color de fondo del slide
    if doc_context.get('type') == 'pptx':
        slide_bg = doc_context.get('slide_bg', '#FFFFFF')
        return slide_bg
    
    # DOCX: default blanco (fondo estándar de documentos Word)
    if doc_context.get('type') == 'docx':
        return '#FFFFFF'
    
    # Fallback: blanco
    return '#FFFFFF'
```

### Paso 3 — Procesar imagen

```python
def process_image_for_document(img_path, doc_context, output_dir='/home/claude'):
    """
    Pipeline completo: detecta transparencia, aplica fondo, optimiza.
    Retorna la ruta de la imagen procesada lista para insertar.
    """
    img = Image.open(img_path)
    filename = os.path.splitext(os.path.basename(img_path))[0]
    output_path = os.path.join(output_dir, f"{filename}_processed.png")
    
    # --- TRANSPARENCIA ---
    if has_transparency(img_path):
        bg_color = determine_background_color(doc_context)
        # Convertir hex a RGB
        bg_rgb = tuple(int(bg_color.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))
        
        # Crear fondo sólido y componer
        background = Image.new('RGB', img.size, bg_rgb)
        if img.mode == 'RGBA':
            background.paste(img, mask=img.split()[3])  # Usar canal alfa como máscara
        elif img.mode == 'P':
            img = img.convert('RGBA')
            background.paste(img, mask=img.split()[3])
        else:
            background.paste(img)
        img = background
    else:
        # Sin transparencia, solo asegurar modo RGB
        if img.mode != 'RGB':
            img = img.convert('RGB')
    
    # --- OPTIMIZACIÓN DE TAMAÑO ---
    img = optimize_for_document(img, doc_context)
    
    # --- GUARDAR ---
    img.save(output_path, 'PNG', optimize=True)
    return output_path


def optimize_for_document(img, doc_context):
    """
    Redimensiona la imagen según el tipo de documento destino.
    Mantiene aspect ratio siempre.
    """
    doc_type = doc_context.get('type', 'docx')
    
    # Tamaños máximos recomendados (en píxeles)
    max_sizes = {
        'docx': {
            'full_width': (1800, 1200),    # Imagen a ancho completo
            'half_width': (900, 800),       # Imagen a media página
            'logo': (600, 200),             # Logos / headers
            'icon': (200, 200),             # Íconos pequeños
        },
        'pptx': {
            'full_slide': (1920, 1080),     # Imagen de fondo completo
            'content': (1400, 900),         # Imagen de contenido
            'logo': (400, 150),             # Logo en slide
            'icon': (200, 200),             # Íconos
        }
    }
    
    # Determinar el rol de la imagen
    role = doc_context.get('image_role', 'content')  # full_width, half_width, logo, icon, full_slide, content
    
    # Mapear role al tamaño máximo
    if doc_type == 'pptx':
        role_map = {'full_width': 'full_slide', 'half_width': 'content'}
        role = role_map.get(role, role)
    
    sizes = max_sizes.get(doc_type, max_sizes['docx'])
    max_w, max_h = sizes.get(role, sizes.get('content', (1800, 1200)))
    
    # Solo redimensionar si excede el máximo
    if img.width > max_w or img.height > max_h:
        img.thumbnail((max_w, max_h), Image.LANCZOS)
    
    return img
```

## Uso Rápido (Copy-Paste)

Para usar en cualquier script de generación de documentos, el bloque mínimo es:

```python
from PIL import Image
import os

def fix_png(img_path, bg_color='#FFFFFF'):
    """Fix rápido: elimina transparencia y retorna imagen procesada."""
    img = Image.open(img_path)
    if img.mode in ('RGBA', 'LA', 'P'):
        if img.mode == 'P':
            img = img.convert('RGBA')
        if img.mode in ('RGBA', 'LA'):
            bg_rgb = tuple(int(bg_color.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))
            background = Image.new('RGB', img.size, bg_rgb)
            background.paste(img, mask=img.split()[3])
            img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    
    out = os.path.splitext(img_path)[0] + '_fixed.png'
    img.save(out, 'PNG', optimize=True)
    return out
```

## Integración con Skills de Documentos

### Con el skill `docx`

Cuando generes un documento Word que incluya imágenes:

```python
# ANTES de insertar en el documento
from docx.shared import Inches

processed_img = fix_png('/mnt/user-data/uploads/logo.png', bg_color='#FFFFFF')
doc.add_picture(processed_img, width=Inches(2.5))
```

### Con el skill `pptx`

Cuando generes una presentación que incluya imágenes:

```python
from pptx.util import Inches

# Detectar fondo del slide si es necesario
processed_img = fix_png('/mnt/user-data/uploads/imagen.png', bg_color='#FFFFFF')
slide.shapes.add_picture(processed_img, Inches(1), Inches(1), width=Inches(4))
```

## Reglas de Detección Automática de Fondo

| Contexto | Color de fondo |
|----------|---------------|
| DOCX — cualquier sección | `#FFFFFF` (blanco) |
| PPTX — slide con fondo blanco/claro | `#FFFFFF` |
| PPTX — slide con fondo oscuro/negro | Mantener transparencia o usar el color exacto del slide |
| PPTX — slide con fondo de marca SE | `#1A1A1A` |
| PPTX — slide con fondo de marca GROW | Según el color dominante del slide |
| Logo sobre fondo de color | Usar el color del fondo destino |

## Formatos Soportados

| Formato entrada | Acción |
|----------------|--------|
| PNG con alfa | Componer sobre fondo sólido → guardar como PNG RGB |
| PNG sin alfa | Convertir a RGB si necesario → optimizar |
| JPG/JPEG | Solo optimizar tamaño si excede máximos |
| SVG | Convertir a PNG con cairosvg → aplicar pipeline |
| WEBP | Convertir a PNG → aplicar pipeline |

### Conversión SVG

```python
import cairosvg

def svg_to_png(svg_path, output_path=None, width=1200):
    """Convierte SVG a PNG para insertar en documentos."""
    if output_path is None:
        output_path = os.path.splitext(svg_path)[0] + '.png'
    cairosvg.svg2png(url=svg_path, write_to=output_path, output_width=width)
    return output_path
```

## Dependencias

```bash
pip install Pillow cairosvg --break-system-packages
```

Pillow ya está instalado en el entorno. cairosvg solo se necesita si hay SVGs.

## Idioma

Este skill es técnico/infraestructural — opera silenciosamente. No necesita comunicar nada al usuario excepto si hay un error en el procesamiento.
