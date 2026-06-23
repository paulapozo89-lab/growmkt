---
name: publicar-propuesta
description: Publica una propuesta/diagnóstico/presentación de cliente en línea como página web (HTML estático) en el sitio reportes/propuestas de GROW en Vercel, con URL limpia y, opcionalmente, protección con contraseña por cliente. Úsalo cuando Paula diga 'publica esta propuesta', 'sube la propuesta de [cliente]', 'pon esto en línea con contraseña', 'genera un link para mandarle al cliente', 'publica este HTML', 'haz pública/privada esta presentación', o cuando suba un archivo .html de propuesta/pitch/diagnóstico pidiendo un link compartible. NO usar para reportes de social listening (usar skill social-listening), ni para deploys del sitio principal growmkt.mx (usar /deploy), ni para generar el HTML desde cero (eso lo hace claude-design u otro skill antes; este skill solo PUBLICA un HTML ya hecho).
---

# Publicar Propuesta — link compartible para cliente

Convierte un archivo HTML ya terminado en una página web pública o protegida con
contraseña, en el proyecto Vercel **`growmkt-propuestas`** (repo
`paulapozo89-lab/growmkt-propuestas`, conectado a auto-deploy).

URL resultante: `https://growmkt-propuestas.vercel.app/<slug>` (sin `.html`).

## Infraestructura (ya montada)
- **Repo local:** `~/growmkt-propuestas` (clónalo si no existe:
  `gh repo clone paulapozo89-lab/growmkt-propuestas ~/growmkt-propuestas`)
- **HTML va en:** `public/<slug>.html`
- **`vercel.json`:** `{ "cleanUrls": true }` → quita el `.html` de la URL
- **`middleware.js`:** gate de contraseña por propuesta. Lee la env var
  `AUTH_<SLUG>` (formato `usuario:contraseña`). Si no existe → propuesta pública.
- **Vercel CLI:** binario en `~/.npm-global/bin/vercel` (o `vercel` en PATH).
  Cuenta plan Hobby, usuario `paulapozo89-lab`.

## Datos a confirmar con Paula ANTES de ejecutar
1. **Archivo HTML** — ruta (default: el `.html` más reciente en `~/Downloads`).
2. **Slug** — nombre corto en kebab-case para la URL (ej. `nxtech`, `santo-tomas`).
   Derívalo del cliente y confírmalo.
3. **¿Protegida con contraseña?**
   - Si **sí**: pide o propón usuario+contraseña. Default usuario = el slug.
     Genera una contraseña legible y branded para compartir con el cliente
     (ej. `Cliente-GROW-2026`). Confírmala con Paula.
   - Si **no**: queda pública (link "secreto", no indexado pero sin clave).

## Pasos
```bash
REPO=~/growmkt-propuestas
VC=~/.npm-global/bin/vercel        # o: VC=vercel
SLUG=nxtech                        # <-- ajustar
SRC=~/Downloads/archivo.html       # <-- ajustar

# 1. Repo al día
[ -d "$REPO" ] || gh repo clone paulapozo89-lab/growmkt-propuestas "$REPO"
cd "$REPO" && git pull --rebase origin main

# 2. Copiar el HTML
cp "$SRC" "public/$SLUG.html"

# 3. (SOLO si es protegida) credencial por slug → env var AUTH_<SLUG>
#    El nombre de la env var: AUTH_ + SLUG en MAYÚSCULAS y guiones como "_"
ENVKEY="AUTH_$(echo "$SLUG" | tr '[:lower:]-' '[:upper:]_')"
printf 'nxtech:NXTech-GROW-2026' | $VC env add "$ENVKEY" production   # <-- usuario:contraseña

# 4. Commit + push (dispara auto-deploy a producción por el GitHub connect)
git add -A && git commit -m "Publica propuesta $SLUG"
git push origin main
$VC deploy --prod --yes      # opcional/explícito; asegura que tome la env nueva
```

## Verificación OBLIGATORIA (no entregar sin esto)
```bash
U="https://growmkt-propuestas.vercel.app/$SLUG"
curl -s -o /dev/null -w "pública/correcta: %{http_code}\n" -u "USUARIO:CONTRA" "$U"   # 200
curl -s -o /dev/null -w "sin clave:        %{http_code}\n" "$U"                       # 401 si protegida, 200 si pública
```
- Protegida → debe dar **401 sin clave** y **200 con clave**.
- Pública → **200** directo.

## Entregable a Paula
Devuelve:
- **URL:** `https://growmkt-propuestas.vercel.app/<slug>`
- **Si protegida:** usuario + contraseña a compartir con el cliente.
- Recordatorio: el link es para mandar al cliente; la contraseña se comparte por
  canal aparte (no en el mismo correo si se quiere más seguridad).

## Notas
- Para **cambiar/quitar** la contraseña de una propuesta: `vercel env rm AUTH_<SLUG> production --yes`
  (la quita → queda pública) o re-agregar con nuevo valor, luego `vercel deploy --prod --yes`.
- Cambios de env var **no** redepliegan solos: siempre cierra con un deploy o un push.
- Nunca hardcodear credenciales en el HTML, el middleware ni el repo: siempre env var.
