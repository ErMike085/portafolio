<template>
    <section class="contact-section" id="contact">
        <div class="container">
            <h2 class="section-title" data-animate>Contacto</h2>
            <div class="contact-content">
                <div class="contact-info" data-animate>
                    <h3>Hablemos</h3>
                    <p>¿Tienes un proyecto en mente o quieres colaborar? Estoy a un mensaje de distancia.</p>
                    <div class="social-links">
                        <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener" class="social-link">
                            <i :class="social.icon"></i>
                            <span>{{ social.name }}</span>
                        </a>
                    </div>
                </div>
                <div class="contact-form" data-animate>
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <input type="text" id="name" v-model="form.name" required placeholder=" " />
                            <label for="name">Nombre</label>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" v-model="form.email" required placeholder=" " />
                            <label for="email">Email</label>
                        </div>
                        <div class="form-group">
                            <textarea id="message" v-model="form.message" required placeholder=" " rows="5"></textarea>
                            <label for="message">Mensaje</label>
                        </div>
                        <GradientButton type="submit" :disabled="sending">
                            {{ sending ? 'Enviando...' : 'Enviar mensaje' }}
                        </GradientButton>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import GradientButton from '../ui/GradientButton.vue';

const form = ref({
    name: '',
    email: '',
    message: ''
});

const sending = ref(false);

const socials = ref([
    { name: 'GitHub', icon: 'devicon-github-original', url: 'https://github.com/ErMike085' },
    { name: 'LinkedIn', icon: 'devicon-linkedin-plain', url: 'https://www.linkedin.com/in/miguel-angel-muñoz-ortiz-8109931aa/' },
    { name: 'Email', icon: 'fas fa-envelope', url: 'mailto:ermike085@gmail.com' }
]);

const handleSubmit = async () => {
    sending.value = true;
    // Simulación de envío - reemplazar con EmailJS o llamada a API
    setTimeout(() => {
        alert('Mensaje enviado (simulado)');
        form.value = { name: '', email: '', message: '' };
        sending.value = false;
    }, 1500);
};
</script>

<style scoped>
.contact-section {
    background: var(--color-bg-primary);
}

.section-title {
    font-size: var(--section-title-size);
    margin-bottom: 3.25rem;
    text-shadow: var(--text-glow-soft);
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
}

.contact-info h3 {
    font-size: 2rem;
    color: var(--color-accent-red-soft);
    margin-bottom: 1rem;
}

.contact-info p {
    color: var(--color-text-secondary);
    margin-bottom: 2rem;
    line-height: 1.8;
}

.social-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-sm);
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-border);
    transition: all 0.3s ease;
}

.social-link:hover {
    border-color: var(--color-accent-primary);
    color: var(--color-text-primary);
    transform: translateX(5px);
}

.social-link i {
    font-size: 1.5rem;
    color: var(--color-accent-primary);
}

.contact-form {
    background: var(--glass-bg-strong);
    backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    padding: 2rem;
    box-shadow: var(--shadow-sm);
}

.form-group {
    position: relative;
    margin-bottom: 2rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.75rem 0;
    font-size: 1rem;
    color: var(--color-text-primary);
    background: transparent;
    border: 1px solid rgba(168, 191, 241, 0.35);
    border-radius: var(--radius-sm);
    padding: 0.82rem 0.9rem;
    outline: none;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

.form-group textarea {
    resize: vertical;
    min-height: 100px;
}

.form-group label {
    position: absolute;
    top: 0.84rem;
    left: 0.9rem;
    color: var(--color-text-tertiary);
    pointer-events: none;
    transition: all 0.3s ease;
}

.form-group input:focus~label,
.form-group input:not(:placeholder-shown)~label,
.form-group textarea:focus~label,
.form-group textarea:not(:placeholder-shown)~label {
    top: -1.05rem;
    left: 0.25rem;
    font-size: 0.8rem;
    color: var(--color-accent-primary);
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: var(--color-accent-primary);
    box-shadow: var(--focus-ring);
    background-color: rgba(13, 20, 38, 0.75);
}

@media (max-width: 768px) {
    .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}
</style>
