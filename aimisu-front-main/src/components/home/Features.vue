<template>
  <section id="features" class="relative w-full py-12 tablet:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6 tablet:px-10">
      <div class="text-center mb-8">
        <h2 class="text-3xl tablet:text-4xl font-extrabold text-gray-900 mb-2">
          Powerful Features
        </h2>
        <p class="text-gray-600">Everything you need to navigate and discover campus.</p>
      </div>

      <div class="grid grid-cols-3 gap-6 tablet:gap-8">
        <div
          class="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-200/50 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center justify-center h-12 w-12 bg-emerald-200 rounded-xl mb-4">
            <i class="fi fi-br-calendar text-lg text-emerald-700"></i>
          </div>
          <h3 class="font-semibold text-lg">Live Events</h3>
          <p class="text-gray-600 text-sm mt-2">
            Discover campus events and announcements in real-time.
          </p>
        </div>

        <div
          class="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/50 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center justify-center h-12 w-12 bg-blue-200 rounded-xl mb-4">
            <i class="fi fi-br-route text-lg text-blue-700"></i>
          </div>
          <h3 class="font-semibold text-lg">Smart Navigation</h3>
          <p class="text-gray-600 text-sm mt-2">
            Find any building or facility with turn-by-turn guidance.
          </p>
        </div>

        <div
          class="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200/50 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center justify-center h-12 w-12 bg-purple-200 rounded-xl mb-4">
            <i class="fi fi-br-bell text-lg text-purple-700"></i>
          </div>
          <h3 class="font-semibold text-lg">Real-Time Updates</h3>
          <p class="text-gray-600 text-sm mt-2">
            Instant notifications about campus activities and announcements.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeFeatures',
}
</script>

<script setup></script>
