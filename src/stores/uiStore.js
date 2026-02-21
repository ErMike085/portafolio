// src/stores/uiStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // Estado
  const isMenuOpen = ref(false)
  const isDarkMode = ref(true) // Siempre true en nuestro diseño
  const currentSection = ref('home')
  const scrollY = ref(0)
  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

  // Getters
  const isMobile = computed(() => windowWidth.value < 768)
  const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1024)
  const isDesktop = computed(() => windowWidth.value >= 1024)

  // Actions
  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }

  function closeMenu() {
    isMenuOpen.value = false
  }

  function setCurrentSection(section) {
    currentSection.value = section
  }

  function updateScrollY() {
    scrollY.value = window.scrollY
  }

  function updateWindowWidth() {
    windowWidth.value = window.innerWidth
  }

  // Inicializar listeners (llamar desde App.vue)
  function init() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', updateScrollY)
      window.addEventListener('resize', updateWindowWidth)
      updateWindowWidth()
    }
  }

  function cleanup() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', updateScrollY)
      window.removeEventListener('resize', updateWindowWidth)
    }
  }

  return {
    // state
    isMenuOpen,
    isDarkMode,
    currentSection,
    scrollY,
    windowWidth,
    // getters
    isMobile,
    isTablet,
    isDesktop,
    // actions
    toggleMenu,
    closeMenu,
    setCurrentSection,
    init,
    cleanup,
  }
})
