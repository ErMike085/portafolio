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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
}

@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
</style>
