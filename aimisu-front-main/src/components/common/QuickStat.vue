<template>
  <div
    class="rounded-2xl border shadow-sm w-full h-full hover:shadow-md transition-all duration-300 flex flex-col"
    :class="[
      sizeClasses,
      variantClasses,
    ]"
  >
    <!-- Header with Icon -->
    <div class="flex items-center gap-3 mb-4">
      <div class="w-8 h-8 rounded-lg flex items-center justify-center text-lg" :class="iconColorClasses">
        <i :class="`fi fi-rr-${icon}`"></i>
      </div>
      <span class="font-semibold text-gray-700 text-sm">{{ title }}</span>
    </div>

    <!-- Value -->
    <div class="flex-1 mb-4">
      <div class="text-3xl font-bold text-gray-900 mb-1">{{ formattedValue }}</div>
      <p class="text-xs text-gray-500">{{ label }}</p>
    </div>

    <!-- Optional Trend/Change -->
    <div v-if="showTrend" class="flex items-center gap-1 text-sm font-semibold mb-3" :class="trendClasses">
      <i :class="`fi fi-rr-arrow-${trend > 0 ? 'up' : 'down'}`" class="text-xs"></i>
      <span>{{ Math.abs(trend) }}%</span>
    </div>

    <!-- Action Link -->
    <div v-if="actionLabel && actionLink" class="mt-auto pt-3 border-t border-gray-100">
      <router-link :to="actionLink" class="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2 transition-colors hover:underline">
        {{ actionLabel }}
        <i class="fi fi-rr-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String,
    default: 'teal',
    validator: (value) => ['teal', 'blue', 'green', 'orange', 'red', 'purple'].includes(value),
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'warning', 'danger'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  trend: {
    type: Number,
    default: 0,
  },
  showTrend: {
    type: Boolean,
    default: false,
  },
  format: {
    type: String,
    default: 'number',
    validator: (value) => ['number', 'currency', 'percentage'].includes(value),
  },
  actionLabel: {
    type: String,
    default: '',
  },
  actionLink: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

// Format value based on type
const formattedValue = computed(() => {
  if (props.isLoading) return '...'

  const val = Number(props.value)

  if (props.format === 'currency') {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(val)
  }

  if (props.format === 'percentage') return `${val}%`

  return new Intl.NumberFormat('en-US').format(val)
})

// Card styling
const sizeClasses = computed(() => {
  const sizeMap = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  }
  return sizeMap[props.size]
})

const variantClasses = computed(() => {
  const variantMap = {
    default: 'bg-white border-gray-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-orange-50 border-orange-200',
    danger: 'bg-red-50 border-red-200',
  }
  return variantMap[props.variant]
})

// Trend styling
const trendClasses = computed(() => (props.trend > 0 ? 'text-green-600' : 'text-red-600'))

// Icon color mapping
const iconColorClasses = computed(() => {
  const colorMap = {
    teal: 'bg-teal-100 text-teal-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
  }
  return colorMap[props.iconColor]
})
</script>

