<template>
    <div class="project-card glass" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <div class="project-image" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
            <button
                type="button"
                class="image-trigger"
                :aria-label="`Abrir imagen de ${project.title}`"
                @click="openModal"
            >
                <img :src="activeImage.src" :alt="project.title" :style="imageStyle" />
            </button>
            <div v-if="hasMultipleImages" class="carousel-controls">
                <button type="button" class="carousel-button prev" aria-label="Imagen anterior" @click="prevSlide"></button>
                <button type="button" class="carousel-button next" aria-label="Imagen siguiente" @click="nextSlide"></button>
            </div>
            <div v-if="hasMultipleImages" class="carousel-dots" aria-hidden="true">
                <button
                    v-for="(image, index) in images"
                    :key="image.src + index"
                    type="button"
                    class="carousel-dot"
                    :class="{ active: index === currentSlide }"
                    @click="goToSlide(index)"
                ></button>
            </div>
            <div class="project-image-title">{{ project.title }}</div>
            <div class="image-overlay" :class="{ hovered: isHovered }">
                <div class="project-actions">
                    <div v-if="hasLinks" class="project-links">
                        <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="project-action" aria-label="GitHub">
                            <i class="devicon-github-original"></i>
                            <span>GitHub</span>
                        </a>
                        <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="project-action" aria-label="Visitar demo">
                            <i class="fas fa-external-link-alt"></i>
                            <span>Visitar</span>
                        </a>
                    </div>
                    <div v-else class="project-links-placeholder">Proyecto empresarial privado</div>
                    <button type="button" class="project-action project-action--primary" @click="openModal">
                        <i class="fas fa-expand-alt"></i>
                        <span>Abrir</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="project-info">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-tech">
                <TechChip
                    v-for="tech in project.technologies"
                    :key="tech"
                    :name="tech"
                    :icon="tech"
                    :interactive="false"
                />
            </div>
        </div>
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="isModalOpen" class="project-modal" @click.self="closeModal">
                    <div class="modal-chrome">
                        <button type="button" class="modal-close" aria-label="Cerrar imagen" @click="closeModal">
                            <span />
                        </button>
                        <button
                            v-if="hasMultipleImages"
                            type="button"
                            class="modal-nav prev"
                            aria-label="Imagen anterior"
                            @click="prevSlide"
                        ></button>
                        <div class="modal-frame">
                            <div class="modal-image-shell">
                                <img :src="activeImage.src" :alt="project.title" class="modal-image" />
                            </div>
                        </div>
                        <button
                            v-if="hasMultipleImages"
                            type="button"
                            class="modal-nav next"
                            aria-label="Imagen siguiente"
                            @click="nextSlide"
                        ></button>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue';
import TechChip from './TechChip.vue';

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const isHovered = ref(false);
const currentSlide = ref(0);
const isModalOpen = ref(false);
let autoplayId = null;

const images = computed(() =>
  (props.project.images?.length ? props.project.images : [props.project.image]).map((image) =>
    typeof image === 'string'
      ? { src: image, zoom: 1, position: '50% 50%' }
      : {
          src: image.src,
          zoom: Number.isFinite(Number(image.zoom)) ? Number(image.zoom) : 1,
          position: image.position || '50% 50%',
        },
  ),
);
const hasMultipleImages = computed(() => images.value.length > 1);
const hasLinks = computed(() => Boolean(props.project.github || props.project.demo));
const activeImage = computed(() => images.value[currentSlide.value] || { src: props.project.image, zoom: 1, position: '50% 50%' });
const imageStyle = computed(() => ({
  '--image-scale': activeImage.value.zoom,
  '--image-hover-scale': Math.min(activeImage.value.zoom + 0.04, 1.42),
  objectPosition: activeImage.value.position,
}));

const goToSlide = (index) => {
  currentSlide.value = index;
};

const openModal = () => {
  isModalOpen.value = true;
  stopAutoplay();
};

const closeModal = () => {
  isModalOpen.value = false;
  resumeAutoplay();
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % images.value.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + images.value.length) % images.value.length;
};

const startAutoplay = () => {
  if (!hasMultipleImages.value || autoplayId || isModalOpen.value) {
    return;
  }

  autoplayId = window.setInterval(nextSlide, 4500);
};

const stopAutoplay = () => {
  if (autoplayId) {
    window.clearInterval(autoplayId);
    autoplayId = null;
  }
};

const pauseAutoplay = () => stopAutoplay();
const resumeAutoplay = () => {
  if (!isModalOpen.value) {
    startAutoplay();
  }
};

const handleKeydown = (event) => {
  if (!isModalOpen.value) {
    return;
  }

  if (event.key === 'Escape') {
    closeModal();
  }

  if (event.key === 'ArrowLeft' && hasMultipleImages.value) {
    prevSlide();
  }

  if (event.key === 'ArrowRight' && hasMultipleImages.value) {
    nextSlide();
  }
};

watch(isModalOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

startAutoplay();

onBeforeUnmount(() => {
  stopAutoplay();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.project-card {
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--glass-border);
    background: linear-gradient(180deg, rgba(24, 37, 68, 0.72), rgba(11, 17, 35, 0.88));
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: var(--shadow-md);
    border-radius: var(--radius-md);
    background-origin: border-box;
    position: relative;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-glow-md);
    border-color: rgba(207, 224, 255, 0.36);
}

.project-image {
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
}

.image-trigger {
    all: unset;
    display: block;
    width: 100%;
    height: 100%;
    cursor: zoom-in;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(var(--image-scale, 1));
    transition: transform 0.55s ease;
}

.project-card:hover .project-image img {
    transform: scale(var(--image-hover-scale, 1.04));
}

.project-modal {
    position: fixed;
    inset: 0;
    z-index: 80;
    background: rgba(3, 6, 14, 0.9);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    display: grid;
    place-items: center;
    padding: 2rem;
}

.modal-chrome {
    position: relative;
    width: min(82vw, 1200px);
    height: min(82vh, 820px);
}

.modal-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 1.25rem;
    border-radius: 24px;
    background: linear-gradient(180deg, rgba(20, 28, 48, 0.94), rgba(8, 12, 24, 0.96));
    border: 1px solid rgba(206, 224, 255, 0.14);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.52);
    overflow: hidden;
    z-index: 1;
}

.modal-image-shell {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
    background: rgba(6, 10, 20, 0.55);
}

.modal-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: transparent;
}

.modal-close {
    position: absolute;
    top: -18px;
    right: -18px;
    width: 46px;
    height: 46px;
    border-radius: 999px;
    border: 1px solid rgba(206, 224, 255, 0.2);
    background: rgba(8, 12, 24, 0.86);
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
    z-index: 2;
}

.modal-close:hover {
    transform: scale(1.05);
    background: rgba(14, 22, 44, 0.95);
    border-color: rgba(207, 224, 255, 0.45);
}

.modal-close span {
    position: relative;
    width: 16px;
    height: 16px;
}

.modal-close span::before,
.modal-close span::after {
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    width: 16px;
    height: 2px;
    border-radius: 999px;
    background: var(--color-text-primary);
}

.modal-close span::before {
    transform: rotate(45deg);
}

.modal-close span::after {
    transform: rotate(-45deg);
}

.modal-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 52px;
    height: 52px;
    border-radius: 999px;
    border: 1px solid rgba(206, 224, 255, 0.2);
    background: rgba(8, 12, 24, 0.78);
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
    z-index: 8;
}

.modal-nav:hover {
    transform: translateY(-50%) scale(1.05);
    background: rgba(14, 22, 44, 0.95);
    border-color: rgba(207, 224, 255, 0.45);
}

.modal-nav.prev {
    left: -76px;
}

.modal-nav.next {
    right: -76px;
}

.modal-nav::before {
    content: '';
    width: 12px;
    height: 12px;
    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;
    color: var(--color-text-primary);
    display: block;
}

.modal-nav.prev::before {
    transform: rotate(-135deg);
    margin-left: 3px;
}

.modal-nav.next::before {
    transform: rotate(45deg);
    margin-right: 3px;
}

.carousel-controls {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.7rem;
    pointer-events: none;
    z-index: 3;
}

.carousel-button {
    pointer-events: auto;
    width: 34px;
    height: 34px;
    border: 1px solid rgba(206, 224, 255, 0.25);
    border-radius: 999px;
    background: rgba(8, 12, 24, 0.65);
    color: var(--color-text-primary);
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.carousel-button::before {
    content: '';
    width: 9px;
    height: 9px;
    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;
    display: block;
}

.carousel-button.prev::before {
    transform: rotate(-135deg);
    margin-left: 3px;
}

.carousel-button.next::before {
    transform: rotate(45deg);
    margin-right: 3px;
}

.carousel-button:hover {
    transform: scale(1.08);
    background: rgba(11, 17, 35, 0.9);
    border-color: rgba(207, 224, 255, 0.45);
}

.carousel-dots {
    position: absolute;
    left: 50%;
    bottom: 0.85rem;
    transform: translateX(-50%);
    display: flex;
    gap: 0.45rem;
    z-index: 3;
}

.carousel-dot {
    width: 8px;
    height: 8px;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.32);
    cursor: pointer;
    transition: width 0.2s ease, background 0.2s ease;
}

.carousel-dot.active {
    width: 24px;
    background: var(--gradient-primary);
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(12, 10, 26, 0.42), rgba(12, 10, 26, 0.58));
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.25s ease;
    z-index: 2;
}

.image-overlay.hovered {
    opacity: 1;
}

.project-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
    padding: 1rem;
    width: min(100%, 260px);
}

.project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    width: 100%;
}

.project-links-placeholder {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 999px;
    background: rgba(14, 22, 44, 0.82);
    border: 1px solid rgba(206, 224, 255, 0.2);
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    text-align: center;
}

.project-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 108px;
    padding: 0.75rem 1rem;
    border-radius: 999px;
    background: rgba(14, 22, 44, 0.88);
    border: 1px solid rgba(206, 224, 255, 0.28);
    color: var(--color-text-primary);
    font-size: 0.92rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
}

.project-action i {
    font-size: 0.95rem;
}

.project-action:hover {
    transform: translateY(-1px);
    border-color: rgba(207, 224, 255, 0.5);
    background: rgba(18, 28, 54, 0.96);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.24);
}

.project-action--primary {
    width: 100%;
    background: linear-gradient(135deg, rgba(138, 92, 255, 0.22), rgba(34, 211, 238, 0.16));
    border-color: rgba(138, 92, 255, 0.34);
}

.project-action--primary:hover {
    background: linear-gradient(135deg, rgba(138, 92, 255, 0.3), rgba(34, 211, 238, 0.22));
    border-color: rgba(138, 92, 255, 0.52);
}

.project-info {
    padding: 1.5rem;
}

.project-info h3 {
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
}

.project-info p {
    color: var(--color-text-secondary);
    margin-bottom: 1rem;
    line-height: 1.6;
    font-size: 0.95rem;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.project-image-title {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    color: white;
    font-weight: 700;
    text-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
    background: linear-gradient(90deg, rgba(11, 17, 35, 0.75), rgba(34, 211, 238, 0.2));
    padding: 0.35rem 0.6rem;
    border-radius: 8px;
    font-size: 1rem;
    z-index: 4;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.18s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

@media (max-width: 1024px) {
    .modal-chrome {
        width: min(90vw, 1000px);
        height: min(78vh, 760px);
    }

    .modal-frame {
        padding: 1rem;
    }

    .modal-nav.prev {
        left: -60px;
    }

    .modal-nav.next {
        right: -60px;
    }

    .modal-close {
        top: -16px;
        right: -16px;
    }
}

@media (max-width: 768px) {
    .project-card {
        width: 100%;
        max-width: 420px;
    }

    .project-image {
        height: 200px;
    }

    .project-actions {
        width: min(100%, 220px);
        gap: 0.7rem;
        padding: 0.85rem;
    }

    .project-action {
        min-width: 96px;
        padding: 0.7rem 0.9rem;
        font-size: 0.88rem;
    }

    .modal-frame {
        padding: 0.75rem;
        border-radius: 20px;
    }

    .modal-image-shell {
        border-radius: 16px;
    }

    .modal-nav {
        width: 44px;
        height: 44px;
    }

    .modal-nav.prev {
        left: 0.5rem;
    }

    .modal-nav.next {
        right: 0.5rem;
    }

    .modal-close {
        top: -16px;
        right: -16px;
    }
}

@media (max-width: 480px) {
    .project-info {
        padding: 1.1rem;
    }

    .project-image-title {
        left: 0.75rem;
        bottom: 0.75rem;
        font-size: 0.92rem;
    }

    .project-modal {
        padding: 0.75rem;
    }

    .modal-chrome {
        width: 96vw;
        height: 72vh;
    }

    .modal-frame {
        padding: 0.6rem;
        border-radius: 18px;
    }

    .modal-close {
        width: 40px;
        height: 40px;
        top: -14px;
        right: -14px;
    }

    .modal-nav {
        width: 40px;
        height: 40px;
        background: rgba(8, 12, 24, 0.92);
        border-color: rgba(206, 224, 255, 0.34);
    }

    .modal-nav.prev {
        left: 0.35rem;
    }

    .modal-nav.next {
        right: 0.35rem;
    }

    .modal-image-shell {
        border-radius: 14px;
    }
}
</style>
