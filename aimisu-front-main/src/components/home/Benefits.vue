<template>
  <section
    id="benefits"
    class="relative w-full py-10 tablet:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-6 tablet:px-10">
      <!-- Section Header -->
      <div class="text-center mb-12 tablet:mb-16">
        <h2 class="text-3xl tablet:text-4xl font-extrabold text-gray-900 mb-3">
          Built for the Entire Campus Community
        </h2>
        <p class="text-lg text-gray-600">Designed with every stakeholder in mind</p>
      </div>

      <div class="grid grid-cols-3 gap-8 tablet:gap-10">
        <div class="bg-white p-6 rounded-2xl shadow-sm">
          <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-100 mb-4">
            <i class="fi fi-br-user text-emerald-600"></i>
          </div>
          <h3 class="font-semibold text-lg text-gray-900">Students</h3>
          <p class="text-gray-600 text-sm mt-2">
            Personal campus guide, real-time maps, and event discovery.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm">
          <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100 mb-4">
            <i class="fi fi-br-users text-purple-600"></i>
          </div>
          <h3 class="font-semibold text-lg text-gray-900">Organizations</h3>
          <p class="text-gray-600 text-sm mt-2">
            Promote events, engage students, and manage attendees.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm">
          <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-100 mb-4">
            <i class="fi fi-br-map text-emerald-600"></i>
          </div>
          <h3 class="font-semibold text-lg text-gray-900">Administrators</h3>
          <p class="text-gray-600 text-sm mt-2">
            Facilities monitoring, announcements, and campus safety tools.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeBenefits',
}
</script>

<script setup></script>
