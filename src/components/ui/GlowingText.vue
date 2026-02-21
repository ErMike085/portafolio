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
    text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
    animation: textGlow 3s ease-in-out infinite;
}

.glowing-text.gradient {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

@keyframes textGlow {

    0%,
    100% {
        text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
    }

    50% {
        text-shadow: 0 0 20px rgba(138, 43, 226, 0.8), 0 0 30px rgba(75, 0, 130, 0.5);
    }
}
</style>