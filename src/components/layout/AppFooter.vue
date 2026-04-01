<template>
    <footer class="app-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <h3>{{ name }}</h3>
                    <p>Fullstack Web Developer</p>
                </div>
                <div class="footer-links">
                    <a v-for="link in links" :key="link.text" :href="link.url" target="_blank" rel="noopener">
                        <i :class="link.icon"></i>
                        <span>{{ link.text }}</span>
                    </a>
                </div>
                <div class="footer-copyright">
                    <p>&copy; {{ currentYear }} {{ name }}. Todos los derechos reservados.</p>
                    <p>Disenado y desarrollado con <span class="heart">&#10084;</span> y Vue.js</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('Miguel Muñoz');
const currentYear = new Date().getFullYear();

const links = ref([
    { text: 'GitHub', icon: 'devicon-github-original', url: 'https://github.com/ErMike085' },
    { text: 'LinkedIn', icon: 'devicon-linkedin-plain', url: 'https://www.linkedin.com/in/miguel-angel-muñoz-ortiz-8109931aa/' },
]);
</script>

<style scoped>
.app-footer {
    background: var(--color-bg-secondary);
    padding: 3rem 0;
    border-top: 1px solid var(--glass-border);
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;
}

.footer-brand h3 {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--color-text-primary);
    margin-bottom: 0.25rem;
}

.footer-brand p {
    color: var(--color-text-tertiary);
    font-size: 0.9rem;
}

.footer-links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
}

.footer-links a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    padding: 0.6rem 0.9rem;
    border-radius: var(--radius-pill);
    transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.footer-links a:hover {
    color: var(--color-text-primary);
    border-color: rgba(207, 224, 255, 0.34);
    transform: translateY(-2px);
}

.footer-links i {
    font-size: 1.2rem;
}

.footer-copyright p {
    color: var(--color-text-tertiary);
    font-size: 0.85rem;
}

.heart {
    color: var(--color-heart);
    animation: heartbeat 1.5s ease infinite;
}

@keyframes heartbeat {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }
}

@media (min-width: 768px) {
    .footer-content {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
    }

    .footer-brand,
    .footer-links,
    .footer-copyright {
        flex: 1;
    }

    .footer-links {
        justify-content: center;
    }

    .footer-copyright {
        text-align: right;
    }
}
</style>
