# Deploy na GitHub Pages

## Automatyczny deploy z GitHub Actions

Projekt jest skonfigurowany do automatycznego deploy na GitHub Pages przy każdym push do brancha `main`.

### Kroki do włączenia GitHub Pages:

1. **Włącz GitHub Pages w repozytorium:**
   - Idź do Settings → Pages
   - W sekcji "Source" wybierz "GitHub Actions"

2. **Sprawdź uprawnienia workflow:**
   - Idź do Settings → Actions → General
   - W sekcji "Workflow permissions" wybierz "Read and write permissions"
   - Zaznacz "Allow GitHub Actions to create and approve pull requests"

3. **Push kodu do repozytorium:**
   ```bash
   git add .
   git commit -m "USR-XXX - feat: setup GitHub Pages deployment"
   git push origin main
   ```

4. **Sprawdź status deploy:**
   - Idź do zakładki "Actions" w repozytorium
   - Sprawdź czy workflow "Deploy to GitHub Pages" się wykonał pomyślnie

5. **Dostęp do strony:**
   - Strona będzie dostępna pod adresem: `https://[username].github.io/landing/`

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

- **Base path:** `/landing/` (dla GitHub Pages)
- **Build folder:** `dist/`
- **Node version:** 18
- **Framework:** Vue 3 + Vite + Tailwind CSS

## Troubleshooting

### Problem z ścieżkami
Jeśli obrazy/zasoby nie ładują się poprawnie, sprawdź czy:
- Base path w `vite.config.js` jest ustawiony na `/landing/`
- Wszystkie ścieżki w kodzie używają względnych ścieżek

### Problem z GitHub Actions
- Sprawdź czy masz włączone GitHub Pages w Settings
- Upewnij się że workflow ma uprawnienia do zapisu
- Sprawdź logi w zakładce Actions
