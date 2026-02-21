<template>
    <section class="about-section" id="about">
        <div class="container">
            <h2 class="section-title" data-animate>Sobre Mí</h2>
            <div class="about-content">
                <div class="about-text" data-animate>
                    <p class="lead">{{ leadText }}</p>
                    <p>{{ description }}</p>
                    <div class="values">
                        <div v-for="value in values" :key="value.title" class="value-card glass">
                            <i :class="value.icon"></i>
                            <h4>{{ value.title }}</h4>
                            <p>{{ value.description }}</p>
                        </div>
                    </div>
                </div>
                <div class="about-image" data-animate>
                    <div class="image-wrapper">
                        <img src="/src/assets/logo.svg" alt="Tu Nombre" />
                        <div class="image-glow"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const leadText = ref('Transformando ideas en soluciones digitales robustas y elegantes.');
const description = ref('Soy un desarrollador fullstack con más de 4 años de experiencia creando aplicaciones web escalables y de alto rendimiento. Me especializo en el ecosistema Vue.js y Laravel, y me apasiona escribir código limpio y mantenible. Mi enfoque combina la creatividad del frontend con la solidez del backend para ofrecer experiencias de usuario excepcionales.');

const values = ref([
    { icon: 'fas fa-rocket', title: 'Innovación', description: 'Siempre busco las últimas tecnologías para ofrecer soluciones modernas.' },
    { icon: 'fas fa-code', title: 'Calidad', description: 'Código limpio, testeable y con buenas prácticas desde el inicio.' },
    { icon: 'fas fa-users', title: 'Colaboración', description: 'Trabajo en equipo y comunicación efectiva para entender las necesidades.' }
]);
</script>

<style scoped>
.about-section {
    background: var(--color-bg-secondary);
    position: relative;
    overflow: hidden;
}

.about-section::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(138, 43, 226, 0.05) 0%, transparent 70%);
    animation: rotateGradient 30s linear infinite;
}

.section-title {
    font-family: var(--font-display);
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.about-text .lead {
    font-size: 1.3rem;
    color: var(--color-accent-secondary);
    margin-bottom: 1.5rem;
    font-weight: 500;
}

.about-text p {
    color: var(--color-text-secondary);
    line-height: 1.8;
    margin-bottom: 2rem;
}

.values {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.value-card {
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s ease;
}

.value-card:hover {
    transform: translateY(-5px);
}

.value-card i {
    font-size: 2rem;
    color: var(--color-accent-primary);
    margin-bottom: 1rem;
}

.value-card h4 {
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
}

.value-card p {
    font-size: 0.9rem;
    color: var(--color-text-tertiary);
    margin-bottom: 0;
}

.about-image {
    display: flex;
    justify-content: center;
}

.image-wrapper {
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--color-accent-primary);
}

.image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 30%, rgba(138, 43, 226, 0.4), transparent 70%);
    pointer-events: none;
    animation: glowPulse 4s infinite;
}

@media (max-width: 768px) {
    .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .image-wrapper {
        width: 250px;
        height: 250px;
    }
}
</style>
