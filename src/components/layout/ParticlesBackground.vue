<template>
    <div class="particles-container">
        <vue-particles :key="particlesKey" id="tsparticles" :options="particlesConfig" />
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

const getCssVar = (name, fallback) => {
    if (typeof window === 'undefined') {
        return fallback;
    }

    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
};

const viewportMode = ref('desktop');
const particlesKey = ref(0);

const resolveViewportMode = () => {
    const width = window.innerWidth;

    if (width <= 480) {
        return 'mobile';
    }

    if (width <= 1024) {
        return 'tablet';
    }

    return 'desktop';
};

const particlesConfig = computed(() => {
    const mode = viewportMode.value;
    const isMobile = mode === 'mobile';
    const isTablet = mode === 'tablet';
    const accentColor = getCssVar('--color-accent-tertiary', '#7c3aed');
    const linkColor = getCssVar('--color-accent-secondary', '#22d3ee');

    return {
    background: {
        color: {
            value: 'transparent'
        }
    },
    fpsLimit: isMobile ? 30 : isTablet ? 45 : 60,
    particles: {
        color: {
            value: accentColor
        },
        links: {
            color: linkColor,
            distance: isMobile ? 90 : isTablet ? 120 : 150,
            enable: !isMobile,
            opacity: isMobile ? 0 : isTablet ? 0.14 : 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: isMobile ? 0.45 : isTablet ? 0.7 : 1,
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
                area: isMobile ? 1400 : isTablet ? 1000 : 800
            },
            value: isMobile ? 16 : isTablet ? 34 : 68
        },
        opacity: {
            value: isMobile ? 0.18 : 0.3,
            random: true,
            animation: {
                enable: !isMobile,
                speed: isMobile ? 0 : 0.5,
                minimumValue: 0.1,
                sync: false
            }
        },
        size: {
            value: isMobile ? 2.5 : 2,
            random: true,
            animation: {
                enable: !isMobile,
                speed: isMobile ? 0 : 2,
                minimumValue: 0.5,
                sync: false
            }
        }
    },
    interactivity: {
        events: {
            onHover: {
                enable: !isMobile,
                mode: 'grab'
            },
            onClick: {
                enable: !isMobile,
                mode: 'push'
            }
        },
        modes: {
            grab: {
                distance: isMobile ? 0 : 140,
                links: {
                    opacity: 0.5
                }
            },
            push: {
                quantity: isMobile ? 0 : 2
            }
        }
    }
    };
});

let resizeTimer = null;

const syncViewportMode = () => {
    const nextMode = resolveViewportMode();

    if (nextMode !== viewportMode.value) {
        viewportMode.value = nextMode;
        particlesKey.value += 1;
    }
};

const handleResize = () => {
    if (resizeTimer) {
        window.clearTimeout(resizeTimer);
    }

    resizeTimer = window.setTimeout(syncViewportMode, 150);
};

onMounted(() => {
    syncViewportMode();
    window.addEventListener('resize', handleResize, { passive: true });
});

onUnmounted(() => {
    if (resizeTimer) {
        window.clearTimeout(resizeTimer);
    }

    window.removeEventListener('resize', handleResize);
});
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
