<template>
  <div id="app" class="min-h-screen bg-white">
    <LandingPage v-if="!isV2" />
    <LandingPage2 v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LandingPage from './components/LandingPage.vue'
import LandingPage2 from './components/LandingPage2.vue'

// Check if v2 parameter is present in URL
const isV2 = ref(false)

const checkV2Parameter = () => {
  const urlParams = new URLSearchParams(window.location.search)
  isV2.value = urlParams.has('v2')
}

onMounted(() => {
  checkV2Parameter()
})
</script>
