<template>
  <div class="relative w-56">
    <input
      v-model="localValue"
      type="text"
      class="border border-gray-300 px-3 py-2 rounded text-xs w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', localValue)"
    />
    <i class="fi fi-rr-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
  </div>
</template>

<script>
export default {
  name: 'SearchbBar',
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: 'Search...' },
  },
  data() {
    return { localValue: this.modelValue }
  },
  watch: {
    modelValue(val) {
      this.localValue = val
    },
  },
}
</script>
