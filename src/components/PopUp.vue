<template>
  <div class="popup-overlay" v-if="visible">
    <div class="popup-box">
      <slot name="title">
      </slot>
      <slot />
      <button @click="closePopup">Close</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean,
})

const emit = defineEmits(['close'])

function closePopup() {
  emit('close')
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-box {
  background-color: rgba(255, 255, 255, 0.75);
  color: black;
  padding: 2rem 3rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.popup-box button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border: none;
  background-color: #df2828;
  border: 2px solid white;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
</style>
