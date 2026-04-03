---
globs: ["**/*.py", "**/*.js", "**/*.ts"]
---
## Regla de imágenes en documentos

ANTES de insertar cualquier imagen PNG en un DOCX o PPTX:
1. Verificar si tiene transparencia (canal alfa)
2. Si tiene transparencia: componer sobre fondo sólido usando el pipeline de `.claude/skills/image-handler/SKILL.md`
3. NUNCA insertar un PNG con canal alfa directamente — siempre se renderiza con fondo negro

Esto aplica a: logos, fotos, capturas, íconos, cualquier imagen.
