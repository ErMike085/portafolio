import { ref, onMounted, onUnmounted } from 'vue'

export function useMouseGlow() {
  const mousePosition = ref({ x: 0, y: 0 })
  const glowIntensity = ref(0)

  const handleMouseMove = (e) => {
    mousePosition.value = {
      x: e.clientX,
      y: e.clientY,
    }

    // Calcular intensidad basada en cercanía al centro
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))
    const maxDistance = Math.sqrt(
      Math.pow(window.innerWidth / 2, 2) + Math.pow(window.innerHeight / 2, 2),
    )
    glowIntensity.value = 1 - distance / maxDistance
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })

  return {
    mousePosition,
    glowIntensity,
  }
}
