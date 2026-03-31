<template>
    <div class="timeline-item" :class="position">
        <div class="timeline-content glass">
            <span class="timeline-date">{{ experience.period }}</span>
            <h3>{{ experience.position }}</h3>
            <h4>{{ experience.company }}</h4>
            <p>{{ experience.description }}</p>
            <ul v-if="experience.achievements">
                <li v-for="achievement in experience.achievements" :key="achievement">{{ achievement }}</li>
            </ul>
            <div class="timeline-tech">
                <TechChip v-for="tech in experience.technologies" :key="tech" :name="tech" :icon="tech.toLowerCase()" :interactive="false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import TechChip from './TechChip.vue';

defineProps({
    experience: {
        type: Object,
        required: true
    },
    position: {
        type: String,
        default: 'left',
        validator: (value) => ['left', 'right'].includes(value)
    }
});
</script>

<style scoped>
.timeline-item {
    position: relative;
    width: 50%;
    padding: 1rem 2rem;
    box-sizing: border-box;
}

.timeline-item.left {
    left: 0;
    text-align: right;
}

.timeline-item.right {
    left: 50%;
    text-align: left;
}

.timeline-item::before {
    content: '';
    position: absolute;
    top: 1.5rem;
    width: 16px;
    height: 16px;
    background: var(--color-accent-primary);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--color-accent-primary);
}

.timeline-item.left::before {
    right: -8px;
}

.timeline-item.right::before {
    left: -8px;
}

.timeline-content {
    padding: 1.5rem;
    position: relative;
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    background: var(--glass-bg-strong);
    box-shadow: var(--shadow-sm);
}

.timeline-date {
    display: inline-block;
    padding: 0.3rem 1rem;
    background: var(--color-accent-primary);
    color: white;
    border-radius: var(--radius-pill);
    font-size: 0.8rem;
    margin-bottom: 1rem;
}

.timeline-content h3 {
    color: var(--color-text-primary);
    margin-bottom: 0.3rem;
}

.timeline-content h4 {
    color: var(--color-accent-secondary);
    margin-bottom: 1rem;
    font-size: 0.9rem;
    font-weight: normal;
}

.timeline-content p {
    color: var(--color-text-secondary);
    margin-bottom: 1rem;
    line-height: 1.6;
}

.timeline-content ul {
    list-style: none;
    margin-bottom: 1rem;
    color: var(--color-text-tertiary);
}

.timeline-content li {
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
}

.timeline-content li::before {
    content: '>';
    color: var(--color-accent-primary);
    margin-right: 0.5rem;
}

.timeline-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
}

@media (max-width: 768px) {
    .timeline-item {
        width: 100%;
        left: 0 !important;
        padding-left: 3rem;
        text-align: left;
    }

    .timeline-item::before {
        left: 0.5rem !important;
        right: auto !important;
    }

    .timeline-item.left {
        text-align: left;
    }
}
</style>
