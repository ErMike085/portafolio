<template>
    <main class="home">
        <ParticlesBackground />

        <AppHeader />

        <HeroSection />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />

        <ExperienceSection />

        <ContactSection />

        <AppFooter />
    </main>
</template>

<script setup>
import ParticlesBackground from '@/components/layout/ParticlesBackground.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import HeroSection from '@/components/sections/HeroSection.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import SkillsSection from '@/components/sections/SkillsSection.vue';
import ProjectsSection from '@/components/sections/ProjectsSection.vue';
import ExperienceSection from '@/components/sections/ExperienceSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { useScrollAnimation } from '@/composables/useScrollAnimation';

useScrollAnimation();
</script>

<style scoped>
.home {
    position: relative;
    min-height: 100vh;
    background: var(--color-bg-primary);
}
</style>
