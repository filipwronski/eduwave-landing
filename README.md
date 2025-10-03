# Eduwave Landing Page

Responsywny landing page dla Eduwave stworzony w Vue 3 z Composition API.

## Funkcjonalności

- ✅ Responsywny design (desktop/mobile)
- ✅ Hero section z logo i CTA
- ✅ Sekcja "Dlaczego Eduwave?" z listą korzyści
- ✅ Formularz kontaktowy z walidacją
- ✅ Animacje i efekty hover
- ✅ Smooth scroll do formularza
- ✅ Walidacja pól wymaganych
- ✅ Loading state dla przycisku submit

## Technologie

- Vue 3 + Composition API
- Tailwind CSS
- Vite
- JavaScript ES6+

## Instalacja i uruchomienie

1. Zainstaluj zależności:
```bash
npm install
```

2. Uruchom serwer deweloperski:
```bash
npm run dev
```

3. Otwórz przeglądarkę na `http://localhost:3000`

## Budowanie dla produkcji

```bash
npm run build
```

## Struktura projektu

```
src/
├── components/
│   ├── LandingPage.vue    # Główny komponent strony
│   └── ContactForm.vue    # Formularz kontaktowy
├── App.vue                # Główny komponent aplikacji
├── main.js               # Punkt wejścia aplikacji
└── style.css             # Globalne style z Tailwind CSS
```

## Walidacja formularza

Formularz zawiera walidację dla:
- **Imię** (wymagane, min. 2 znaki)
- **Telefon** (wymagane, format polski)
- **Email** (opcjonalne, format email)
- **Akceptacja warunków** (wymagane)

## Responsywność

- **Desktop**: Formularz po prawej stronie
- **Mobile**: Formularz poniżej głównej treści
- **Breakpoint**: 1024px (lg w Tailwind)

## Kolory

- Tło: Białe
- Tekst: Czarny
- Akcent: #A4C639 (Eduwave Green)
- Formularz: #A4C639

## Ikony

Używa plików SVG:
- `logo.svg` - Logo Eduwave
- `check-circle.svg` - Ikony check dla listy korzyści
