# Brand Identity — SOMOS ESTRATEGIA

Paleta y reglas visuales para reportes de Social Listening con branding de Somos Estrategia.

## Paleta de colores

| Token | Hex | Uso |
|-------|-----|-----|
| PRIMARY_CYAN | `#00F0C8` | Acentos, números KPI, headers de tabla (texto), líneas de gráficas, highlight |
| BLACK | `#000000` | Texto principal |
| DARK_GRAY | `#1A1A1A` | Fondo de headers de tabla, fondo de KPI cards |
| MID_GRAY | `#B8B8B8` | Bordes, texto secundario, footer |
| LIGHT_GRAY | `#E0E0E0` | Bordes de tabla, grid lines de gráficas |
| VERY_LIGHT | `#F5F5F5` | Filas alternas de tabla |
| WHITE | `#FFFFFF` | Fondo de página, fondo de gráficas |

## Colores de sentimiento (gráficas)

| Sentimiento | Hex | Nombre |
|-------------|-----|--------|
| Positivo | `#00C9A7` | Verde cyan |
| Negativo | `#FF6B6B` | Rojo suave |
| Neutro | `#B8B8B8` | Gris medio |
| Mixto | `#FFD93D` | Amarillo |

## Tipografía

- **Fuente principal**: Arial (universal)
- **Títulos**: Arial Bold
- **Nombre de marca**: SOMOS ESTRATEGIA (sin "+", sin "plus", todo mayúsculas)

## Estilos de tabla

```javascript
// Header cells: fondo #1A1A1A + texto #00F0C8
// Data cells: alterno blanco/#F5F5F5 + texto negro
// Valores destacados: verde #00A87D para métricas positivas
// Bordes: 1px #E0E0E0 en todas las celdas
// Márgenes de celda: top:80, bottom:80, left:120, right:120
```

## Estilos de KPI card

```javascript
// Fondo: #1A1A1A
// Número: bold, #00F0C8, size 44pt
// Label: #FFFFFF, size 16pt
// Sin bordes visibles
```

## Portada

- Barra superior con "SOMOS ESTRATEGIA" en cyan
- Título del reporte en negro, grande (36pt+)
- Keyword/marca en cyan (28pt)
- Datos del reporte (periodo, cliente) en gris medio
- Footer: "Documento confidencial | Somos Estrategia"

## Footer de página

- Izquierda: "SOMOS ESTRATEGIA | Social Listening"
- Derecha: número de página
- Separador: línea #00F0C8

## Logo

El logo de Somos Estrategia está disponible en:
- `.claude/skills/cotizacion-se/assets/logo_cyan_transparent.png` — Logo cyan con fondo transparente (preferido)
- `.claude/skills/cotizacion-se/assets/logo_cyan_original.png` — Logo cyan original

Copiar al directorio de trabajo antes de usar.

## Matplotlib settings (gráficas)

```python
BRAND_COLORS = {
    'primary': '#00F0C8',
    'black': '#000000',
    'dark_gray': '#1A1A1A',
    'mid_gray': '#B8B8B8',
    'light_gray': '#E0E0E0',
    'very_light': '#F5F5F5',
    'white': '#FFFFFF',
}

SENTIMENT_COLORS = {
    'positive': '#00C9A7',
    'negative': '#FF6B6B',
    'neutral': '#B8B8B8',
    'mixed': '#FFD93D',
}

# Chart palette for multiple series (competidores, fuentes, etc.)
CHART_PALETTE = ['#00F0C8', '#FF6B6B', '#FFD93D', '#7B68EE', '#FF8C42', '#00C9A7']

# Estilo base
plt.rcParams.update({
    'font.family': 'sans-serif',
    'font.sans-serif': ['Arial', 'Helvetica', 'DejaVu Sans'],
    'font.size': 11,
    'axes.facecolor': '#FFFFFF',
    'figure.facecolor': '#FFFFFF',
    'axes.edgecolor': '#E0E0E0',
    'axes.grid': True,
    'grid.color': '#E0E0E0',
    'grid.alpha': 0.5,
    'axes.spines.top': False,
    'axes.spines.right': False,
})
```
