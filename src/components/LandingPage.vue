<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-[20px] lg:gap-5">
          <!-- Left Content -->
          <div class="flex w-full flex-col fade-in lg:pr-[120px]">
            <!-- Logo -->
            <div class="mb-8 mt-12 lg:mt-16">
              <img 
                src="/logo.svg" 
                alt="Eduwave Logo" 
                class="max-w-[219px] h-auto"
              />
            </div>
            
            <!-- Main Headline -->
            <h1 class="text-4xl lg:text-5xl sm:text-[40px] xl:text-5xl font-bold text-black leading-tight mb-6 mt-16">
              Korepetycje, które otwierają drzwi do Twoich celów
            </h1>
            
            <!-- Subtitle -->
            <p class="text-lg lg:text-xl text-black leading-relaxed mb-12 max-w-2xl">
              Od 11 lat wspieramy uczniów i studentów w osiąganiu ambitnych celów. 
              Z Eduwave skutecznie przygotujesz się do egzaminów, poprawisz oceny i odkryjesz swój potencjał.
            </p>
            
            <!-- CTA Button -->
            <button 
              @click="scrollToForm"
              class="btn-primary text-base lg:text-lg px-6 py-3 mb-12 block w-full lg:hidden"
            >
              Umów się na bezpłatną konsultację
            </button>

            <div class="fade-in">
            <h2 class="text-[20px] lg:text-4xl font-bold text-black mb-8">
              Dlaczego Eduwave?
            </h2>
            
            <div class="space-y-4">
              <div 
                v-for="(benefit, index) in benefits" 
                :key="index"
                class="flex items-center space-x-4"
              >
                <div class="flex-shrink-0">
                  <img 
                    src="/check-circle.svg" 
                    alt="Check" 
                    class="h-6 w-6"
                  />
                </div>
                <p class="text-black text-sm lg:text-base  leading-relaxed">
                  {{ benefit }}
                </p>
              </div>
            </div>
          </div>
          </div>
          
          <!-- Right Content - Contact Form (Desktop) -->
          <div class="flex w-full mt-8 mb-8 lg:max-w-[400px] lg:mt-16">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ContactForm from './ContactForm.vue'

// Benefits data
const benefits = ref([
  "Ponad 1100 zadowolonych uczniów",
  "Skuteczny program przygotowania do egzaminów – IB, A-levels, Matura, olimpiady",
  "Doświadczenie pozauniwersyteckie – praktyka w przemyśle, działach R&D i projektach badawczych",
  "Wyniki, które mówią same za siebie – średni wynik matury rozszerzonej z chemii w 2025 roku: 79% (IB HL 62%, SL 64%)",
  "11 lat doświadczenia na rynku"
])

// Scroll to form function
const scrollToForm = () => {
  const formElement = document.querySelector('#contact-form')
  if (formElement) {
    formElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>
