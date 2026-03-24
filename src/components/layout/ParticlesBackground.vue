<template>
    <div class="particles-container">
        <vue-particles id="tsparticles" :options="particlesConfig" />
    </div>
</template>

<script setup>
const getCssVar = (name, fallback) => {
    if (typeof window === 'undefined') {
        return fallback;
    }

    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
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
            value: getCssVar('--color-accent-tertiary', '#7c3aed')
        },
        links: {
            color: getCssVar('--color-accent-red', '#e05c6e'),
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
