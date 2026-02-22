<template>
  <div id="contact-form" class="bg-[#671E75] w-full h-full rounded-2xl py-8 px-6 shadow-lg min-h-[660px] flex justify-center items-center">
    <Transition name="fade" mode="out-in">
      <FormSuccess
        v-if="isSuccess"
        @sendAnotherRequest="isSuccess = false"
      />

      <div  v-else>
        <h3 class="text-2xl lg:text-2xl font-bold text-white">
          Umów się na konsultację
        </h3>

        <form
        @submit.prevent="handleSubmit"
        class="mt-8"
      >
      <!-- Name Field -->
      <div class="mb-4">
        <label for="name" class="form-label text-white">
          Imię
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          data-field="name"
          class="form-input shadow-none focus:border-error-color focus:ring-0 focus:ring-offset-0"
          :class="{ 'border-error-color': errors.name }"
          @focus="trackFieldFocus('name')"
          @blur="validateField('name')"
        />
        <p v-if="errors.name" class="error-message flex items-center mt-2">
          <img src="/warning-outline.svg" alt="Warning" class="w-4 h-4 mr-2" />
        {{ errors.name }}</p>
      </div>
      
      <!-- Phone Field -->
      <div  class="mb-4">
        <label for="phone" class="form-label">
          Telefon
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          data-field="phone"
          class="form-input shadow-none focus:border-error-color focus:ring-0 focus:ring-offset-0"
          :class="{ 'border-error-color': errors.phone }"
          @focus="trackFieldFocus('phone')"
          @blur="validateField('phone')"
        />
        <p v-if="errors.phone" class="error-message flex items-center mt-2">
          <img src="/warning-outline.svg" alt="Warning" class="w-4 h-4 mr-2" />
        {{ errors.phone }}</p>
      </div>
      
      <!-- Email Field -->
      <div  class="mb-4">
        <label for="email" class="form-label">
          Mail (nieobowiązkowo)
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          data-field="email"
          class="form-input shadow-none focus:border-error-color focus:ring-0 focus:ring-offset-0"
          :class="{ 'border-error-color': errors.email }"
          @focus="trackFieldFocus('email')"
          @blur="validateField('email')"
        />
        <p v-if="errors.email" class="error-message flex items-center mt-2">
          <img src="/warning-outline.svg" alt="Warning" class="w-4 h-4 mr-2" />
          {{ errors.email }}
        </p>
      </div>
      
      <!-- Subject Field -->
      <div  class="mb-4">
        <label for="subject" class="form-label">
          Wybierz przedmiot
        </label>
        <select
          id="subject"
          v-model="form.subject"
          data-field="subject"
          class="form-input shadow-none focus:border-error-color focus:ring-0 focus:ring-offset-0"
          :class="{ 'border-error-color': errors.subject }"
          @focus="trackFieldFocus('subject')"
          @change="validateField('subject')"
        >
          <option value="" disabled selected></option>
          <option value="matematyka">Matematyka</option>
          <option value="fizyka">Fizyka</option>
          <option value="chemia">Chemia</option>
          <option value="biologia">Biologia</option>
          <option value="informatyka">Informatyka</option>
          <option value="angielski">Język angielski</option>
          <option value="polski">Język polski</option>
          <option value="historia">Historia</option>
          <option value="geografia">Geografia</option>
          <option value="inny">Inny</option>
        </select>
        <p v-if="errors.subject" class="error-message flex items-center mt-2">
          <img src="/warning-outline.svg" alt="Warning" class="w-4 h-4 mr-2" />
          {{ errors.subject }}
        </p>
      </div>
      
      <!-- Curriculum Field -->
      <div class="mb-4">
        <label for="curriculum" class="form-label">
          Program nauczania (nieobowiązkowo)
        </label>
        <select
          id="curriculum"
          v-model="form.curriculum"
          data-field="level"
          class="form-input shadow-none focus:border-error-color focus:ring-0 focus:ring-offset-0"
          :class="{ 'border-error-color': errors.curriculum }"
          @focus="trackFieldFocus('curriculum')"
        >
          <option value="" disabled selected></option>
          <option value="matura">Matura</option>
          <option value="ib">International Baccalaureate (IB)</option>
          <option value="a-levels">A-levels</option>
          <option value="olimpiady">Olimpiady</option>
          <option value="inny">Inny</option>
        </select>
      </div>

      <!-- Additional information Field -->
      <div class="mb-4">
        <label
          for="additional-information"
          class="form-label cursor-pointer"
          :class="{ 'text-error-color': errors.additionalInformation }"
          @click="hasAdditionalInformation = !hasAdditionalInformation"
        >
          + <span class="dotted-underline">Dodatkowe informacje (nieobowiązkowo)</span>
        </label>
        <Transition name="expand">
          <div v-if="hasAdditionalInformation" class="mt-2">
            <textarea
              id="additional-information"
              v-model="form.additionalInformation"
              data-field="message"
              class="form-input min-h-[100px] shadow-none focus:border-error-color focus:ring-0 focus:ring-offset-0"
            ></textarea>
          </div>
        </Transition>
        <transition name="fade" mode="out-in">
          <p v-if="errors.additionalInformation" class="error-message flex items-center mt-2">
            <img src="/warning-outline.svg" alt="Warning" class="w-4 h-4 mr-2" />
            {{ errors.additionalInformation }}
          </p>
        </transition>
      </div>

      <!-- Honeypot field (hidden from users, catches bots) -->
      <input
        type="text"
        v-model="form.website"
        name="website"
        tabindex="-1"
        autocomplete="off"
        style="position: absolute; left: -9999px;"
        aria-hidden="true"
      />
      
      <div class="mb-8">
        <!-- Terms Checkbox -->
        <div class="flex items-start" >
          <div class="relative">
            <input
              id="terms"
              v-model="form.terms"
              type="checkbox"
              class="sr-only"
            />
            <div 
              class="w-[18px] h-[18px] mr-2 bg-white border rounded-[3px] cursor-pointer flex items-center justify-center"
              :class="{ 'border-error-color': errors.terms }"
              @click="form.terms = !form.terms"
            >
              <svg 
                v-if="form.terms" 
                class="w-3 h-3 text-black" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fill-rule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <label for="terms" class="text-[13px] font-medium text-white cursor-pointer">
            <!-- todo: dodać polityke -->
            Zapoznałem/am się z <a href="/polityka-prywatnosci" class="dotted-underline">Polityką prywatności</a> i wyrażam zgodę na przetwarzanie danych osobowych
          </label>
        </div>
        <p v-if="errors.terms" class="error-message flex items-center mt-2">
          <img src="/warning-outline.svg" alt="Warning" class="w-4 h-4 mr-2" />
          {{ errors.terms }}
        </p>
      </div>
      
      
      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="!isSubmitting">Umów się na bezpłatną konsultację</span>
        <span v-else class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Wysyłanie...
        </span>
      </button>
    </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import FormSuccess from './FormSuccess.vue'
import * as CookieConsent from 'vanilla-cookieconsent'

const isSuccess = ref(false)

// dataLayer helper
const dl = (event, params = {}) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

// Śledzenie pierwszej interakcji z formularzem
const formStarted = ref(false)
const trackFieldFocus = (field) => {
  if (!formStarted.value) {
    formStarted.value = true
    dl('form_start', { form_name: 'consultation' })
  }
  dl('form_field_focus', { form_name: 'consultation', field })
}

// Form data
const form = reactive({
  name: '',
  phone: '',
  email: '',
  subject: '',
  curriculum: '',
  additionalInformation: '',
  terms: false,
  website: '' // Honeypot field - should remain empty
})

// Form state
const isSubmitting = ref(false)
const errors = reactive({})

// Validation rules
const validateField = (fieldName) => {
  delete errors[fieldName]
  
  switch (fieldName) {
    case 'name':
      if (!form.name.trim()) {
        errors.name = 'Imię jest wymagane'
      } else if (form.name.trim().length < 2) {
        errors.name = 'Imię musi mieć co najmniej 2 znaki'
      }
      break
      
    case 'phone':
      if (!form.phone.trim()) {
        errors.phone = 'Numer telefonu jest wymagany'
      } else if (!isValidPhone(form.phone)) {
        errors.phone = 'Wprowadź poprawny numer telefonu (np. 123456789 lub +48123456789)'
      }
      break
      
    case 'email':
      if (form.email && !isValidEmail(form.email)) {
        errors.email = 'Wprowadź poprawny adres email'
      }
      break

    case 'subject':
      if (!form.subject) {
        errors.subject = 'Wybierz przedmiot'
      }
      break

    case 'terms':
      if (!form.terms) {
        errors.terms = 'Musisz zaakceptować warunki'
      }
      break
  }

  if (errors[fieldName]) {
    dl('form_field_error', { form_name: 'consultation', field: fieldName })
  }
}

// Validation functions
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPhone = (phone) => {
  // Polish phone number validation (9 digits or +48 prefix)
  const phoneRegex = /^(\+48)?[1-9]\d{8}$/
  const cleanPhone = phone.replace(/\s/g, '')
  return phoneRegex.test(cleanPhone)
}

const hasAdditionalInformation = ref(false)

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwGgoScd7EzdBfKYbnXOITig5NdlKk6Lrnuzl7yIi03EwZvOOUAp7Qa6evw5wrACRg6zQ/exec'

// Helper functions for analytics
function generateLeadId() {
  return `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function getUTMParameters() {
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || ''
  }
}

function getGAClientId() {
  // Try to get GA client ID from dataLayer
  if (window.dataLayer) {
    try {
      const gaMatch = document.cookie.match(/_ga=(.+?);/)
      return gaMatch ? gaMatch[1] : ''
    } catch (e) {
      return ''
    }
  }
  return ''
}

function getGrowthbookVariant() {
  // Get current Growthbook experiment variant
  if (window.growthbook) {
    try {
      const attributes = window.growthbook.getAttributes()
      return attributes?.experiment_variant || ''
    } catch (e) {
      return ''
    }
  }
  return ''
}

function getCookieConsent() {
  // Check if user accepted cookies using vanilla-cookieconsent API
  try {
    // Use the official API to get user preferences
    const userPreferences = CookieConsent.getUserPreferences()

    if (userPreferences && userPreferences.acceptedCategories) {
      const categories = userPreferences.acceptedCategories
      // Filter out 'necessary' as it's always accepted
      const optionalCategories = categories.filter(c => c !== 'necessary')

      if (optionalCategories.length > 0) {
        return optionalCategories.join(',')
      }
      return 'necessary-only'
    }

    // Fallback: check localStorage manually
    const keys = Object.keys(localStorage)
    const ccKey = keys.find(key => key.includes('cc_cookie'))

    if (ccKey) {
      const ccData = localStorage.getItem(ccKey)
      if (ccData) {
        const consent = JSON.parse(ccData)
        if (consent.categories && Array.isArray(consent.categories)) {
          const optionalCats = consent.categories.filter(c => c !== 'necessary')
          return optionalCats.length > 0 ? optionalCats.join(',') : 'necessary-only'
        }
      }
    }

  } catch (e) {
    console.error('Error reading cookie consent:', e)
  }
  return 'none'
}

// Form submission
const handleSubmit = async () => {
  // Bot detection - if honeypot field is filled, it's a bot
  if (form.website) {
    console.log('Bot detected');
    return;
  }

  // Validate all required fields
  validateField('name')
  validateField('phone')
  validateField('email')
  validateField('subject')
  validateField('terms')

  // Check if there are any errors
  if (Object.keys(errors).length > 0) {
    return
  }

  isSubmitting.value = true

  try {
    // Collect all analytics data
    const leadId = generateLeadId()
    const utmParams = getUTMParameters()
    const gaClientId = getGAClientId()
    const growthbookVariant = getGrowthbookVariant()
    const cookieConsent = getCookieConsent()

    // Build source string (UTM or GA)
    let source = ''
    if (utmParams.utm_source) {
      source = `utm:${utmParams.utm_source}/${utmParams.utm_medium}/${utmParams.utm_campaign}`
    } else if (gaClientId) {
      source = `ga:${gaClientId}`
    } else {
      source = 'direct'
    }

    // Send data to Google Sheets using URLSearchParams
    const formData = new URLSearchParams({
      lead_id: leadId,
      created_at: new Date().toISOString(),
      name: form.name,
      phone: form.phone,
      email: form.email,
      subject: form.subject,
      level: form.curriculum,
      message: form.additionalInformation,
      source: source,
      experiment_variant: growthbookVariant,
      consent: cookieConsent,
      status: 'new',
      notes: '',
      // Include UTM params separately for better tracking
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      utm_term: utmParams.utm_term,
      utm_content: utmParams.utm_content
    })

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // This bypasses CORS for development
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    })

    // With no-cors mode, we can't read the response, but we assume success
    // if no error was thrown

    // Show success message
    isSuccess.value = true
    dl('generate_lead', { form_name: 'consultation', lead_type: 'free_consultation' })

    // Reset form
    Object.assign(form, {
      name: '',
      phone: '',
      email: '',
      subject: '',
      curriculum: '',
      additionalInformation: '',
      terms: false,
      website: ''
    })

  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss">
  select option[value=""][disabled] {
    display: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .expand-enter-active {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }
  .expand-leave-active {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }
  .expand-enter-from {
    max-height: 0;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
  }
  .expand-enter-to {
    max-height: 500px;
    opacity: 1;
    transform: scaleY(1);
  }
  .expand-leave-from {
    max-height: 500px;
    opacity: 1;
    transform: scaleY(1);
  }
  .expand-leave-to {
    max-height: 0;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
  }
</style>