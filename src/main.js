import { createApp } from 'vue'
import App from './App.vue'
import './style.scss'
import { initCookieConsent } from './cookieConsent'

// Inicjalizacja cookie consent
initCookieConsent()

createApp(App).mount('#app')
