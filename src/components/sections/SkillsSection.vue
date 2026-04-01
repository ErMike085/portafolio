<template>
    <section class="skills-section" id="skills">
        <div class="container">
            <h2 class="section-title" data-animate>Stack Tecnologico</h2>
            <div class="skills-categories">
                <div v-for="([name, category]) in skillCategories" :key="name" class="skill-category glass">
                    <h3>{{ categoryTitle(name) }}</h3>
                    <div class="skills-list">
                        <div v-for="skill in category" :key="skill.name" class="skill-item">
                            <div class="skill-info">
                                <img v-if="resolvedSkillIcon(skill)?.type === 'asset'" :src="resolvedSkillIcon(skill).value" :alt="skill.name" class="skill-icon-image" />
                                <i v-else-if="resolvedSkillIcon(skill)?.type === 'class'" :class="resolvedSkillIcon(skill).value"></i>
                                <span>{{ skill.name }}</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" :style="{ width: skill.level + '%', backgroundColor: skill.color }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { skillsData } from '@/data/skills';
import { resolveTechIcon } from '@/utils/techIcons';

const skillCategories = computed(() => Object.entries(skillsData));

const categoryTitle = (key) => {
    const titles = {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Bases de Datos',
        tools: 'Herramientas'
    };
    return titles[key] || key;
};

const resolvedSkillIcon = (skill) => resolveTechIcon(skill.icon || skill.name);
</script>

<style scoped>
.skills-section {
    background: var(--color-bg-secondary);
}

.section-title {
    font-size: var(--section-title-size);
    margin-bottom: 3.25rem;
    text-shadow: var(--text-glow-soft);
}

.skills-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.skill-category {
    padding: 1.5rem;
    transition: transform 0.3s ease;
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
}

.skill-category:hover {
    transform: translateY(-5px);
}

.skill-category h3 {
    color: var(--color-accent-secondary);
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    border-bottom: 2px solid var(--color-accent-primary);
    padding-bottom: 0.5rem;
}

.skills-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.skill-item {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.skill-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text-secondary);
}

.skill-info i {
    font-size: 1.2rem;
    color: var(--color-accent-primary);
}

.skill-icon-image {
    width: 1.2rem;
    height: 1.2rem;
    object-fit: contain;
}

.skill-bar {
    width: 100%;
    height: 6px;
    background: var(--color-bg-tertiary);
    border-radius: 3px;
    overflow: hidden;
}

.skill-progress {
    height: 100%;
    transition: width 1s ease;
}
</style>
