<template>
    <div class="tech-chip" :class="{ 'is-interactive': interactive }" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <i :class="iconClass" v-if="icon"></i>
        <span>{{ name }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: null
    },
    color: {
        type: String,
        default: 'primary'
    },
    interactive: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['hover']);

const iconClass = `devicon-${props.icon}-plain`;

const handleMouseEnter = () => {
    if (props.interactive) {
        emit('hover', { name: props.name, active: true });
    }
};

const handleMouseLeave = () => {
    if (props.interactive) {
        emit('hover', { name: props.name, active: false });
    }
};
</script>

<style scoped>
.tech-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-pill);
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    transition: all 0.3s ease;
}

.tech-chip.is-interactive {
    cursor: default;
}

.tech-chip.is-interactive:hover {
    border-color: var(--color-accent-primary);
    color: var(--color-text-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
}

.tech-chip.is-interactive:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.tech-chip i {
    font-size: 1.2rem;
    color: var(--color-accent-primary);
}
</style>
