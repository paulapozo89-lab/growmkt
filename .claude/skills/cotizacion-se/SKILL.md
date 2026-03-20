---
name: cotizacion-se
description: "Generate professional branded quotation documents (.docx + PDF) for Somos Estrategia clients. Use this skill whenever the user asks to create a cotización, cotizar, presupuesto, propuesta económica, or quote for any client. Also trigger when the user mentions 'cotización', 'cotizar servicios', 'propuesta de precios', 'presupuesto para cliente', or references pricing documents for Somos Estrategia. This skill handles the full workflow: gathering service details and pricing, generating a branded .docx with the SE letterhead (logo, cyan line, Montserrat font, contact footer), optional Anexo Técnico, and PDF conversion. Even if the user just says 'hazme una cotización' without details, use this skill to guide the information-gathering process."
---

# Cotización — Somos Estrategia

Skill para generar cotizaciones profesionales con la identidad visual de Somos Estrategia.

## Cuándo usar este skill

- El usuario pide crear una cotización, presupuesto o propuesta económica
- El usuario menciona cotizar servicios para un cliente
- El usuario sube un PDF o documento con requisitos de un cliente y pide cotizar
- El usuario dice "cotización", "cotizar", "presupuesto", "propuesta económica"

## Flujo de trabajo

### Paso 1 — Recopilar información

Antes de generar cualquier documento, se DEBE reunir la siguiente información. Usar el tool `ask_user_input_v0` para preguntas de opción y texto libre para preguntas abiertas. Agrupar las preguntas para minimizar idas y vueltas.

**Información obligatoria:**

1. **Destinatario**: Nombre completo, cargo, empresa/institución
2. **Servicios**: Lista de servicios a cotizar con descripción
3. **Precios**: Monto total (con o sin IVA) o precios por servicio
4. **Fecha**: Fecha del documento
5. **Firmante**: Quién firma por Somos Estrategia (default: David Navarro Ledesma, Representante Legal)

**Información opcional (preguntar si aplica):**

6. **Anexo Técnico**: ¿Incluir detalles técnicos por servicio? (objetivo, alcance, entregables, formatos)
7. **Referencia/Asunto**: Línea de referencia del documento
8. **Vigencia**: Vigencia de la cotización
9. **Condiciones de pago**: Términos de pago

Si el usuario sube un PDF o documento del cliente, extraer la información de ahí y confirmar con el usuario antes de proceder.

### Paso 2 — Calcular montos

- Si el usuario da un total con IVA: `subtotal = total / 1.16`, `IVA = subtotal * 0.16`
- Si el usuario da un total sin IVA: `IVA = subtotal * 0.16`, `total = subtotal + IVA`
- Si el usuario da precios por servicio: sumar para obtener subtotal
- Mostrar el desglose al usuario para confirmación antes de generar

**Distribución proporcional (cuando el usuario no especifica precios individuales):**
Asignar porcentajes según la complejidad/importancia relativa de cada servicio. Producción audiovisual y estrategia suelen pesar más que diseño gráfico o servicios de menor complejidad.

### Paso 3 — Generar el documento

Usar `docx-js` (npm docx) para crear el archivo .docx. Leer primero el skill de docx en `docx best practices` para las mejores prácticas de creación de documentos Word.

## Especificaciones de marca

### Colores

| Nombre | Hex | Uso |
|--------|-----|-----|
| Cyan | #33FFE6 | Líneas decorativas, headers de tabla, acentos |
| Negro | #000000 | Headers de tabla fondo, texto principal fuerte |
| Gris oscuro | #333333 | Texto cuerpo principal |
| Gris medio | #666666 | Texto secundario, cargos, subtexto |
| Gris claro | #999999 | Números de página |
| Fondo alterno | #F5F5F5 | Filas alternas en tablas (zebra striping) |

### Tipografía

- **Fuente**: Montserrat (siempre, para todo el documento)
- **Tamaño cuerpo**: 10pt (size: 20 en docx-js)
- **Tamaño headers tabla**: 8pt (size: 16)
- **Tamaño footer**: 6-7pt (size: 12-14)
- **Tamaño títulos**: 11pt (size: 22)
- **Tamaño título Anexo**: 14pt (size: 28)

### Página

- **Tamaño**: Carta / Letter (12240 x 15840 DXA)
- **Márgenes**: Superior 1800 DXA, Inferior 1600 DXA, Izquierdo/Derecho 1440 DXA
- **Ancho de contenido**: 9360 DXA

### Logo

Usar el archivo `logo-cyan-CqURR7OA.png` del proyecto. Procesar con ImageMagick para remover fondo negro:

```bash
convert logo_source.png -fuzz 15% -transparent black logo_cyan_transparent.png
```

Insertar en header con dimensiones: width 180, height 60.

### Header (todas las páginas)

1. Logo Somos Estrategia (alineado a la izquierda)
2. Línea horizontal cyan (#33FFE6) de 4pt debajo del logo

### Footer (todas las páginas)

1. Línea horizontal cyan (#33FFE6) de 4pt
2. **SOMOS ESTRATEGIA, S.A. DE C.V.** — centrado, bold, Montserrat 7pt, gris oscuro
3. Dirección completa — centrado, 6pt, gris medio
4. Tel | email | web — centrado, 6pt, separadores en cyan
5. Página X de Y — centrado, 6pt, gris claro

## Estructura del documento

### Sección 1 — Cotización (página principal)

Elementos en orden:

1. **Fecha** — alineada a la derecha, formato "Santiago de Querétaro, [día] de [mes] de [año]"
2. **Destinatario** — nombre (bold 11pt), cargo (gris medio), empresa (gris medio)
3. **"P R E S E N T E"** — bold, espaciado
4. **Párrafo introductorio** — incluir subtotal en número y letra, total con IVA en número y letra
5. **Tabla info** — tipo de medio, razón social, nombre comercial (2 columnas: 3000 + 6360 DXA)
6. **Tabla de servicios** — 6 columnas con desglose (ver especificaciones abajo)
7. **Despedida** — "Sin más por el momento..."
8. **Firma** — "A T E N T A M E N T E", línea, nombre, cargo, razón social

### Sección 2 — Anexo Técnico (opcional)

Solo incluir si el usuario lo solicita. Cada servicio tiene su propio anexo (A, B, C...) con tabla de 3 columnas: SERVICIO (2000), RUBRO (1800), DETALLE (5560).

Rubros típicos por servicio: Objetivo, Alcance, Entregables, Formatos, Equipo técnico, Plazo, Vigencia.

Al final del anexo, incluir tabla de "Información general" si hay datos de contacto del cliente o fechas de entrega.

## Tablas — Especificaciones técnicas

### Tabla de servicios (cotización principal)

- Columnas: CONCEPTO (1600), DESCRIPCIÓN (3360), UNIDAD DE MEDIDA (1000), CANT. (600), PRECIO UNITARIO (1400), PRECIO TOTAL SIN IVA (1400)
- Total columnWidths = 9360 (ancho de contenido)
- Header row: fondo negro (#000000), texto cyan (#33FFE6), bold, centrado
- Data rows: alternancia F5F5F5 / blanco
- Borders: thin 1pt #CCCCCC
- Cell margins: top/bottom 60 DXA, left/right 100 DXA
- Precios: alineados a la derecha
- Cantidad y Unidad: centrados
- Filas de totales: 4 columnas merged (span) + label + valor
- Fila TOTAL: fondo negro, texto cyan, bold

### Tabla info (tipo de medio / razón social)

- 2 columnas: Label (3000 DXA), Valor (6360 DXA)
- Header row: fondo negro, texto cyan
- Filas alternas: F5F5F5 / blanco

### Tablas de anexo técnico

- 3 columnas: SERVICIO (2000), RUBRO (1800), DETALLE (5560)
- Mismo estilo de headers y alternancia
- Primera fila muestra nombre del servicio, las siguientes lo dejan vacío

## Formato de montos

- Usar `$` + formato con comas y 2 decimales: `$275,862.07`
- Incluir monto en letra en el párrafo introductorio
- Siempre especificar "M.N." al final del monto en letra
- Ejemplo: "$275,862.07 (Doscientos setenta y cinco mil ochocientos sesenta y dos pesos 07/100 M.N.)"

## Datos de la empresa (siempre usar estos)

- **Razón social**: Somos Estrategia, S.A. de C.V.
- **Nombre comercial**: Somos Estrategia
- **Dirección**: Lic. Manuel Gómez Morin 9800, Centro Sur, 76090 Santiago de Querétaro, Qro.
- **Teléfono**: 442 247 3682
- **Correo**: contacto@somosestrategia.mx
- **Web**: www.somosestrategia.mx
- **Representante Legal**: David Navarro Ledesma

## Código base — Referencia rápida

Consultar `docx best practices` para la referencia completa de docx-js.

**Constantes de marca:**

```javascript
const CYAN = "33FFE6", BLACK = "000000", DARK_GRAY = "333333";
const MED_GRAY = "666666", LIGHT_GRAY = "999999", ALT_BG = "F5F5F5";
const PAGE_W = 12240, PAGE_H = 15840;
const MARGIN_T = 1800, MARGIN_B = 1600, MARGIN_LR = 1440;
const CONTENT_W = 9360; // PAGE_W - (MARGIN_LR * 2)
```

**Estilo default del documento:**

```javascript
styles: {
  default: { document: { run: { font: "Montserrat", size: 20, color: DARK_GRAY } } }
}
```

**Propiedades de sección:**

```javascript
properties: {
  page: {
    size: { width: PAGE_W, height: PAGE_H },
    margin: { top: MARGIN_T, right: MARGIN_LR, bottom: MARGIN_B, left: MARGIN_LR }
  }
}
```

**Cell helper — siempre usar para crear celdas de tabla:**

```javascript
function cell(text, width, opts = {}) {
  const { bold, color, bgColor, fontSize, alignment, vAlign } = {
    bold: false, color: DARK_GRAY, bgColor: null, fontSize: 18,
    alignment: AlignmentType.LEFT, vAlign: VerticalAlign.CENTER, ...opts
  };
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  return new TableCell({
    borders: { top: border, bottom: border, left: border, right: border },
    width: { size: width, type: WidthType.DXA },
    shading: bgColor ? { fill: bgColor, type: ShadingType.CLEAR } : undefined,
    verticalAlign: vAlign,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      alignment, spacing: { before: 0, after: 0 },
      children: [new TextRun({ text, bold, color, size: fontSize, font: "Montserrat" })]
    })]
  });
}
```

## Validación y entrega

1. Generar .docx con `docx-js` (`npm install -g docx` si no está instalado)
2. Validar con `python validate.py documento.docx`
3. Instalar Montserrat: `apt-get install -y fonts-montserrat && fc-cache -f`
4. Convertir a PDF: `python soffice.py --headless --convert-to pdf documento.docx`
5. Previsualizar: `pdftoppm -jpeg -r 150 documento.pdf preview` y mostrar al usuario con `view`
6. Copiar .docx y .pdf a `./output/`
7. Presentar con `present_files`

## Notas importantes

- Siempre usar `WidthType.DXA`, nunca `WidthType.PERCENTAGE` (incompatible con Google Docs)
- Siempre usar `ShadingType.CLEAR`, nunca `ShadingType.SOLID`
- Nunca usar `\n` en TextRun, siempre crear Paragraphs separados
- La suma de columnWidths debe ser igual al ancho de la tabla
- Cada celda necesita `width` además de los `columnWidths` de la tabla
- El font "Montserrat" se debe especificar en cada TextRun Y en el estilo default del documento
- Instalar Montserrat ANTES de convertir a PDF para que LibreOffice renderice correctamente
- El logo tiene fondo negro que debe removerse con `-fuzz 15% -transparent black`
- Nunca usar tablas como separadores/líneas — usar `border` en Paragraph
