<template>
    <div class="particles-container">
        <vue-particles id="tsparticles" :options="particlesConfig" :particles-init="particlesInit" />
    </div>
</template>

<script setup>
import { loadSlim } from '@tsparticles/slim';
import { VueParticles } from '@tsparticles/vue3';

const particlesInit = async (engine) => {
    await loadSlim(engine);
};

const particlesConfig = {
    background: {
        color: {
            value: 'transparent'
        }
    },
    fpsLimit: 60,
    particles: {
        color: {
            value: '#8a2be2'
        },
        links: {
            color: '#8a2be2',
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
                default: 'out'
            }
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.3,
            random: true,
            animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.1,
                sync: false
            }
        },
        size: {
            value: 2,
            random: true,
            animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.5,
                sync: false
            }
        }
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: 'grab'
            },
            onClick: {
                enable: true,
                mode: 'push'
            }
        },
        modes: {
            grab: {
                distance: 140,
                links: {
                    opacity: 0.5
                }
            },
            push: {
                quantity: 2
            }
        }
    }
};
</script>

<style scoped>
.particles-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

#tsparticles {
    width: 100%;
    height: 100%;
}
</style>