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
    border: none;
    border-radius: var(--radius-pill);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    background: transparent;
    color: var(--color-text-primary);
}

.gradient-btn.primary {
    background: var(--gradient-primary);
    border: 1px solid var(--glass-border-red);
    box-shadow: var(--shadow-glow);
}

.gradient-btn.secondary {
    border: 1px solid var(--glass-border-red);
    background: transparent;
}

.gradient-btn.secondary:hover {
    background: var(--gradient-primary);
    border-color: transparent;
}

.gradient-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--overlay-sheen), transparent);
    transition: left 0.5s ease;
}

.gradient-btn:hover::before {
    left: 100%;
}

.gradient-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow-md);
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
