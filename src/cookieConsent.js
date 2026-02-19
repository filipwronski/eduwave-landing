import 'vanilla-cookieconsent/dist/cookieconsent.css';
import './cookieConsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

// Funkcje do ładowania skryptów
function loadGTM() {
  if (window.dataLayer) return; // Już załadowane

  // Inicjalizacja dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});

  // Ładowanie GTM
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-KHS92RVN';
  document.head.appendChild(script);

  console.log('✅ GTM loaded');
}

function loadGrowthbook() {
  if (window.growthbook) return; // Już załadowane

  const script = document.createElement('script');
  script.async = true;
  script.dataset.apiHost = "https://cdn.growthbook.io";
  script.dataset.clientKey = "sdk-TIs54GDvW2zF1vs";
  script.src = "https://cdn.jsdelivr.net/npm/@growthbook/growthbook/dist/bundles/auto.min.js";
  document.head.appendChild(script);

  console.log('✅ Growthbook loaded');
}

export function initCookieConsent() {
  CookieConsent.run({
    // Ustawienia podstawowe
    guiOptions: {
      consentModal: {
        layout: 'box wide',
        position: 'bottom center',
        equalWeightButtons: false,
        flipButtons: false
      },
      preferencesModal: {
        layout: 'box',
        position: 'right',
        equalWeightButtons: false,
        flipButtons: false
      }
    },

    // Kategorie cookies
    categories: {
      necessary: {
        enabled: true,
        readOnly: true
      },
      analytics: {
        enabled: false,
        autoClear: {
          cookies: [
            {
              name: /^_ga/
            },
            {
              name: '_gid'
            }
          ]
        }
      },
      marketing: {
        enabled: false
      }
    },

    // Callback gdy użytkownik po raz pierwszy wyraża zgodę
    onFirstConsent: ({ cookie }) => {
      console.log('First consent:', cookie);

      if (cookie.categories.includes('analytics')) {
        loadGTM();
      }

      if (cookie.categories.includes('marketing')) {
        loadGrowthbook();
      }
    },

    // Callback gdy zgoda się zmienia
    onConsent: ({ cookie }) => {
      console.log('Consent changed:', cookie);

      if (cookie.categories.includes('analytics')) {
        loadGTM();
      }

      if (cookie.categories.includes('marketing')) {
        loadGrowthbook();
      }
    },

    // Tłumaczenie polskie
    language: {
      default: 'pl',
      translations: {
        pl: {
          consentModal: {
            title: 'Używamy plików cookie',
            description: 'Ta strona wykorzystuje pliki cookie w celu zapewnienia najlepszego doświadczenia. Możesz wybrać, które pliki cookie chcesz zaakceptować.',
            acceptAllBtn: 'Akceptuj',
            acceptNecessaryBtn: 'Odrzuć',
            showPreferencesBtn: 'Zarządzaj',
            footer: `
              <a href="#polityka-prywatnosci">Polityka prywatności</a>
            `
          },
          preferencesModal: {
            title: 'Ustawienia plików cookie',
            acceptAllBtn: 'Akceptuj',
            acceptNecessaryBtn: 'Odrzuć',
            savePreferencesBtn: 'Zapisz ustawienia',
            closeIconLabel: 'Zamknij',
            serviceCounterLabel: 'Usługa|Usługi',
            sections: [
              {
                title: 'Wykorzystanie plików cookie',
                description: 'Używamy plików cookie, aby zapewnić podstawowe funkcje strony oraz poprawić Twoje wrażenia z korzystania z niej. Możesz wybrać dla każdej kategorii, czy chcesz ją włączyć czy wyłączyć. Aby uzyskać więcej informacji na temat plików cookie i innych wrażliwych danych, przeczytaj pełną <a href="#polityka-prywatnosci" class="cc-link">politykę prywatności</a>.'
              },
              {
                title: 'Niezbędne pliki cookie',
                description: 'Te pliki cookie są niezbędne dla prawidłowego funkcjonowania strony internetowej. Bez tych plików cookie strona internetowa nie działałaby prawidłowo.',
                linkedCategory: 'necessary'
              },
              {
                title: 'Pliki cookie analityczne',
                description: 'Te pliki cookie pomagają nam zrozumieć, jak użytkownicy korzystają z naszej strony internetowej, zbierając i raportując informacje anonimowo.',
                linkedCategory: 'analytics',
                cookieTable: {
                  headers: {
                    name: 'Nazwa',
                    domain: 'Domena',
                    description: 'Opis',
                    expiration: 'Wygaśnięcie'
                  },
                  body: [
                    {
                      name: '_ga',
                      domain: location.hostname,
                      description: 'Google Analytics - identyfikacja użytkownika',
                      expiration: '2 lata'
                    },
                    {
                      name: '_gid',
                      domain: location.hostname,
                      description: 'Google Analytics - identyfikacja sesji',
                      expiration: '24 godziny'
                    }
                  ]
                }
              },
              {
                title: 'Pliki cookie marketingowe i A/B testing',
                description: 'Te pliki cookie są używane do personalizacji treści i testowania różnych wersji strony.',
                linkedCategory: 'marketing'
              },
              {
                title: 'Więcej informacji',
                description: 'W przypadku pytań dotyczących naszej polityki dotyczącej plików cookie i Twoich wyborów, prosimy o <a class="cc-link" href="#kontakt">kontakt</a>.'
              }
            ]
          }
        }
      }
    }
  });
}
