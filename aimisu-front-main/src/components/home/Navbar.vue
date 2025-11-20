<template>
  <nav
    class="fixed top-0 left-0 right-0 w-full h-16 flex items-center justify-between px-6 phone:px-8 z-50 bg-transparent backdrop-blur-md border-b border-white/20 shadow-sm"
  >
    <div class="flex items-center gap-2 flex-shrink-0">
      <img
        src="@/assets/images/logo/logo-text.png"
        alt="AimISU Logo"
        class="h-7 tablet:h-12 object-contain"
      />
    </div>

    <div class="flex items-center">
      <!-- Mobile: Icons only (visible only on screens smaller than tablet/768px) -->
      <div class="flex tablet:hidden gap-2">
        <a
          href="#features"
          class="no-underline p-2 rounded text-gray-700 hover:text-emerald-600 transition"
          aria-label="Features"
        >
          <i class="fi fi-br-star w-6 h-6"></i>
        </a>
        <a
          href="#benefits"
          class="no-underline p-2 rounded text-gray-700 hover:text-emerald-600 transition"
          aria-label="Benefits"
        >
          <i class="fi fi-br-thumb-up w-6 h-6"></i>
        </a>
        <a
          href="#how-it-works"
          class="no-underline p-2 rounded text-gray-700 hover:text-emerald-600 transition"
          aria-label="How It Works"
        >
          <i class="fi fi-br-settings w-6 h-6"></i>
        </a>
      </div>

      <!-- Desktop: Text links only (hidden on mobile, visible on tablet and up) -->
      <div class="hidden tablet:flex items-center gap-10">
        <a
          href="#features"
          class="no-underline font-medium text-gray-700 hover:text-emerald-600 transition tracking-wide"
          >Features</a
        >
        <a
          href="#benefits"
          class="no-underline font-medium text-gray-700 hover:text-emerald-600 transition tracking-wide"
          >Benefits</a
        >
        <a
          href="#how-it-works"
          class="no-underline font-medium text-gray-700 hover:text-emerald-600 transition tracking-wide"
          >How It Works</a
        >
      </div>
    </div>

    <router-link
      to="/login"
      class="no-underline tablet:flex bg-teal-500 hover:bg-teal-700 text-white font-semibold rounded-lg px-5 py-2 text-sm shadow-md transition duration-200 flex-shrink-0 phone:block"
    >
      Get Started
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'HomeNavbar',
}
</script>

<script setup>
// Navbar uses Flaticon classes; no JS required
</script>
