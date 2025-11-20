<template>
  <section
    class="relative w-full min-h-[calc(100vh-4rem)] flex items-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden"
  >
    <!-- Background overlay/pattern -->
    <div
      class="absolute inset-0 bg-[url('https://i.pinimg.com/1200x/4b/85/c0/4b85c06914e07bb2e98a4d583529a857.jpg')] bg-cover bg-center opacity-10 z-0"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white/50 z-1"></div>

    <!-- Main content container -->
    <div
      class="relative z-10 max-w-7xl mx-auto px-6 tablet:px-10 flex flex-row items-center gap-12 tablet:gap-16"
    >
      <!-- Left content -->
      <div class="flex-1 tablet:pr-8">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-700 font-medium text-sm rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM0 15.5a6.5 6.5 0 1113 0H0z" />
          </svg>
          Serving 10,000+ ISU Echague students
        </div>

        <!-- Title -->
        <h1
          class="text-4xl tablet:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6"
        >
          Navigate Your
          <span class="block text-emerald-600">Campus Journey</span>
          with AimISU
        </h1>

        <!-- Tagline -->
        <p class="text-lg text-gray-700 font-medium mb-4">
          Campus events won't miss you, thanks to AimISU.
        </p>

        <!-- Description -->
        <p class="text-base text-gray-600 max-w-xl mb-10 leading-relaxed">
          Real-time interactive mapping and event management for Isabela State University Echague
          Campus. Discover events, navigate buildings, and stay connected with your university
          community.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col phone:flex-row gap-4">
          <router-link
            to="/register"
            class="no-underline inline-flex items-center justify-center bg-teal-600 hover:bg-tealc-700 text-white font-semibold rounded-lg px-8 py-4 text-lg shadow-lg transition-colors duration-200"
          >
            Start Exploring
          </router-link>
          <button
            class="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-300 hover:border-emerald-600 hover:text-emerald-600 text-gray-700 font-semibold rounded-lg px-8 py-4 text-lg shadow-md transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
              />
            </svg>
            View Campus Map
          </button>
        </div>
      </div>

      <!-- Right side - Image -->
      <div class="flex-1 flex items-center justify-center">
        <div
          class="relative w-full max-w-md h-96 tablet:h-[450px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <!-- Image with interactive map feel -->
          <img
            src="https://i.pinimg.com/1200x/4b/85/c0/4b85c06914e07bb2e98a4d583529a857.jpg"
            alt="Interactive Campus Map"
            class="w-full h-full object-cover"
          />

          <!-- Overlay badge -->
          <div
            class="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
          >
            <span class="w-3 h-3 bg-emerald-600 rounded-full animate-pulse"></span>
            <span class="text-sm font-medium text-gray-700">Live Campus Data</span>
          </div>

          <!-- Corner accent -->
          <div
            class="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm font-semibold opacity-90"
          >
            Interactive Map
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator (optional) -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeTopSection',
}
</script>

<script setup></script>
