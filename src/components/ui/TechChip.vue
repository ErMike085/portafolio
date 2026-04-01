<template>
    <div class="tech-chip" :class="{ 'is-interactive': interactive }" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <img v-if="iconUrl" :src="iconUrl" :alt="name" class="chip-icon-image" />
        <i v-else-if="iconClass" :class="iconClass"></i>
        <span>{{ name }}</span>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { resolveTechIcon } from '@/utils/techIcons';

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

const iconKey = computed(() => props.icon || props.name);
const resolvedIcon = computed(() => resolveTechIcon(iconKey.value));
const iconUrl = computed(() => (resolvedIcon.value?.type === 'asset' ? resolvedIcon.value.value : null));
const iconClass = computed(() => (resolvedIcon.value?.type === 'class' ? resolvedIcon.value.value : null));

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

.chip-icon-image {
    width: 1.2rem;
    height: 1.2rem;
    object-fit: contain;
    filter: drop-shadow(0 0 6px rgba(var(--glow-violet-rgb), 0.35));
}
</style>
