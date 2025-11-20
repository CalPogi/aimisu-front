<template>
  <div
    class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col"
  >
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-6">
      <div v-if="!data" class="text-center text-gray-500">
        <p class="text-sm">{{ emptyMessage }}</p>
      </div>

      <template v-else>
        <div v-for="section in schema" :key="section.title" class="mb-6 last:mb-0">
          <div class="space-y-3">
            <div v-for="field in section.fields" :key="field.key">
              <label class="text-xs font-medium text-gray-500">{{ field.label }}</label>
              <p class="text-sm text-gray-900 mt-1">
                {{ field.render ? field.render(data[field.key], data) : (data[field.key] ?? '-') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div
          v-if="$slots.default"
          class="mt-8 pt-6 border-t border-gray-200 flex gap-3 justify-end"
        >
          <slot />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Details' },
  data: { type: Object, default: null },
  schema: { type: Array, default: () => [] },
  emptyMessage: { type: String, default: 'Select an item to view details' },
})
</script>
