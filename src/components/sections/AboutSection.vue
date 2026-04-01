<template>
    <section class="about-section" id="about">
        <div class="container">
            <h2 class="section-title" data-animate>Sobre Mi</h2>
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
                        <img class="profile-image" :src="profileImage" alt="Foto de perfil de Miguel" />
                        <div class="image-glow"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import profileImage from '@/assets/images/foto-perfil.jpeg';

const leadText = ref('Transformando ideas en soluciones digitales robustas y elegantes.');
const description = ref('Soy un desarrollador fullstack con mas de 4 anos de experiencia creando aplicaciones web escalables y de alto rendimiento. Me especializo en el ecosistema Vue.js y Laravel, y me apasiona escribir codigo limpio y mantenible. Mi enfoque combina la creatividad del frontend con la solidez del backend para ofrecer experiencias de usuario excepcionales y confiables.');

const values = ref([
    { icon: 'fas fa-rocket', title: 'Innovacion', description: 'Siempre uso tecnologias robustas y actualizadas para ofrecer soluciones efectivas.' },
    { icon: 'fas fa-code', title: 'Calidad', description: 'Codigo limpio, testeable y con buenas practicas desde el inicio.' },
    { icon: 'fas fa-users', title: 'Colaboracion', description: 'Trabajo en equipo y comunicacion efectiva para entender las necesidades.' },
    { icon: 'fas fa-lock', title: 'Seguridad', description: 'Implemento medidas de seguridad robustas para proteger los datos de los usuarios.' }
]);
</script>

<style scoped>
.about-section {
    background: var(--color-bg-secondary);
    position: relative;
    overflow: hidden;
}

.section-title {
    font-size: var(--section-title-size);
    margin-bottom: 3.25rem;
    text-shadow: var(--text-glow-soft);
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
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
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
    width: 320px;
    height: 380px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--glass-border);
    background: linear-gradient(135deg, rgba(var(--glow-violet-rgb), 0.1), rgba(var(--glow-red-rgb), 0.04));
    box-shadow: var(--shadow-md);
    transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
}

.profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 20%;
    filter: saturate(1.02) contrast(1.04);
    transition: transform 0.45s ease;
}

.image-wrapper:hover {
    transform: translateY(-2px);
    border-color: rgba(181, 205, 255, 0.48);
    box-shadow: var(--shadow-glow-md);
}

.image-wrapper:hover .profile-image {
    transform: scale(1.06);
}

.image-wrapper::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        radial-gradient(circle at 50% 35%, transparent 42%, rgba(7, 9, 18, 0.18) 72%, rgba(7, 9, 18, 0.48) 100%),
        linear-gradient(to bottom, rgba(7, 9, 18, 0.04), rgba(7, 9, 18, 0.34));
    mix-blend-mode: multiply;
}

.image-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 30%, rgba(var(--glow-violet-rgb), 0.12) 0%, transparent 65%);
    pointer-events: none;
    animation: glowPulse 6s infinite;
    mix-blend-mode: screen;
    z-index: 2;
}

@media (max-width: 768px) {
    .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .image-wrapper {
        width: 250px;
        height: 300px;
    }
}

@media (max-width: 480px) {
    .about-content {
        gap: 1.5rem;
    }

    .values {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .image-wrapper {
        width: min(100%, 250px);
        height: 280px;
    }
}
</style>
