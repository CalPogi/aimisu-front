<template>
  <div class="relative">
    <button
      class="relative border-0 bg-transparent p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
      @click="toggleDropdown"
    >
      <i class="fi fi-rr-bell text-xl"></i>
      <span
        v-if="notificationCount > 0"
        class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
      >
        {{ notificationCount > 9 ? '9+' : notificationCount }}
      </span>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
    >
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-sm font-semibold text-gray-900">Notifications</h3>
        <button
          class="text-xs border-0 bg-transparent text-teal-600 hover:text-teal-700 font-medium"
          @click="$emit('view-all')"
        >
          View All
        </button>
      </div>
      <div v-if="notifications.length === 0" class="p-4 text-sm text-gray-500 text-center">
        No notifications
      </div>
      <div v-else class="divide-y divide-gray-100">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="p-4 hover:bg-gray-50 cursor-pointer"
        >
          <p class="text-sm text-gray-900">{{ notification.message }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ notification.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  notifications: {
    type: Array,
    default: () => [],
  },
  notificationCount: {
    type: Number,
    default: 0,
  },
})

defineEmits(['view-all'])

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = (e) => {
  if (!e.target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>
