<template>
  <section
    class="relative w-full py-10 tablet:py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-6 tablet:px-10">
      <div class="grid grid-cols-2 gap-12 tablet:gap-16 items-center">
        <div class="flex justify-center tablet:justify-start">
          <div class="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
            <img
              src="https://i.pinimg.com/1200x/4b/85/c0/4b85c06914e07bb2e98a4d583529a857.jpg"
              alt="Interactive Campus Map"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <div class="flex flex-col gap-8">
          <div>
            <h2 class="text-4xl tablet:text-5xl font-extrabold text-gray-900 mb-4">
              Your Campus at Your Fingertips
            </h2>
            <p class="text-lg text-gray-600">
              Interactive mapping technology designed specifically for ISU Echague's multi-level
              administrative structure.
            </p>
          </div>

          <div class="space-y-3">
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-100">
                  <i class="fi fi-br-map-pin text-emerald-600 text-xl"></i>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Real-time Event Markers</h3>
                <p class="text-gray-600">See live events happening across campus instantly</p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-100">
                  <i class="fi fi-br-building text-emerald-600 text-xl"></i>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Building Navigation</h3>
                <p class="text-gray-600">Locate any facility, office, or classroom with ease</p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-100">
                  <i class="fi fi-br-search text-emerald-600 text-xl"></i>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Facility Search</h3>
                <p class="text-gray-600">Quick search for labs, libraries, and departments</p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-100">
                  <i class="fi fi-br-route text-emerald-600 text-xl"></i>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Turn-by-Turn Directions</h3>
                <p class="text-gray-600">Navigate campus with step-by-step guidance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeSecondSection',
}
</script>

<script setup></script>
