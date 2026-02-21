import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  const sections = ref([])

  const initScrollAnimations = () => {
    // Animación para secciones al hacer scroll
    sections.value = document.querySelectorAll('[data-animate]')

    sections.value.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      })
    })

    // Animación para timeline
    gsap.from('.timeline-item', {
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: -50,
      stagger: 0.3,
      duration: 0.8,
    })

    // Animación para skills
    gsap.from('.skill-category', {
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 80%',
        end: 'bottom 20%',
      },
      opacity: 0,
      scale: 0.9,
      stagger: 0.2,
      duration: 0.6,
    })
  }

  const cleanup = () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }

  onMounted(() => {
    initScrollAnimations()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    initScrollAnimations,
  }
}
