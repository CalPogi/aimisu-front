<template>
  <div class="relative z-1 h-full w-full bg-gradient-to-r from-teal-400 to-orange-300 rounded-2xl p-8 flex items-center justify-between overflow-hidden shadow-lg min-h-[180px]">
    <!-- Left Content -->
    <div class="flex-1 flex flex-col gap-3 z-10">
      <p class="text-xl font-bold text-white">
        {{ greeting }}, <span class="font-extrabold">{{ userName }}</span>
      </p>
      <p class="text-sm text-white/90 leading-relaxed max-w-xs">{{ dailyQuote }}</p>
      <p class="text-xs text-white/80 font-medium">{{ formattedDate }} • {{ currentTime }}</p>
    </div>

    <!-- Right Illustration -->
    <div class="absolute -right-10 -bottom-10 w-64 h-64 flex-shrink-0 z-0">
      <img :src="illustrationUrl" :alt="greeting" class="w-full h-full pr-10 object-contain z-0" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  userName: {
    type: String,
    default: 'User',
  },
  dailyQuote: {
    type: String,
    default: 'Have a great day ahead!',
  },
  illustrationUrl: {
    type: String,
    default: 'https://via.placeholder.com/300',
  },
})

const currentTime = ref('')
const formattedDate = ref('')
let intervalId = null

// Get current hour for time-based logic
const getCurrentHour = () => new Date().getHours()

// Determine greeting based on time of day
const greeting = computed(() => {
  const hour = getCurrentHour()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
})

// Update time and date
const updateDateTime = () => {
  const now = new Date()

  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  formattedDate.value = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(() => {
  updateDateTime()
  intervalId = setInterval(updateDateTime, 60000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

