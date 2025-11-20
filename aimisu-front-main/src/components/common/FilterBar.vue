<template>
  <select
    v-model="localValue"
    class="border border-gray-300 px-3 py-2 rounded text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
    @change="$emit('update:modelValue', localValue)"
  >
    <option value="">All</option>
    <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
  </select>
</template>

<script>
export default {
  name: 'FilterSelect',
  props: {
    modelValue: { type: String, default: '' },
    options: { type: Array, default: () => [] },
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
