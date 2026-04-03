Ejecuta el deploy del sitio a producción:
1. `git add -A`
2. `git commit -m "$ARGUMENTS"` (si no hay argumento, genera un mensaje descriptivo basado en los cambios)
3. `git pull origin main --rebase`
4. `git push origin main`
5. Espera 10 segundos y verifica que el deploy esté correcto
