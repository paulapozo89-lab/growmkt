## Reglas de deploy

- SIEMPRE git pull origin main --rebase antes de push
- Si hay conflictos: git stash, pull, git stash pop, resolver, commit
- Deploy token: usar GITHUB_DEPLOY_TOKEN del env, NUNCA hardcodear
- Branch de producción: main
- No hacer push sin confirmación explícita de Paula
