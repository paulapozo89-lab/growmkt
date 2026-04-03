# GROW Marketing — Proyecto

## Arquitectura
- **Repo**: paulapozo89-lab/growmkt
- **Deploy**: reportes.growmkt.mx / growmkt.mx
- **Reports path**: `public/reportes/`
- **Branch**: main (producción directa)
- **Deploy token**: `$GITHUB_DEPLOY_TOKEN` (env var)

## Branding
- Referencia completa: `.claude/skills/social-listening/references/brand-grow.md`
- Nombre: **GROW** (todo mayúsculas)
- Tagline: "Tu Growth Partner"
- Primary Cyan: `#2BAECC`
- Primary Blue: `#2F95EA`
- Accent Coral: `#E5526C`
- Font: Inter (Google Fonts)
- Logo color: `.claude/skills/content-grid-captioner/assets/grow_logo_color.png`
- Logo negro: `.claude/skills/content-grid-captioner/assets/grow_logo_black.png`
- HTML theme: dark mode (body bg #0a0a0a)
- Dominio: growmkt.mx

## Reportes de Social Listening
- Skill: `.claude/skills/social-listening/SKILL.md`
- 3 modos: solo listening, solo metrics, combined
- Output: HTML + PDF slides + DOCX
- Colores sentiment GROW: Positivo #2BAECC, Negativo #E5526C, Neutro #9CA3AF, Mixto #FFD93D

## Parrillas de Contenido
- Skill de estrategia: `.claude/skills/content-strategy-creator/SKILL.md`
- Skill de armado con captions: `.claude/skills/content-grid-captioner/SKILL.md`
- Logos GROW para parrillas: `.claude/skills/content-grid-captioner/assets/`
- Flujo: estrategia primero → diseño → captions → PPTX final con logo

## Cotizaciones
- Skill: `.claude/skills/cotizacion-se/SKILL.md` (adaptar branding a GROW)
- Usar colores GROW, no SE
- Logo: grow_logo_color.png, no el logo de SE

## Diseño Social (Figma)
- Skill: `.claude/skills/figma-social-designer/SKILL.md`
- Branding Global Solutions: `.claude/skills/figma-social-designer/brands/branding-global-solutions.md`

## Imágenes en documentos
**SIEMPRE** procesar imágenes PNG con el skill `image-handler` antes de insertarlas en DOCX/PPTX. Ver `.claude/skills/image-handler/SKILL.md`.

## Clientes activos
- Global Solutions S&L (NOM certification, Zempoala Hidalgo)
  - Palette: #1F2036, #161729, #282A42, #7B8FBF, #9AADDA, #C4733F — NO green
  - Font: Rajdhani (títulos), Inter (body)
- Viajes LeGrand (web redesign — repo separado: legrand-travel)

## Skills disponibles
Hay 13 skills en `.claude/skills/`. Consultar el SKILL.md de cada uno antes de ejecutar.
