<template>
  <div class="w-full">
    <!-- Navigation -->
    <Navbar />

    <!-- Top / Hero -->
    <TopSection />

    <!-- Secondary visual section -->
    <SecondSection />

    <!-- Features -->
    <Features />

    <!-- Benefits -->
    <Benefits />

    <!-- How It Works -->
    <Steps />

    <!-- Footer -->
    <HomeFooter />
  </div>
</template>

<script setup>
import Navbar from '@/components/home/Navbar.vue'
import TopSection from '@/components/home/TopSection.vue'
import SecondSection from '@/components/home/SecondSection.vue'
import Features from '@/components/home/Features.vue'
import Benefits from '@/components/home/Benefits.vue'
import Steps from '@/components/home/Steps.vue'
import HomeFooter from '@/components/home/Footer.vue'

// Home page is composed of modular components; no local helpers required
</script>
