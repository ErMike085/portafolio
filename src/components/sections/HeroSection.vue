<template>
    <section class="hero-section" id="home">
        <div class="container">
            <div class="hero-content">
                <div class="hero-badge" data-animate>
                    <span class="badge-text">Disponible para trabajar</span>
                </div>

                <h1 class="hero-title" data-animate>
                    <GlowingText text="MIGUEL MUÑOZ" />
                </h1>

                <div class="hero-subtitle" data-animate>
                    <span class="typed-text">{{ typedText }}</span>
                    <span class="cursor" :class="{ typing: isTyping }">&nbsp;</span>
                </div>

                <p class="hero-description" data-animate>
                    Arquitecto de experiencias digitales completas.
                    Construyendo puentes entre frontend, backend y el usuario final.
                </p>

                <div class="hero-cta" data-animate>
                    <GradientButton variant="primary" @click="scrollToProjects">
                        Ver Proyectos
                    </GradientButton>
                    <GradientButton variant="secondary" @click="scrollToContact">
                        Contactarme
                    </GradientButton>
                </div>

                <div class="hero-stats" data-animate>
                    <div class="stat-item">
                        <span class="stat-number">4+</span>
                        <span class="stat-label">Años de experiencia</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">15+</span>
                        <span class="stat-label">Proyectos</span>
                    </div>
                </div>
            </div>

            <div class="hero-scroll-indicator" @click="scrollToNext">
                <!-- <span>Scroll</span> -->
                <div class="scroll-line"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import GlowingText from '../ui/GlowingText.vue';
import GradientButton from '../ui/GradientButton.vue';

const typedText = ref('');
const isTyping = ref(true);

const texts = [
    'Desarrollador Web Fullstack',
    'Especialista en Vue.js y Laravel',
    'Aficionado por los retos',
    'Orquestador de soluciones'
];

let currentIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let timeoutId = null;

const typeEffect = () => {
    const currentText = texts[currentIndex];

    if (isDeleting) {
        typedText.value = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typedText.value = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    if (!isDeleting && currentCharIndex === currentText.length) {
        isDeleting = true;
        timeoutId = setTimeout(typeEffect, 2000);
        return;
    }

    if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    timeoutId = setTimeout(typeEffect, typingSpeed);
};

const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
    typeEffect();
});

onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId);
});
</script>

<style scoped>
.hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, var(--glow-violet) 0%, transparent 50%);
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 2;
}

.hero-badge {
    margin-bottom: 2rem;
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
}

.badge-text {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-pill);
    font-size: 0.9rem;
    color: var(--color-accent-secondary);
    letter-spacing: 1px;
}

.hero-title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-family: var(--font-display);
    margin-bottom: 1rem;
    opacity: 0;
    animation: fadeInUp 0.6s ease 0.2s forwards;
}

.hero-subtitle {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: 1.5rem;
    min-height: 4rem;
    color: var(--color-accent-red-soft);
    text-shadow: var(--text-glow-soft);
    opacity: 0;
    animation: fadeInUp 0.6s ease 0.4s forwards;
}

.cursor {
    display: inline-block;
    width: 3px;
    height: 1.2em;
    background-color: var(--color-accent-primary);
    margin-left: 4px;
    animation: blink 1s infinite;
}

.cursor.typing {
    animation: none;
}

@keyframes blink {

    0%,
    50% {
        opacity: 1;
    }

    51%,
    100% {
        opacity: 0;
    }
}

.hero-description {
    font-size: 1.2rem;
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto 2rem;
    opacity: 0;
    animation: fadeInUp 0.6s ease 0.6s forwards;
}

.hero-cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 3rem;
    opacity: 0;
    animation: fadeInUp 0.6s ease 0.8s forwards;
}

.hero-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    opacity: 0;
    animation: fadeInUp 0.6s ease 1s forwards;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: var(--color-accent-primary);
    font-family: var(--font-display);
}

.stat-label {
    font-size: 0.9rem;
    color: var(--color-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.hero-scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
}

.hero-scroll-indicator:hover {
    opacity: 1;
}

.hero-scroll-indicator span {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--color-text-tertiary);
}

.scroll-line {
    width: 2px;
    height: 40px;
    background: linear-gradient(to bottom, var(--color-accent-primary), transparent);
    animation: scrollDown 2s infinite;
}

@keyframes scrollDown {
    0% {
        transform: scaleY(0);
        transform-origin: top;
    }

    50% {
        transform: scaleY(1);
        transform-origin: top;
    }

    50.1% {
        transform: scaleY(1);
        transform-origin: bottom;
    }

    100% {
        transform: scaleY(0);
        transform-origin: bottom;
    }
}

@media (max-width: 768px) {
    .hero-cta {
        flex-direction: column;
        align-items: center;
    }

    .hero-stats {
        gap: 1.5rem;
        flex-wrap: wrap;
    }

    .stat-number {
        font-size: 1.5rem;
    }
}
</style>

