<template>
    <span class="glowing-text" :class="{ 'gradient': gradient }">
        {{ text }}
    </span>
</template>

<script setup>
defineProps({
    text: {
        type: String,
        required: true
    },
    gradient: {
        type: Boolean,
        default: true
    }
});
</script>

<style scoped>
.glowing-text {
    position: relative;
    display: inline-block;
    color: var(--color-text-primary);
    text-shadow: var(--text-glow-soft);
    animation: textGlow 3s ease-in-out infinite;
}

.glowing-text.gradient {
    background: var(--gradient-title);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

@keyframes textGlow {

    0%,
    100% {
        text-shadow: var(--text-glow-soft);
    }

    50% {
        text-shadow: 0 0 12px rgba(var(--glow-red-rgb), 0.2), 0 0 16px rgba(var(--glow-violet-rgb), 0.14);
    }
}
</style>
