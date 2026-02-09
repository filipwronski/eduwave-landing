<template>
  <div id="contact-form" class="bg-[#671E75] w-full rounded-2xl py-8 px-6 shadow-lg">
    <h3 class="text-2xl lg:text-2xl font-bold text-white">
      Umów się na konsultację
    </h3>

    <Transition name="fade" mode="out-in">
      <FormSuccess
        v-if="isSuccess"
        @sendAnotherRequest="isSuccess = false"
      />

      <form v-else
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
          class="form-input shadow-none focus:border-error-color focus:ring-0 focus:ring-offset-0"
          :class="{ 'border-error-color': errors.name }"
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
          class="form-input shadow-none focus:border-error-color focus:ring-0 focus:ring-offset-0"
          :class="{ 'border-error-color': errors.phone }"
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
          class="form-input shadow-none focus:border-error-color focus:ring-0 focus:ring-offset-0"
          :class="{ 'border-error-color': errors.email }"
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
          class="form-input shadow-none focus:border-error-color focus:ring-0 focus:ring-offset-0"
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
      </div>
      
      <!-- Curriculum Field -->
      <div class="mb-4">
        <label for="curriculum" class="form-label">
          Program nauczania (nieobowiązkowo)
        </label>
        <select
          id="curriculum"
          v-model="form.curriculum"
          class="form-input shadow-none focus:border-error-color focus:ring-0 focus:ring-offset-0"
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
              class="form-input shadow-none focus:border-error-color focus:ring-0 focus:ring-offset-0"
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
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import FormSuccess from './FormSuccess.vue'

const isSuccess = ref(false)

// Form data
const form = reactive({
  name: '',
  phone: '',
  email: '',
  subject: '',
  curriculum: '',
  additionalInformation: '',
  terms: false
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
      
    case 'terms':
      if (!form.terms) {
        errors.terms = 'Musisz zaakceptować warunki'
      }
      break
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

// Form submission
const handleSubmit = async () => {
  // Validate all required fields
  validateField('name')
  validateField('phone')
  validateField('email')
  validateField('terms')
  
  // Check if there are any errors
  if (Object.keys(errors).length > 0) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Log form data (as requested)
    console.log('Form submitted with data:', {
      name: form.name,
      phone: form.phone,
      email: form.email,
      subject: form.subject,
      curriculum: form.curriculum,
      additionalInformation: form.additionalInformation,
      terms: form.terms,
      timestamp: new Date().toISOString()
    })
    
    // Show success message (you can replace this with actual success handling)
    isSuccess.value = true
    
    // Reset form
    Object.assign(form, {
      name: '',
      phone: '',
      email: '',
      subject: '',
      curriculum: '',
      additionalInformation: '',
      terms: false
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