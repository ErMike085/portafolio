<template>
    <section class="experience-section" id="experience">
        <div class="container">
            <h2 class="section-title" data-animate>Experiencia</h2>
            <div class="timeline" data-animate>
                <TimelineItem v-for="(exp, index) in experiences" :key="exp.id" :experience="exp" :position="index % 2 === 0 ? 'left' : 'right'" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import TimelineItem from '../ui/TimelineItem.vue';
import { experienceData } from '@/data/experience';

const experiences = ref(experienceData);
</script>

<style scoped>
.experience-section {
    background: var(--color-bg-secondary);
    position: relative;
    overflow: hidden;
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

.timeline {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
}

.timeline::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: var(--gradient-primary);
    opacity: 0.3;
}

@media (max-width: 768px) {
    .timeline::before {
        left: 20px;
    }
}
</style>