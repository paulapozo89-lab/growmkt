# Template Structure Reference

This file contains the complete JavaScript template for generating Somos Estrategia cotizaciones with docx-js. Adapt it for each specific quotation.

## Complete JS Template

```javascript
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PageBreak
} = require("docx");

const logoData = fs.readFileSync("./logo_cyan_transparent.png");

// ============================================================
// BRAND CONSTANTS — DO NOT MODIFY
// ============================================================
const CYAN = "33FFE6";
const BLACK = "000000";
const DARK_GRAY = "333333";
const MED_GRAY = "666666";
const LIGHT_GRAY = "F5F5F5";
const WHITE = "FFFFFF";

const PAGE_W = 12240;  // Letter width
const PAGE_H = 15840;  // Letter height
const MARGIN_L = 1440;
const MARGIN_R = 1440;
const MARGIN_T = 1800;
const MARGIN_B = 1600;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R; // 9360

// ============================================================
// BORDER HELPERS
// ============================================================
const noBorder = { style: BorderStyle.NONE, size: 0, color: WHITE };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const thinBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

// ============================================================
// DATA — CUSTOMIZE PER QUOTATION
// ============================================================

// Recipient info
const FECHA = "Santiago de Querétaro, [día] de [mes] de [año]";
const DESTINATARIO = "[Nombre del destinatario]";
const CARGO = "[Cargo]";
const EMPRESA = "[Empresa / Institución]";
const REFERENCIA = "[Asunto o referencia]"; // set to null to omit

// Signer info
const FIRMANTE = "David Navarro Ledesma";
const CARGO_FIRMANTE = "Representante Legal";

// Services array
const services = [
  {
    concepto: "Nombre del servicio",
    descripcion: "Descripción detallada del servicio.",
    unidad: "Servicio",
    cantidad: 1,
    precioTotal: 0.00  // precio total SIN IVA para este concepto
  },
  // Add more services...
];

// Calculated totals
const subtotal = services.reduce((sum, s) => sum + s.precioTotal, 0);
const iva = subtotal * 0.16;
const total = subtotal + iva;

// Amount in words (write manually for accuracy)
const SUBTOTAL_PALABRAS = "[Monto en palabras] pesos 00/100 M.N.";
const TOTAL_PALABRAS = "[Monto en palabras] pesos 00/100 M.N.";

// Tipo de medio (info table header)
const TIPO_MEDIO = "MEDIOS ALTERNOS / PRODUCCIÓN";

// ============================================================
// MONEY FORMATTER
// ============================================================
function formatMoney(n) {
  return "$" + n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ============================================================
// HEADER — Logo + cyan line
// ============================================================
function makeHeader() {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 0 },
        children: [
          new ImageRun({
            type: "png",
            data: logoData,
            transformation: { width: 180, height: 60 },
            altText: { title: "Somos Estrategia", description: "Logo", name: "logo" }
          })
        ]
      }),
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: CYAN, space: 1 } },
        spacing: { after: 200 },
        children: []
      })
    ]
  });
}

// ============================================================
// FOOTER — Cyan line + contact info + page number
// ============================================================
function makeFooter() {
  return new Footer({
    children: [
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: CYAN, space: 1 } },
        spacing: { before: 0, after: 80 },
        children: []
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 40 },
        children: [
          new TextRun({ text: "SOMOS ESTRATEGIA, S.A. DE C.V.", font: "Montserrat", size: 14, bold: true, color: DARK_GRAY }),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 20 },
        children: [
          new TextRun({ text: "Lic. Manuel Gómez Morin 9800, Centro Sur, 76090 Santiago de Querétaro, Qro.", font: "Montserrat", size: 12, color: MED_GRAY }),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 40 },
        children: [
          new TextRun({ text: "Tel. 442 247 3682", font: "Montserrat", size: 12, color: MED_GRAY }),
          new TextRun({ text: "  |  ", font: "Montserrat", size: 12, color: CYAN }),
          new TextRun({ text: "contacto@somosestrategia.mx", font: "Montserrat", size: 12, color: MED_GRAY }),
          new TextRun({ text: "  |  ", font: "Montserrat", size: 12, color: CYAN }),
          new TextRun({ text: "www.somosestrategia.mx", font: "Montserrat", size: 12, color: MED_GRAY }),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 0 },
        children: [
          new TextRun({ text: "Página ", font: "Montserrat", size: 12, color: "999999" }),
          new TextRun({ children: [PageNumber.CURRENT], font: "Montserrat", size: 12, color: "999999" }),
          new TextRun({ text: " de ", font: "Montserrat", size: 12, color: "999999" }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Montserrat", size: 12, color: "999999" }),
        ]
      })
    ]
  });
}

// ============================================================
// TABLE CELL HELPER
// ============================================================
function cell(text, width, opts = {}) {
  const { bold, color, bgColor, fontSize, alignment, span, vAlign, font } = {
    bold: false, color: DARK_GRAY, bgColor: null, fontSize: 18,
    alignment: AlignmentType.LEFT, span: 1, vAlign: VerticalAlign.CENTER,
    font: "Montserrat", ...opts
  };
  return new TableCell({
    borders: thinBorders,
    width: { size: width, type: WidthType.DXA },
    shading: bgColor ? { fill: bgColor, type: ShadingType.CLEAR } : undefined,
    verticalAlign: vAlign,
    columnSpan: span,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [
      new Paragraph({
        alignment,
        spacing: { before: 0, after: 0 },
        children: [new TextRun({ text, bold, color, size: fontSize, font })]
      })
    ]
  });
}

// ============================================================
// INFO TABLE (Tipo de Medio / Razón Social / Nombre Comercial)
// ============================================================
function buildInfoTable() {
  const colW = [3000, 6360];
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colW,
    rows: [
      new TableRow({ children: [
        cell("TIPO DE MEDIO", colW[0], { bold: true, color: CYAN, bgColor: BLACK, fontSize: 16 }),
        cell(TIPO_MEDIO, colW[1], { bold: true, color: CYAN, bgColor: BLACK, fontSize: 16 }),
      ]}),
      new TableRow({ children: [
        cell("RAZÓN SOCIAL", colW[0], { bold: true, fontSize: 16, bgColor: LIGHT_GRAY }),
        cell("SOMOS ESTRATEGIA, S.A. DE C.V.", colW[1], { bold: true, fontSize: 16, bgColor: LIGHT_GRAY }),
      ]}),
      new TableRow({ children: [
        cell("NOMBRE COMERCIAL", colW[0], { bold: true, fontSize: 16 }),
        cell("SOMOS ESTRATEGIA", colW[1], { bold: true, fontSize: 16 }),
      ]}),
    ]
  });
}

// ============================================================
// SERVICES TABLE
// ============================================================
function buildQuoteTable() {
  // Adjust column widths as needed (must sum to CONTENT_W = 9360)
  const colW = [1600, 3360, 1000, 600, 1400, 1400];

  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      cell("CONCEPTO", colW[0], { bold: true, color: CYAN, bgColor: BLACK, fontSize: 16, alignment: AlignmentType.CENTER }),
      cell("DESCRIPCIÓN DEL SERVICIO", colW[1], { bold: true, color: CYAN, bgColor: BLACK, fontSize: 16, alignment: AlignmentType.CENTER }),
      cell("UNIDAD DE MEDIDA", colW[2], { bold: true, color: CYAN, bgColor: BLACK, fontSize: 16, alignment: AlignmentType.CENTER }),
      cell("CANT.", colW[3], { bold: true, color: CYAN, bgColor: BLACK, fontSize: 16, alignment: AlignmentType.CENTER }),
      cell("PRECIO UNITARIO", colW[4], { bold: true, color: CYAN, bgColor: BLACK, fontSize: 16, alignment: AlignmentType.CENTER }),
      cell("PRECIO TOTAL SIN IVA", colW[5], { bold: true, color: CYAN, bgColor: BLACK, fontSize: 16, alignment: AlignmentType.CENTER }),
    ]
  });

  const dataRows = services.map((s, i) => {
    const bg = i % 2 === 0 ? LIGHT_GRAY : WHITE;
    const unitPrice = s.precioTotal / s.cantidad;
    return new TableRow({
      children: [
        cell(s.concepto, colW[0], { bold: true, fontSize: 16, bgColor: bg }),
        cell(s.descripcion, colW[1], { fontSize: 15, bgColor: bg }),
        cell(s.unidad, colW[2], { fontSize: 16, bgColor: bg, alignment: AlignmentType.CENTER }),
        cell(String(s.cantidad), colW[3], { fontSize: 16, bgColor: bg, alignment: AlignmentType.CENTER }),
        cell(formatMoney(unitPrice), colW[4], { fontSize: 16, bgColor: bg, alignment: AlignmentType.RIGHT }),
        cell(formatMoney(s.precioTotal), colW[5], { fontSize: 16, bgColor: bg, alignment: AlignmentType.RIGHT }),
      ]
    });
  });

  // Totals
  const emptySpan = colW[0] + colW[1] + colW[2] + colW[3];
  function totalRow(label, value, isFinal = false) {
    const bg = isFinal ? BLACK : WHITE;
    const txtColor = isFinal ? CYAN : DARK_GRAY;
    return new TableRow({
      children: [
        new TableCell({
          borders: thinBorders,
          width: { size: emptySpan, type: WidthType.DXA },
          columnSpan: 4,
          children: [new Paragraph({ children: [] })]
        }),
        cell(label, colW[4], { bold: true, fontSize: 16, alignment: AlignmentType.RIGHT, bgColor: bg, color: txtColor }),
        cell(value, colW[5], { bold: true, fontSize: 16, alignment: AlignmentType.RIGHT, bgColor: bg, color: txtColor }),
      ]
    });
  }

  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colW,
    rows: [
      headerRow,
      ...dataRows,
      totalRow("SUBTOTAL", formatMoney(subtotal)),
      totalRow("IVA (16%)", formatMoney(iva)),
      totalRow("TOTAL", formatMoney(total), true),
    ]
  });
}

// ============================================================
// ANEXO TÉCNICO TABLE (Optional)
// ============================================================
function buildAnexoTable(serviceName, rows) {
  const colW = [2000, 1800, 5560];
  const headerRow = new TableRow({
    children: [
      cell("SERVICIO", colW[0], { bold: true, color: CYAN, bgColor: BLACK, fontSize: 16, alignment: AlignmentType.CENTER }),
      cell("RUBRO", colW[1], { bold: true, color: CYAN, bgColor: BLACK, fontSize: 16, alignment: AlignmentType.CENTER }),
      cell("DETALLE", colW[2], { bold: true, color: CYAN, bgColor: BLACK, fontSize: 16, alignment: AlignmentType.CENTER }),
    ]
  });
  const dataRows = rows.map((r, i) => {
    const bg = i % 2 === 0 ? LIGHT_GRAY : WHITE;
    return new TableRow({
      children: [
        cell(i === 0 ? serviceName : "", colW[0], { bold: true, fontSize: 16, bgColor: bg }),
        cell(r.rubro, colW[1], { bold: true, fontSize: 16, bgColor: bg }),
        cell(r.detalle, colW[2], { fontSize: 15, bgColor: bg }),
      ]
    });
  });
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colW,
    rows: [headerRow, ...dataRows]
  });
}

// ============================================================
// DOCUMENT ASSEMBLY
// ============================================================
const sectionProps = {
  page: {
    size: { width: PAGE_W, height: PAGE_H },
    margin: { top: MARGIN_T, right: MARGIN_R, bottom: MARGIN_B, left: MARGIN_L }
  }
};

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Montserrat", size: 20, color: DARK_GRAY } } },
  },
  sections: [
    // ===== SECTION 1: COTIZACIÓN =====
    {
      properties: sectionProps,
      headers: { default: makeHeader() },
      footers: { default: makeFooter() },
      children: [
        // Date
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { after: 400 },
          children: [new TextRun({ text: FECHA, size: 20, color: MED_GRAY })]
        }),
        // Recipient
        new Paragraph({
          spacing: { after: 0 },
          children: [new TextRun({ text: DESTINATARIO, bold: true, size: 22 })]
        }),
        new Paragraph({
          spacing: { after: 0 },
          children: [new TextRun({ text: CARGO, bold: true, size: 20, color: MED_GRAY })]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: EMPRESA, bold: true, size: 20, color: MED_GRAY })]
        }),
        new Paragraph({
          spacing: { after: 300 },
          children: [new TextRun({ text: "P R E S E N T E", bold: true, size: 22 })]
        }),
        // Intro paragraph — CUSTOMIZE the text per quotation
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: "Derivado de la solicitud de cotización para la contratación de los servicios de [descripción], le hago saber la propuesta económica que es de ", size: 20 }),
            new TextRun({ text: formatMoney(subtotal), bold: true, size: 20 }),
            new TextRun({ text: " (" + SUBTOTAL_PALABRAS + ") que, agregado el Impuesto al Valor Agregado (IVA), da un total de ", size: 20 }),
            new TextRun({ text: formatMoney(total), bold: true, size: 20, color: BLACK }),
            new TextRun({ text: " (" + TOTAL_PALABRAS + ").", size: 20 }),
          ]
        }),
        // Info table
        buildInfoTable(),
        new Paragraph({ spacing: { before: 200, after: 100 }, children: [] }),
        // Services table
        buildQuoteTable(),
        // Closing
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 300, after: 100 },
          children: [
            new TextRun({ text: "Sin más por el momento, quedo a sus órdenes para cualquier aclaración o información adicional.", size: 20, color: MED_GRAY }),
          ]
        }),
        // Signature block
        new Paragraph({ spacing: { before: 600, after: 0 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 0 },
          children: [new TextRun({ text: "A T E N T A M E N T E", bold: true, size: 20 })]
        }),
        new Paragraph({ spacing: { before: 600, after: 0 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: DARK_GRAY, space: 1 } },
          spacing: { after: 0 },
          children: [new TextRun({ text: FIRMANTE, bold: true, size: 20 })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 0 },
          children: [new TextRun({ text: CARGO_FIRMANTE, size: 18, color: MED_GRAY })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Somos Estrategia, S.A. de C.V.", size: 18, color: MED_GRAY })]
        }),
      ]
    },

    // ===== SECTION 2: ANEXO TÉCNICO (Optional — remove if not needed) =====
    // {
    //   properties: sectionProps,
    //   headers: { default: makeHeader() },
    //   footers: { default: makeFooter() },
    //   children: [
    //     new Paragraph({
    //       spacing: { after: 100 },
    //       children: [new TextRun({ text: "ANEXO TÉCNICO", bold: true, size: 28, color: BLACK })]
    //     }),
    //     new Paragraph({
    //       border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: CYAN, space: 1 } },
    //       spacing: { after: 200 },
    //       children: []
    //     }),
    //     new Paragraph({
    //       alignment: AlignmentType.JUSTIFIED,
    //       spacing: { after: 200 },
    //       children: [new TextRun({ text: "Descripción del alcance técnico...", size: 18, color: MED_GRAY })]
    //     }),
    //     // Add buildAnexoTable() calls per service here
    //   ]
    // }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("./cotizacion_[CLIENTE].docx", buffer);
  console.log("Document created!");
});
```

## Number-to-Words Quick Reference (Spanish)

Use these for the introductory paragraph amounts:

| Number | Words |
|--------|-------|
| 100,000 | Cien mil |
| 150,000 | Ciento cincuenta mil |
| 200,000 | Doscientos mil |
| 250,000 | Doscientos cincuenta mil |
| 275,862.07 | Doscientos setenta y cinco mil ochocientos sesenta y dos pesos 07/100 M.N. |
| 300,000 | Trescientos mil |
| 320,000 | Trescientos veinte mil |
| 500,000 | Quinientos mil |
| 1,000,000 | Un millón de |
| 2,586,207 | Dos millones quinientos ochenta y seis mil doscientos siete |

Format: "[Amount in words] pesos [centavos]/100 M.N."

## Column Width Presets

For 6-column services table (sum = 9360 DXA):
- Standard: `[1600, 3360, 1000, 600, 1400, 1400]`
- Long descriptions: `[1400, 3760, 900, 500, 1400, 1400]`
- Short descriptions: `[1800, 3060, 1000, 700, 1400, 1400]`

For 3-column anexo table (sum = 9360 DXA):
- Standard: `[2000, 1800, 5560]`
