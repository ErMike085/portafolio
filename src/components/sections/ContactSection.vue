<template>
    <section class="contact-section" id="contact">
        <div v-if="burstActive" class="mail-burst" aria-hidden="true">
            <span class="burst-flash"></span>
            <span class="burst-core"></span>
            <span class="burst-ring ring-a"></span>
            <span class="burst-ring ring-b"></span>
            <span class="burst-ring ring-c"></span>
            <span class="burst-ray ray-1"></span>
            <span class="burst-ray ray-2"></span>
            <span class="burst-ray ray-3"></span>
            <span class="burst-ray ray-4"></span>
            <span class="burst-ray ray-5"></span>
            <span class="burst-ray ray-6"></span>
        </div>
        <div class="container">
            <h2 class="section-title" data-animate>Contacto</h2>
            <div class="contact-content">
                <div class="contact-info" data-animate>
                    <h3>Hablemos</h3>
                    <p>Tienes un proyecto en mente o quieres colaborar? Estoy a un mensaje de distancia.</p>
                    <div class="social-links">
                        <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener" class="social-link">
                            <i :class="social.icon"></i>
                            <span>{{ social.name }}</span>
                        </a>
                    </div>
                </div>
                <div class="contact-form" data-animate>
                    <form @submit="handleSubmit">
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
                        <input
                            v-model="form.website"
                            type="text"
                            name="website"
                            tabindex="-1"
                            autocomplete="off"
                            class="hp-field"
                            aria-hidden="true"
                        />

                        <p v-if="submitMessage" :class="['submit-message', submitState]">
                            {{ submitMessage }}
                        </p>

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

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';
const CONTACT_FALLBACK_ENDPOINT =
    import.meta.env.VITE_CONTACT_FALLBACK_ENDPOINT || '';
const MIN_SUBMIT_INTERVAL_MS = 30000;
const MIN_FILL_TIME_MS = 1500;
const NAME_MAX_LEN = 120;
const EMAIL_MAX_LEN = 254;
const MESSAGE_MAX_LEN = 2000;
const LAST_SUBMIT_KEY = 'contact_last_submit_at';

const form = ref({
    name: '',
    email: '',
    message: '',
    website: ''
});

const sending = ref(false);
const submitState = ref('idle');
const submitMessage = ref('');
const formStartedAt = ref(Date.now());
const burstActive = ref(false);

const socials = ref([
    { name: 'GitHub', icon: 'devicon-github-original', url: 'https://github.com/ErMike085' },
    { name: 'LinkedIn', icon: 'devicon-linkedin-plain', url: 'https://www.linkedin.com/in/miguel-angel-munoz-ortiz-8109931aa/' },
    { name: 'Email', icon: 'fas fa-envelope', url: 'mailto:ermike085@gmail.com' }
]);

const sanitizeText = (value) =>
    String(value || '')
        .replace(/[<>{}]/g, '')
        .replace(/[\u0000-\u001f\u007f]/g, '')
        .trim();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

const isEndpointSecure = (endpoint) =>
    /^https:\/\/[^\s]+$/i.test(endpoint) || /^\/api\/[a-z0-9/_-]+$/i.test(endpoint);

const isHttpsEndpoint = (endpoint) => /^https:\/\/[^\s]+$/i.test(endpoint);

const canSubmitByRateLimit = () => {
    const lastSubmit = Number(sessionStorage.getItem(LAST_SUBMIT_KEY) || '0');
    return Date.now() - lastSubmit > MIN_SUBMIT_INTERVAL_MS;
};

const buildPayload = ({ name, email, message, website, startedAt }) => ({
    name,
    email,
    message,
    website,
    startedAt
});

const doSubmitRequest = (endpoint, payload) =>
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(payload)
    });

const isLocalhostRuntime = () =>
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const triggerBurst = () => {
    burstActive.value = false;
    requestAnimationFrame(() => {
        burstActive.value = true;
        setTimeout(() => {
            burstActive.value = false;
        }, 1200);
    });
};

const handleSubmit = async (event) => {
    event?.preventDefault?.();

    if (sending.value) {
        return;
    }

    if (!isEndpointSecure(CONTACT_ENDPOINT)) {
        submitState.value = 'error';
        submitMessage.value = 'El formulario no esta configurado de forma segura. Configura VITE_CONTACT_ENDPOINT.';
        return;
    }

    if (!canSubmitByRateLimit()) {
        submitState.value = 'error';
        submitMessage.value = 'Espera unos segundos antes de volver a enviar.';
        return;
    }

    if (Date.now() - formStartedAt.value < MIN_FILL_TIME_MS || form.value.website) {
        submitState.value = 'error';
        submitMessage.value = 'No se pudo validar el envio.';
        return;
    }

    const safeName = sanitizeText(form.value.name).slice(0, NAME_MAX_LEN);
    const safeEmail = sanitizeText(form.value.email).slice(0, EMAIL_MAX_LEN);
    const safeMessage = sanitizeText(form.value.message).slice(0, MESSAGE_MAX_LEN);

    if (!safeName || !safeMessage || !isValidEmail(safeEmail)) {
        submitState.value = 'error';
        submitMessage.value = 'Verifica nombre, correo y mensaje.';
        return;
    }

    sending.value = true;
    submitMessage.value = '';
    submitState.value = 'idle';

    try {
        const payload = buildPayload({
            name: safeName,
            email: safeEmail,
            message: safeMessage,
            website: form.value.website,
            startedAt: formStartedAt.value
        });

        const preferDirectFallback =
            isLocalhostRuntime() &&
            CONTACT_ENDPOINT.startsWith('/api/') &&
            isHttpsEndpoint(CONTACT_FALLBACK_ENDPOINT);

        let response = null;
        if (preferDirectFallback) {
            response = await doSubmitRequest(CONTACT_FALLBACK_ENDPOINT, {
                ...payload,
                _subject: `Nuevo mensaje de ${safeName} desde el portafolio`,
                _template: 'table',
                _captcha: 'false'
            });
        } else {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 12000);
                response = await fetch(CONTACT_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    signal: controller.signal,
                    body: JSON.stringify(payload)
                });
                clearTimeout(timeoutId);
            } catch {
                response = null;
            }
        }

        const shouldTryFallback =
            isLocalhostRuntime() &&
            CONTACT_ENDPOINT.startsWith('/api/') &&
            isHttpsEndpoint(CONTACT_FALLBACK_ENDPOINT) &&
            (!response || !response.ok);

        if (shouldTryFallback) {
            response = await doSubmitRequest(CONTACT_FALLBACK_ENDPOINT, {
                ...payload,
                _subject: `Nuevo mensaje de ${safeName} desde el portafolio`,
                _template: 'table',
                _captcha: 'false'
            });
        }

        if (!response || !response.ok) {
            throw new Error('No se pudo enviar el formulario.');
        }

        submitState.value = 'success';
        submitMessage.value = 'Mensaje enviado correctamente. Te respondere lo mas pronto posible.';
        sessionStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
        form.value = { name: '', email: '', message: '', website: '' };
        formStartedAt.value = Date.now();
        triggerBurst();
    } catch {
        submitState.value = 'error';
        submitMessage.value = 'No se pudo enviar el mensaje. Intenta de nuevo o escribeme por correo directo.';
    } finally {
        sending.value = false;
    }
};
</script>

<style scoped>
.contact-section {
    background: var(--color-bg-primary);
}

.mail-burst {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1200;
}

.burst-flash {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        circle at 50% 50%,
        rgba(196, 181, 253, 0.26),
        rgba(139, 92, 246, 0.1),
        transparent 62%
    );
    animation: burstFlash 0.75s ease-out forwards;
}

.burst-core,
.burst-ring,
.burst-ray {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.burst-core {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(244, 114, 182, 0.95) 0%, rgba(139, 92, 246, 0.65) 70%, transparent 100%);
    animation: burstCore 0.9s ease-out forwards;
}

.burst-ring {
    border-radius: 999px;
    border: 2px solid rgba(196, 181, 253, 0.55);
    animation: burstRing 1s ease-out forwards;
}

.ring-a {
    width: 70px;
    height: 70px;
    animation-delay: 0.02s;
}

.ring-b {
    width: 110px;
    height: 110px;
    border-color: rgba(34, 211, 238, 0.5);
    animation-delay: 0.08s;
}

.ring-c {
    width: 150px;
    height: 150px;
    border-color: rgba(244, 114, 182, 0.4);
    animation-delay: 0.12s;
}

.burst-ray {
    width: 4px;
    height: 58px;
    border-radius: 999px;
    background: linear-gradient(to top, rgba(34, 211, 238, 0), rgba(196, 181, 253, 0.9));
    transform-origin: bottom center;
    animation: burstRay 1s ease-out forwards;
}

.ray-1 { transform: translate(-50%, -50%) rotate(0deg); }
.ray-2 { transform: translate(-50%, -50%) rotate(60deg); }
.ray-3 { transform: translate(-50%, -50%) rotate(120deg); }
.ray-4 { transform: translate(-50%, -50%) rotate(180deg); }
.ray-5 { transform: translate(-50%, -50%) rotate(240deg); }
.ray-6 { transform: translate(-50%, -50%) rotate(300deg); }

@keyframes burstCore {
    0% {
        opacity: 0.9;
        transform: translate(-50%, -50%) scale(0.35);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(2.2);
    }
}

@keyframes burstRing {
    0% {
        opacity: 0.85;
        transform: translate(-50%, -50%) scale(0.3);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.75);
    }
}

@keyframes burstRay {
    0% {
        opacity: 0.85;
        height: 22px;
    }
    100% {
        opacity: 0;
        height: 112px;
    }
}

@keyframes burstFlash {
    0% {
        opacity: 0.8;
    }
    100% {
        opacity: 0;
    }
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

.submit-message {
    margin: -0.5rem 0 1rem;
    font-size: 0.9rem;
}

.submit-message.success {
    color: #86efac;
}

.submit-message.error {
    color: #fca5a5;
}

.hp-field {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
}

@media (max-width: 768px) {
    .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}
</style>


