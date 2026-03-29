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
    /* Softened gradient and borders */
    background: linear-gradient(90deg, rgba(124,58,237,0.12), rgba(6,182,212,0.10));
    border: 1px solid rgba(255,255,255,0.04);
    box-shadow: 0 6px 18px rgba(0,0,0,0.45);
}

.gradient-btn.secondary {
    border: 1px solid rgba(255,255,255,0.03);
    background: rgba(255,255,255,0.02);
}

.gradient-btn.secondary:hover {
    background: linear-gradient(90deg, rgba(124,58,237,0.08), rgba(6,182,212,0.06));
    border-color: rgba(255,255,255,0.06);
}

.gradient-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    transition: left 0.45s ease, opacity 0.25s ease;
    opacity: 0.7;
}

.gradient-btn:hover::before {
    left: 100%;
    opacity: 1;
}

.gradient-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.28);
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
