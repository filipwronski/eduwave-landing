<template>
    <div class="success-container">
        <h2 class="flex justify-center text-2xl font-bold text-white mb-3">Dziękujemy!</h2>
        
        <p class="text-center font-medium text-[18px] line-height-150% text-white">Wkrótce odezwiemy się do Ciebie, aby umówić konsultację.</p>

        <div>
            <button
                type="submit"
                class="w-fit btn-primary disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                @click="sendAnotherRequest"
            >
                    Wyślij kolejne zgłoszenie
            </button>
        </div>
        
    </div>
</template>

<script setup>
const emit = defineEmits(['sendAnotherRequest'])

const sendAnotherRequest = () => {
    emit('sendAnotherRequest')
}
</script>

<style lang="scss">
  .success-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
