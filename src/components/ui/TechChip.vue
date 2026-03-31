<template>
    <div class="tech-chip" :class="{ 'is-interactive': interactive }" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <img v-if="iconUrl" :src="iconUrl" :alt="name" class="chip-icon-image" />
        <i v-else-if="iconClass" :class="iconClass"></i>
        <span>{{ name }}</span>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import supabaseIcon from '@/assets/icons/supabase.svg';
import inertiaIcon from '@/assets/icons/tech/inertia.svg';
import inertiaSsrIcon from '@/assets/icons/tech/inertia-ssr.svg';
import compositionApiIcon from '@/assets/icons/tech/composition-api.svg';
import tailwindIcon from '@/assets/icons/tech/tailwindcss.svg';
import dompdfIcon from '@/assets/icons/tech/dompdf.svg';
import laravelExcelIcon from '@/assets/icons/tech/laravel-excel.svg';
import apexchartsIcon from '@/assets/icons/tech/apexcharts.svg';
import sweetalert2Icon from '@/assets/icons/tech/sweetalert2.svg';
import jwtIcon from '@/assets/icons/tech/jwt.svg';
import stripeIcon from '@/assets/icons/tech/stripe.svg';
import sanctumIcon from '@/assets/icons/tech/sanctum.svg';
import vuedraggableIcon from '@/assets/icons/tech/vuedraggable.svg';
import phpunitIcon from '@/assets/icons/tech/phpunit.svg';
import websocketsIcon from '@/assets/icons/tech/websockets.svg';
import chartjsIcon from '@/assets/icons/tech/chartjs.svg';

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

const normalizedIcon = computed(() => String(props.icon || '').toLowerCase().trim());

const iconAssetMap = {
    supabase: supabaseIcon,
    inertia: inertiaIcon,
    'inertia-ssr': inertiaSsrIcon,
    'composition-api': compositionApiIcon,
    tailwindcss: tailwindIcon,
    dompdf: dompdfIcon,
    'laravel-excel': laravelExcelIcon,
    apexcharts: apexchartsIcon,
    sweetalert2: sweetalert2Icon,
    jwt: jwtIcon,
    stripe: stripeIcon,
    sanctum: sanctumIcon,
    vuedraggable: vuedraggableIcon,
    phpunit: phpunitIcon,
    websockets: websocketsIcon,
    chartjs: chartjsIcon,
};

const iconClassMap = {
    vitejs: 'devicon-vitejs-plain',
    mysql: 'devicon-mysql-plain',
    javascript: 'devicon-javascript-plain',
    php: 'devicon-php-plain',
    laravel: 'devicon-laravel-plain',
    vuejs: 'devicon-vuejs-plain',
    postman: 'devicon-postman-plain',
};

const iconUrl = computed(() => iconAssetMap[normalizedIcon.value] || null);
const iconClass = computed(() => iconClassMap[normalizedIcon.value] || null);

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
