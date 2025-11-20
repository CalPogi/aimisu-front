<template>
  <section
    id="how-it-works"
    class="relative w-full py-20 tablet:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-6 tablet:px-10">
      <!-- Section Header -->
      <div class="text-center mb-12 tablet:mb-16">
        <h2 class="text-3xl tablet:text-4xl font-extrabold text-gray-900 mb-4">
          Get Started in Three Simple Steps
        </h2>
        <p class="text-lg text-gray-600">
          Start navigating ISU Echague campus like a pro in minutes.
        </p>
      </div>

      <!-- Steps Grid -->
      <div class="grid grid-cols-3 gap-6 tablet:gap-8">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <div
            class="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mx-auto mb-4"
          >
            <i class="fi fi-br-user text-2xl text-emerald-600"></i>
          </div>
          <h3 class="text-xl font-bold">Sign In</h3>
          <p class="text-gray-600 mt-2">Use your university email to access AimISU quickly.</p>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <div
            class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mx-auto mb-4"
          >
            <i class="fi fi-br-map text-2xl text-blue-600"></i>
          </div>
          <h3 class="text-xl font-bold">Explore Map</h3>
          <p class="text-gray-600 mt-2">
            Browse the interactive campus map to find locations and events.
          </p>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <div
            class="flex items-center justify-center h-16 w-16 rounded-full bg-purple-50 mx-auto mb-4"
          >
            <i class="fi fi-br-bell text-2xl text-purple-600"></i>
          </div>
          <h3 class="text-xl font-bold">Discover</h3>
          <p class="text-gray-600 mt-2">Find events and get directions to any campus spot.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeSteps',
}
</script>

<script setup></script>
