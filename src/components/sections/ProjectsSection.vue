<template>
    <section class="projects-section" id="projects">
        <div class="container">
            <h2 class="section-title" data-animate>Proyectos Destacados</h2>
            <div class="projects-grid">
                <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import ProjectCard from '../ui/ProjectCard.vue';
import { projectsData } from '@/data/projects';

const projects = ref(projectsData);
</script>

<style scoped>
.projects-section {
    background: var(--color-bg-primary);
}

.section-title {
    font-size: var(--section-title-size);
    margin-bottom: 3.25rem;
    text-shadow: var(--text-glow-soft);
}

.projects-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    gap: 2rem;
    width: 100%;
}

.projects-grid :deep(.project-card) {
    flex: 0 1 350px;
    width: min(100%, 350px);
}

@media (max-width: 768px) {
    .projects-grid {
        gap: 1.5rem;
    }

    .projects-grid :deep(.project-card) {
        flex-basis: 100%;
        max-width: 420px;
    }
}

@media (max-width: 480px) {
    .section-title {
        margin-bottom: 2rem;
    }
}
</style>
