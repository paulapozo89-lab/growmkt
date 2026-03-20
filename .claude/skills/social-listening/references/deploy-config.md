# Deploy Configuration — Social Listening + Metrics Reports

## GitHub Access
- **Token**: read from environment variable `$GITHUB_DEPLOY_TOKEN`
- **Account**: paulapozo89-lab
- Token has fine-grained access to: somosestrategia, growmkt
- To set: add `export GITHUB_DEPLOY_TOKEN="<your-token>"` to `~/.zshrc`

## Repos & Domains

### Somos Estrategia
- **Repo**: `paulapozo89-lab/somosestrategia`
- **Domain**: `somosestrategia.vercel.app`
- **Reports path**: `public/reportes/`
- **URL pattern**: `somosestrategia.vercel.app/reportes/{client}-{period}-{hash}.html`
- **Logo cyan (HTML)**: Embed as base64 from uploaded `logo-cyan-CqURR7OA.png`
- **Logo black (PDF portada)**: Generate from cyan → convert pixels to black, keep transparency
- **Logo cyan small (PDF footer)**: Same cyan, small size bottom-right
- **Status**: ✅ LIVE

### GROW Marketing
- **Repo**: `paulapozo89-lab/growmkt`
- **Domain**: `reportes.growmkt.mx`
- **Reports path**: `public/reportes/`
- **URL pattern**: `reportes.growmkt.mx/reportes/{client}-{period}-{hash}.html`
- **Logo color**: `grow-logo-color-Dma9RsSM.png` (1920x1071, RGBA)
- **Status**: ✅ LIVE (CNAME via IONOS)

## Deploy Workflow
1. Generate HTML report with brand-specific styling
2. Add `<meta name="robots" content="noindex, nofollow">`
3. Embed ALL logos as base64 (HTML renders in contexts without network access)
4. Generate 6-char random hash for URL
5. Upload HTML + slides PDF + doc PDF to GitHub via API
6. Vercel auto-deploys in ~30s
7. Verify HTTP 200 on the URL
8. Return link to user

## API Upload Method
```python
import base64, json, os, urllib.request

def upload_to_github(filepath, repo_path, repo, token=None, message="feat: add report"):
    token = token or os.environ["GITHUB_DEPLOY_TOKEN"]
    with open(filepath, 'rb') as f:
        b64 = base64.b64encode(f.read()).decode()
    
    # Check if file exists (to get SHA for update)
    try:
        req = urllib.request.Request(
            f'https://api.github.com/repos/{repo}/contents/{repo_path}',
            headers={'Authorization': f'Bearer {token}', 'Accept': 'application/vnd.github+json'})
        resp = json.load(urllib.request.urlopen(req))
        sha = resp['sha']
        payload = {'message': message, 'content': b64, 'sha': sha}
    except:
        payload = {'message': message, 'content': b64}
    
    # Write payload to temp file (avoids shell limits)
    with open('/tmp/gh_payload.json', 'w') as f:
        json.dump(payload, f)
    
    # Upload via curl (more reliable for large files)
    # curl -s -X PUT -H "Authorization: Bearer {token}" -H "Accept: application/vnd.github+json" \
    #   "https://api.github.com/repos/{repo}/contents/{repo_path}" -d @/tmp/gh_payload.json
```

## Files to upload per report
```
public/reportes/{name}.html          ← Main interactive report
public/reportes/{name}-slides.pdf    ← Horizontal slides PDF (white theme)
public/reportes/{name}.pdf           ← Vertical document PDF
```

## Security
- Reports have `noindex, nofollow` meta tag
- URL hash (6 chars) makes links non-guessable
- Vercel headers add `X-Robots-Tag: noindex, nofollow` for /reportes/*
- No password protection (link = access)

## Brand Selection Logic
- Default: Somos Estrategia
- User says "con branding GROW", "para GROW", "dominio GROW" → GROW config
- User says "para Somos" or doesn't specify → SE config
- If unclear → ask user
