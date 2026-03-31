<template>
    <header class="app-header" :class="{ 'scrolled': isScrolled }">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    <router-link to="/">{{ logoText }}</router-link>
                </div>
                <ul class="nav-menu" :class="{ 'active': isMenuOpen }">
                    <li v-for="item in menuItems" :key="item.id">
                        <a :href="'#' + item.id" @click.prevent="scrollTo(item.id)">{{ item.label }}</a>
                    </li>
                </ul>
                <button class="menu-toggle" @click="toggleMenu" aria-label="Menu">
                    <span></span><span></span><span></span>
                </button>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isMenuOpen = ref(false);
const logoText = ref('<Miguel Muñoz/>');

const menuItems = ref([
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre mi' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'contact', label: 'Contacto' }
]);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        isMenuOpen.value = false;
    }
};

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.app-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 1rem 0;
    transition: background 0.3s ease, border-color 0.3s ease, padding 0.3s ease;
    background: rgba(7, 9, 18, 0.25);
    border-bottom: 1px solid transparent;
}

.app-header.scrolled {
    background: rgba(10, 16, 33, 0.88);
    backdrop-filter: var(--glass-blur);
    border-bottom: 1px solid var(--glass-border);
    padding: 0.5rem 0;
    box-shadow: var(--shadow-sm);
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo a {
    font-family: var(--font-display);
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--color-text-primary);
    text-decoration: none;
    background: linear-gradient(90deg,
            #8b5cf6 0%,
            #22d3ee 25%,
            #f472b6 50%,
            #22d3ee 75%,
            #8b5cf6 100%);
    background-size: 300% 100%;
    background-position: 100% 50%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: var(--text-glow-soft);
    animation: navLogoGradientShift 8s linear infinite;
    will-change: background-position;
}

@keyframes navLogoGradientShift {
    0% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.nav-menu {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.nav-menu a {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
}

.nav-menu a:focus-visible {
    outline: none;
    color: var(--color-text-primary);
    box-shadow: var(--focus-ring);
    border-radius: 6px;
}

.nav-menu a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: width 0.3s ease;
}

.nav-menu a:hover {
    color: var(--color-text-primary);
}

.nav-menu a:hover::after {
    width: 100%;
}

.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    border-radius: 6px;
}

.menu-toggle span {
    width: 100%;
    height: 3px;
    background: var(--color-text-primary);
    border-radius: 3px;
    transition: all 0.3s ease;
}

@media (max-width: 768px) {
    .menu-toggle {
        display: flex;
    }

    .nav-menu {
        position: fixed;
        top: var(--header-height-sm, 66px);
        left: 0;
        width: 100%;
        background: rgba(10, 16, 33, 0.95);
        backdrop-filter: var(--glass-blur);
        border-radius: 0 0 var(--radius-md) var(--radius-md);
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
        transform: translateY(-150%);
        opacity: 0;
        transition: all 0.3s ease;
        border-bottom: 1px solid var(--glass-border);
    }

    .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
