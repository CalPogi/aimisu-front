<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <form @submit.prevent="submitForm">
        <div class="px-6 py-4 border-b">
          <h2 class="text-xl font-semibold">{{ title }}</h2>
        </div>
        <div class="px-6 py-4 space-y-4">
          <div v-for="field in fields" :key="field.name">
            <!-- Text -->
            <div v-if="field.type === 'text'">
              <label class="block text-sm font-medium mb-1">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <input
                v-model="formData[field.name]"
                type="text"
                :placeholder="field.placeholder"
                class="w-full px-3 py-2 border rounded-md"
                :required="field.required"
              />
            </div>

            <!-- Textarea -->
            <div v-else-if="field.type === 'textarea'">
              <label class="block text-sm font-medium mb-1">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <textarea
                v-model="formData[field.name]"
                :rows="field.rows || 3"
                class="w-full px-3 py-2 border rounded-md"
                :required="field.required"
              ></textarea>
            </div>

            <!-- Date Range Picker -->
            <div v-else-if="field.type === 'daterange'">
              <label class="block text-sm font-medium mb-1">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
              </label>
              <div class="flex items-center gap-2">
                <input
                  type="date"
                  v-model="formData[field.name].start"
                  class="px-3 py-2 border rounded-md"
                  required
                />
                <span>to</span>
                <input
                  type="date"
                  v-model="formData[field.name].end"
                  :min="formData[field.name].start"
                  class="px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <span v-if="isBackwardDate" class="text-xs text-red-600 mt-1 block">
                End date must be after or equal to start date.
              </span>
            </div>

            <!-- Daytimes -->
            <div v-else-if="field.type === 'daytimes' && dayList.length">
              <label class="block text-sm font-medium mb-1">{{ field.label }}</label>
              <div v-for="date in dayList" :key="date" class="mb-2">
                <div class="flex items-center gap-2">
                  <span class="text-sm">{{ date }}</span>
                  <input
                    type="time"
                    v-model="formData[field.name][date]"
                    class="px-2 py-1 border rounded"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- MapPicker Custom -->
            <MapPicker
              v-if="field.type === 'custom' && field.component === 'MapPicker'"
              v-model="formData[field.name]"
              :label="field.label"
            />
          </div>
        </div>
        <div class="px-6 py-4 border-t flex justify-end gap-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            :disabled="isBackwardDate"
          >
            {{ submitButtonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MapPicker from '@/components/map/MapPicker.vue'

export default {
  name: 'InputModal',
  components: {
    MapPicker,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    fields: {
      type: Array,
      default: () => [],
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
    submitButtonText: {
      type: String,
      default: 'Submit',
    },
  },
  emits: ['close', 'submit'],
  data() {
    return {
      formData: {},
    }
  },
  computed: {
    dayList() {
      const start = this.formData.dateRange?.start
      const end = this.formData.dateRange?.end
      if (!start || !end) return []

      const result = []
      let cur = new Date(start)
      const endDate = new Date(end)

      while (cur <= endDate) {
        result.push(cur.toISOString().slice(0, 10))
        cur.setDate(cur.getDate() + 1)
      }
      return result
    },
    isBackwardDate() {
      const start = this.formData.dateRange?.start
      const end = this.formData.dateRange?.end
      return start && end && new Date(end) < new Date(start)
    },
  },
  watch: {
    initialData: {
      handler(newVal) {
        this.formData = {
          dateRange: { start: '', end: '' },
          timeSlots: {},
          ...newVal,
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    submitForm() {
      if (this.isBackwardDate) return
      this.$emit('submit', this.formData)
    },
  },
}
</script>
