# Editar Google Docs y Sheets via Claude in Chrome

Guía detallada para editar documentos y hojas de cálculo existentes en Google usando automatización de navegador.

## Preparación (aplica a ambos)

Antes de cualquier edición:

```
1. tabs_context_mcp → verificar tabs existentes
2. tabs_create_mcp → crear tab nueva para la tarea
3. Obtener el URL del documento:
   - Si el usuario lo proporcionó → usarlo directo
   - Si solo dio el nombre → google_drive_search para encontrarlo
   - Docs: https://docs.google.com/document/d/{ID}/edit
   - Sheets: https://docs.google.com/spreadsheets/d/{ID}/edit
4. navigate → ir al URL
5. computer action=wait duration=3 → esperar carga
6. computer action=screenshot → verificar que cargó bien
```

Si aparece una pantalla de login o permisos:
→ Informar al usuario: "Necesito que inicies sesión en Google en esta pestaña. ¿Puedes hacerlo?"
→ Detenerse y esperar

## Google Docs — Edición

### Entender el DOM de Google Docs

Google Docs NO renderiza texto como HTML estándar. Usa un canvas/iframe especial. Esto significa:
- `read_page` puede no mostrar el texto del documento claramente
- `get_page_text` es mejor para LEER el contenido
- Para ESCRIBIR, hacer clic en la zona del documento y usar `computer action=type`

### Leer contenido de un Doc abierto

```
Opción A (preferida): google_drive_fetch con el document_id
  → Extraer ID del URL: docs.google.com/document/d/{ESTE_ES_EL_ID}/edit
  → Es más confiable que leer desde el navegador

Opción B: get_page_text en el tab del documento
  → Útil si ya tienes el doc abierto y necesitas verificar el estado actual
```

### Escribir / Agregar texto

```
1. computer action=screenshot → ver dónde está el cursor
2. Hacer clic donde se quiere escribir:
   - computer action=left_click coordinate=[x, y] en el cuerpo del doc
3. Para ir al final del documento:
   - computer action=key text="cmd+End" (Mac) o "ctrl+End" (Linux)
4. computer action=type text="Texto a insertar"
5. computer action=screenshot → verificar
```

### Reemplazar texto

```
1. Abrir buscar y reemplazar:
   - computer action=key text="cmd+h" (Mac) o "ctrl+h" (Linux)
2. computer action=wait duration=1
3. computer action=screenshot → verificar que se abrió el diálogo
4. find → localizar campo "Buscar" → form_input o computer type
5. find → localizar campo "Reemplazar" → form_input o computer type
6. find → localizar botón "Reemplazar todo" → computer left_click
7. computer action=key text="Escape" → cerrar diálogo
8. computer action=screenshot → verificar resultado
```

### Formatear texto

Usar atajos de teclado estándar:
- **Negrita**: Cmd+B / Ctrl+B
- **Itálica**: Cmd+I / Ctrl+I
- **Subrayado**: Cmd+U / Ctrl+U
- **Seleccionar todo**: Cmd+A / Ctrl+A
- **Deshacer**: Cmd+Z / Ctrl+Z

Para formato avanzado (headings, listas):
```
1. Seleccionar texto: click + shift+click, o triple_click para párrafo
2. Usar menú Format o atajos:
   - Heading 1: Cmd+Option+1 / Ctrl+Alt+1
   - Heading 2: Cmd+Option+2 / Ctrl+Alt+2
   - Lista con viñetas: Cmd+Shift+8 / Ctrl+Shift+8
   - Lista numerada: Cmd+Shift+7 / Ctrl+Shift+7
```

### Insertar tabla

```
1. Menú: find → "Insert" en la barra de menú → click
2. find → "Table" → click  
3. Seleccionar dimensión de la cuadrícula con clicks
4. Navegar entre celdas con Tab
```

## Google Sheets — Edición

### Entender el DOM de Google Sheets

A diferencia de Docs, Sheets tiene un DOM más interactivo pero también usa un canvas para las celdas. La estrategia principal es:
- Navegar con teclado (flechas, Tab, Enter)
- Usar la barra de fórmulas (Name Box + Formula Bar) para entrada precisa
- Usar `get_page_text` para leer datos visibles

### Leer contenido de un Sheet abierto

```
Opción A: get_page_text → obtiene texto visible de las celdas
Opción B: read_page → puede identificar elementos de la interfaz
Opción C: javascript_tool → ejecutar código para leer datos del DOM (menos confiable)
```

### Navegar a una celda específica

```
Método 1 — Name Box (más confiable):
1. find → localizar el "Name Box" (campo que muestra la referencia de celda, ej: "A1")
2. computer action=left_click en el Name Box
3. computer action=triple_click → seleccionar contenido actual
4. computer action=type text="B5" (la celda destino)
5. computer action=key text="Return"
→ Ahora estás en B5

Método 2 — Atajos de teclado:
- Ctrl+Home / Cmd+Home → ir a A1
- Ctrl+End / Cmd+End → ir a última celda con datos
- Ctrl+G / Cmd+G → no funciona en Sheets; usar Name Box
```

### Escribir en celdas

```
1. Navegar a la celda destino (ver arriba)
2. computer action=type text="Contenido de la celda"
3. computer action=key text="Tab" → mover a siguiente columna
   O computer action=key text="Return" → mover a siguiente fila
```

### Escribir múltiples celdas en secuencia (por fila)

```
1. Navegar a celda inicial (ej: A1)
2. computer action=type text="Valor1"
3. computer action=key text="Tab"  → va a B1
4. computer action=type text="Valor2"
5. computer action=key text="Tab"  → va a C1
6. computer action=type text="Valor3"
7. computer action=key text="Return" → va a A2 (inicio de siguiente fila)
8. Repetir...
```

### Ingresar fórmulas

```
1. Navegar a la celda destino
2. computer action=type text="=SUM(A1:A10)"
3. computer action=key text="Return"
4. computer action=screenshot → verificar resultado
```

### Formatear celdas

Atajos:
- **Negrita**: Ctrl+B / Cmd+B
- **Moneda**: Ctrl+Shift+4
- **Porcentaje**: Ctrl+Shift+5
- **Fecha**: Ctrl+Shift+3
- **Bordes**: usar menú Format o la barra de herramientas

### Crear una hoja nueva (pestaña)

```
1. find → "Add Sheet" o botón "+" en la parte inferior
2. computer action=left_click
3. Para renombrar: double_click en la pestaña nueva → type nombre
```

## Errores comunes y soluciones

| Problema | Solución |
|---|---|
| El screenshot muestra una pantalla de carga | `computer action=wait duration=5` y reintentar |
| No puedo hacer clic en el texto del Doc | Intentar clic en el área central del canvas, no en los márgenes |
| La celda de Sheets no acepta input | Presionar F2 primero para entrar en modo edición, o simplemente empezar a teclear |
| El diálogo de buscar/reemplazar no aparece | Verificar que el foco está en el documento, no en un menú |
| Texto se escribe en lugar equivocado | Tomar screenshot, verificar dónde está el cursor, hacer clic explícito en la zona correcta |
| Google pide re-autenticación | Avisar al usuario para que se autentique manualmente |

## Buenas prácticas

1. **Screenshot antes y después** de cada acción significativa
2. **Verificar el foco** — siempre hacer clic en el área de edición antes de escribir
3. **Usar atajos de teclado** en vez de menús cuando sea posible (más rápido y confiable)
4. **No intentar operaciones masivas** — si hay que llenar 100+ celdas, es mejor generar un .xlsx local y que el usuario lo suba
5. **Confirmar cambios críticos** con el usuario antes de ejecutar
6. **Deshacer si algo sale mal** — Ctrl+Z / Cmd+Z funciona tanto en Docs como en Sheets
