# Deploy na GitHub Pages
## Automatyczny deploy z GitHub Actions

Projekt jest skonfigurowany do automatycznego deploy na GitHub Pages przy każdym push do brancha `main`.

### Kroki do włączenia GitHub Pages:

1. **Włącz GitHub Pages w repozytorium:**
   - Idź do Settings → Pages
   - W sekcji "Source" wybierz "Deploy from a branch"
   - Branch: `gh-pages` (zostanie utworzony automatycznie)

2. **Sprawdź uprawnienia workflow:**
   - Idź do Settings → Actions → General
   - W sekcji "Workflow permissions" wybierz "Read and write permissions"
   - Zaznacz "Allow GitHub Actions to create and approve pull requests"

3. **Sprawdź uprawnienia do brancha:**
   - Idź do Settings → Branches
   - Upewnij się, że branch `main` ma uprawnienia do push

4. **Push kodu do repozytorium:**
   ```bash
   git add .
   git commit -m "USR-XXX - feat: setup GitHub Pages deployment"
   git push origin main
   ```

5. **Sprawdź status deploy:**
   - Idź do zakładki "Actions" w repozytorium
   - Sprawdź czy workflow "Deploy to GitHub Pages" się wykonał pomyślnie

6. **Dostęp do strony:**
   - Strona będzie dostępna pod adresem: `https://[username].github.io/eduwave-landing/`

## Manualny deploy

Jeśli chcesz zrobić manualny deploy:

```bash
# Zainstaluj zależności
npm install

# Zbuduj projekt
npm run build

# Deploy na GitHub Pages
npm run deploy
```

## Konfiguracja

- **Base path:** `/eduwave-landing/` (dla GitHub Pages)
- **Build folder:** `dist/`
- **Node version:** 18
- **Framework:** Vue 3 + Vite + Tailwind CSS

## Troubleshooting

### Problem z ścieżkami
Jeśli obrazy/zasoby nie ładują się poprawnie, sprawdź czy:
- Base path w `vite.config.js` jest ustawiony na `/eduwave-landing/`
- Wszystkie ścieżki w kodzie używają względnych ścieżek

### Problem z GitHub Actions
- Sprawdź czy masz włączone GitHub Pages w Settings
- Upewnij się że workflow ma uprawnienia do zapisu
- Sprawdź logi w zakładce Actions

### Problem z uprawnieniami (403 error)
Jeśli widzisz błąd "Permission denied to github-actions[bot]":
1. Idź do Settings → Actions → General
2. "Workflow permissions" → "Read and write permissions"
3. Zaznacz "Allow GitHub Actions to create and approve pull requests"
4. Zapisz zmiany
5. Uruchom ponownie workflow (Re-run all jobs)
