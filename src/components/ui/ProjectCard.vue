<template>
    <div class="project-card glass" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <div class="project-image">
            <img :src="project.image" :alt="project.title" />
            <div class="image-overlay" :class="{ 'hovered': isHovered }">
                <div class="project-links">
                    <a v-if="project.github" :href="project.github" target="_blank" rel="noopener">
                        <i class="devicon-github-original"></i>
                    </a>
                    <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="project-info">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-tech">
                <TechChip v-for="tech in project.technologies" :key="tech" :name="tech" :icon="tech.toLowerCase()" :interactive="false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TechChip from './TechChip.vue';

defineProps({
    project: {
        type: Object,
        required: true
    }
});

const isHovered = ref(false);
</script>

<style scoped>
.project-card {
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--glass-border-red);
    border-radius: var(--radius-md);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-glow);
}

.project-image {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
    transform: scale(1.1);
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--overlay-strong);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.image-overlay.hovered {
    opacity: 1;
}

.project-links {
    display: flex;
    gap: 1rem;
}

.project-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--color-accent-primary);
    border-radius: var(--radius-pill);
    color: white;
    font-size: 1.2rem;
    transition: transform 0.3s ease;
}

.project-links a:hover {
    transform: scale(1.1);
    background: var(--color-accent-secondary);
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
</style>
