<template>
    <button :class="['gradient-btn', variant, { 'full-width': fullWidth }]" @click="$emit('click')">
        <span class="btn-content">
            <slot />
        </span>
    </button>
</template>

<script setup>
defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary'].includes(value)
    },
    fullWidth: {
        type: Boolean,
        default: false
    }
});

defineEmits(['click']);
</script>

<style scoped>
.gradient-btn {
    position: relative;
    padding: var(--btn-padding-y) var(--btn-padding-x);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-pill);
    font-size: 0.96rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    background: rgba(14, 22, 42, 0.7);
    color: var(--color-text-primary);
    box-shadow: none;
}

.gradient-btn.primary {
    background: rgba(14, 22, 42, 0.82);
    border-color: rgba(168, 191, 241, 0.35);
    color: var(--color-text-primary);
}

.gradient-btn.secondary {
    background: transparent;
    border-color: rgba(168, 191, 241, 0.25);
    color: var(--color-text-secondary);
}

.gradient-btn.secondary:hover {
    background: rgba(14, 22, 42, 0.55);
    border-color: rgba(168, 191, 241, 0.38);
    color: var(--color-text-primary);
}

.gradient-btn::before {
    content: none;
}

.gradient-btn:hover::before {
    content: none;
}

.gradient-btn:hover {
    transform: translateY(-1px);
    background: linear-gradient(
        90deg,
        rgba(139, 92, 246, 0.14),
        rgba(34, 211, 238, 0.1),
        rgba(244, 114, 182, 0.14)
    );
    box-shadow: 0 10px 24px -20px rgba(0, 0, 0, 0.9);
    border-color: rgba(176, 202, 252, 0.45);
}

.gradient-btn:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
}

.btn-content {
    position: relative;
    z-index: 1;
}

.full-width {
    width: 100%;
}
</style>
