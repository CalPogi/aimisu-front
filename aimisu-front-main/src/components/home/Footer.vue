<template>
  <div>
    <!-- CTA Section: Ready to Navigate -->
    <section
      class="relative w-full py-20 tablet:py-28 bg-gradient-to-br from-emerald-500 to-emerald-600 overflow-hidden"
    >
      <div class="relative z-10 max-w-4xl mx-auto px-6 tablet:px-10 text-center">
        <!-- Icon -->
        <div class="flex justify-center mb-6">
          <div
            class="flex items-center justify-center h-12 w-12 bg-white/20 rounded-full backdrop-blur-md"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
          </div>
        </div>

        <!-- Heading -->
        <h2 class="text-3xl tablet:text-4xl font-extrabold text-white mb-4">
          Ready to Explore Campus?
        </h2>

        <!-- Subheading -->
        <p class="text-lg tablet:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
          Join thousands of students already using AimISU to enhance their campus experience.
        </p>

        <!-- CTA Button -->
        <router-link
          to="/register"
          class="no-underline inline-flex items-center gap-2 bg-white text-emerald-600 hover:bg-gray-100 font-semibold rounded-lg px-6 py-3 text-lg shadow-lg transition-colors duration-200"
        >
          Get Started Now
        </router-link>

        <!-- Subtext -->
        <p class="text-white/80 text-sm tablet:text-base mt-6">
          Free for all ISU Echague students and staff
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative w-full bg-white border-t border-gray-200 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 tablet:px-10 py-10 tablet:py-12">
        <div class="grid grid-cols-3 gap-8 mb-6 pb-6 border-b border-gray-200">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <img
                src="@/assets/images/logo/logo-text.png"
                alt="AimISU Logo"
                class="h-10 tablet:h-12 object-contain"
              />
            </div>
            <p class="text-gray-600 text-sm">Campus events won't miss you, thanks to AimISU.</p>
          </div>

          <!-- Links -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Quick Links</h3>
            <ul class="space-y-2 text-gray-600 text-sm">
              <li><a href="#features" class="hover:text-emerald-600 transition">Features</a></li>
              <li><a href="#benefits" class="hover:text-emerald-600 transition">Why Us</a></li>
              <li>
                <router-link to="/login" class="hover:text-emerald-600 transition"
                  >Login</router-link
                >
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Contact</h3>
            <ul class="space-y-2 text-gray-600 text-sm">
              <li class="flex items-center gap-2">
                <i class="fi fi-br-envelope"></i>
                <a href="mailto:info@isu.edu.ph" class="hover:text-emerald-600 transition"
                  >info@isu.edu.ph</a
                >
              </li>
              <li class="flex items-center gap-2">
                <i class="fi fi-br-map-pin"></i>
                <span>ISU Echague Campus, Isabela</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="flex flex-col tablet:flex-row justify-between items-center text-sm text-gray-500"
        >
          <p>&copy; 2025 AimISU. All rights reserved.</p>
          <div class="flex gap-6 mt-4 tablet:mt-0">
            <a href="#" class="hover:text-emerald-400 transition">Privacy Policy</a>
            <a href="#" class="hover:text-emerald-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomeFooter',
}
</script>

<script setup></script>
