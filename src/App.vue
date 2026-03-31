<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, watchEffect } from 'vue'
import { useMouseGlow } from './composables/useMouseGlow'

const { mousePosition, glowIntensity } = useMouseGlow()

onMounted(() => {
  watchEffect(() => {
    document.documentElement.style.setProperty('--mouse-x', `${mousePosition.value.x}px`)
    document.documentElement.style.setProperty('--mouse-y', `${mousePosition.value.y}px`)
    document.documentElement.style.setProperty('--glow-intensity', `${glowIntensity.value}`)
  })
})
</script>
