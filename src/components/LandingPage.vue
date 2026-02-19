<template>
  <div class="min-h-screen bg-white bg-image">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="max-w-[1280px] mt-4 sm:mt-12 md:mt-16 lg:mt-18 mx-auto px-4 sm:px-6 lg:px-6 mb-8">
        <div class="flex flex-col md:flex-row gap-9 lg:gap-4">
          <!-- Left Content -->
          <div class="flex w-full flex-col fade-in lg:pr-[60px]">
            <!-- Logo -->
            <img 
                src="/logo.svg" 
                alt="Eduwave - szkoła korepetycji" 
                class="max-w-[175px] md:max-w-[219px] h-auto"
              />
            
            <!-- Main Headline -->
            <h1 class="heading mt-20 mb-8 md:mb-4">
              Korepetycje, które otwierają drzwi <span class="heading-line">do&nbsp;Twoich&nbsp;celów</span>
            </h1>
            
            <!-- Subtitle -->
            <p class="text mb-9 max-w-[740px]">
              Od 11 lat wspieramy uczniów i&nbsp;studentów w&nbsp;osiąganiu ambitnych celów.<br>
              Z Eduwave skutecznie przygotujesz się do egzaminów, poprawisz oceny i&nbsp;odkryjesz swój potencjał.
            </p>
            
            <!-- CTA Button -->
            <button 
              @click="scrollToForm"
              class="btn-primary text-base lg:text-lg px-6 py-3 mb-12 block w-full sm:hidden"
            >
              Umów się na bezpłatną konsultację
            </button>

            <div class="fade-in">
            <h2 class="subheading">
              Dlaczego Eduwave?
            </h2>
            
            <div class="space-y-4">
              <div 
                v-for="(benefit, index) in benefits" 
                :key="index"
                class="flex items-center mt-4 space-x-4"
              >
                <div class="flex-shrink-0">
                  <img 
                    src="/check-circle.svg" 
                    alt="Check" 
                    class="h-6 w-6"
                  />
                </div>
                <p class="text-small" v-html="benefit"></p>
              </div>
            </div>
          </div>

          <!-- Footer Desktop -->
          <footer class="hidden items-center gap-8 align-bottom mt-4 md:flex">
            <p class="text-[13px]">
              <span class="text-neutral-darker">
                &copy; {{ new Date().getFullYear() }} Eduwave. Wszelkie prawa zastrzeżone.
              </span>
            </p>

            <a href="/polityka-prywatnosci" class="text-neutral-darker text-[13px] visited:text-neutral-darker hover:text-black">Polityka prywatności</a>
          </footer>
        </div>
          
          <!-- Right Content - Contact Form (Desktop) -->
          <div class="flex w-full flex-col md:max-w-[360px] lg:max-w-[400px]">
            <ContactForm />

            <!-- Footer Mobile -->
            <footer class="flex align-bottom  justify-center mt-9 md:hidden">
              <p class="flex flex-col items-center justify-center gap-2 text-neutral-darker">
                <span class="text-[13px] antialiased">
                  &copy; {{ new Date().getFullYear() }} Eduwave. Wszelkie prawa zastrzeżone.
                </span>

                <a href="/polityka-prywatnosci" class="text-[13px] antialiased hover:text-black">Polityka prywatności</a>
              </p>
            </footer>
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
  "<b>Ponad 1100</b> zadowolonych uczniów",
  "Skuteczny program przygotowania do egzaminów – IB, A-levels, Matura, olimpiady",
  "Doświadczenie pozauniwersyteckie – praktyka w przemyśle, działach R&D i projektach badawczych",
  "Wyniki, które mówią same za siebie – średni wynik matury rozszerzonej z chemii w 2025 roku: <b>79%</b> (IB HL 62%, SL 64%)",
  "<b>11 lat</b> doświadczenia na rynku"
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

<style lang="scss">
.heading-line {
  position: relative;

  &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 2px;
      width: 447.5px;
      height: 20px;
      background-image: url('/line.svg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      z-index: -1;
    }

    @media (max-width: 1024px) {
      &::after {
        width: 295px;
        bottom: 0px;
        height: 15px;
      }
    }
}
</style>