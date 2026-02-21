<template>
    <main class="home">
        <ParticlesBackground />

        <AppHeader />

        <HeroSection />

        <AboutSection />

        <SkillsSection />

        <ProjectSection />

        <ExperienceSection />

        <ContactSection />

        <AppFooter />
    </main>
</template>

<script setup>
import { onMounted } from 'vue';
import ParticlesBackground from '@/components/ParticlesBackground.vue';
import AppHeader from '@/components/AppHeader.vue';
import HeroSection from '@/components/HeroSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import SkillsSection from '@/components/SkillsSection.vue';
import ProjectSection from '@/components/ProjectSection.vue';
import ExperienceSection from '@/components/ExperienceSection.vue';
import ContactSection from '@/components/ContactSection.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useScrollAnimation } from '@/composables/useScrollAnimation';

const { initScrollAnimation } = useScrollAnimation();

onMounted(() => {
    initScrollAnimation();
});
</script>

<style scoped>
.home {
    position: relative;
    min-height: 100vh;
    background: var(--color-bg-primary);
}
</style>