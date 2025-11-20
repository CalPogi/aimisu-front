<template>
  <div class="flex flex-col h-full w-[280px] bg-white rounded-2xl border border-gray-200">
    <!-- Header: Month & Navigation -->
    <div
      class="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-200 bg-gray-200"
    >
      <button
        class="w-9 h-9 flex items-center justify-center rounded-lg border-0 bg-gray-200 hover:bg-gray-300 transition-all text-gray-600 hover:text-gray-900 font-semibold"
        @click="prevWeek"
      >
        <i class="fi fi-rr-angle-left"></i>
      </button>
      <div class="flex-1 text-center">
        <h3 class="text-sm font-bold text-gray-900 m-0">{{ monthTitle }}</h3>
        <p class="text-xs text-gray-500 m-0 mt-0.5">{{ weekRange }}</p>
      </div>
      <button
        class="w-9 h-9 flex items-center justify-center rounded-lg border-0 bg-gray-200 hover:bg-gray-300 transition-all text-gray-600 hover:text-gray-900 font-semibold"
        @click="nextWeek"
      >
        <i class="fi fi-rr-angle-right"></i>
      </button>
    </div>

    <!-- Week Days with gradient indicator -->
    <div class="grid grid-cols-7 gap-1.5 px-2 py-2 border-b border-gray-200">
      <button
        v-for="(day, i) in weekDays"
        :key="i"
        @click="selectDay(day.date)"
        class="relative border-0 bg-white flex flex-col items-center justify-center h-[68px] py-2 px-2 rounded-xl transition-all duration-200 text-gray-700 hover:bg-gray-100"
        :class="{
          'bg-gradient-to-br from-gray-900 to-gray-800 text-teal-300 shadow-lg hover:shadow-xl':
            isToday(day.date),
          'bg-gradient-to-br from-teal-100 to-teal-50 text-teal-900 ring-2 ring-teal-400':
            isSameDay(day.date, selectedDay),
        }"
      >
        <span class="text-xs font-medium tracking-wide opacity-75">{{
          dayLabels[day.date.getDay()]
        }}</span>
        <span class="text-base font-bold leading-tight mt-1">{{ day.date.getDate() }}</span>
        <div v-if="hasDayEvents(day.date)" class="flex gap-0.5 mt-1">
          <span
            v-for="n in Math.min(getEventCount(day.date), 3)"
            :key="n"
            class="w-1 h-1 rounded-full bg-current opacity-60"
          ></span>
        </div>
      </button>
    </div>

    <!-- Selected Day Events with category grouping -->
    <div v-if="selectedDay" class="flex-1 flex flex-col overflow-hidden">
      <div class="px-5 py-3 bg-gray-200 border-b border-gray-200 flex-shrink-0">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-bold text-gray-900 m-0">{{ selectedDayFormatted }}</h4>
          <span class="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">{{
            selectedDayEvents.length
          }}</span>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
        <div
          v-if="selectedDayEvents.length === 0"
          class="flex flex-col items-center justify-center py-8 text-gray-400"
        >
          <div class="text-4xl mb-3 opacity-30">
            <i class="fi fi-rr-calendar"></i>
          </div>
          <p class="text-sm font-semibold text-gray-600 m-0">No events scheduled</p>
          <p class="text-xs text-gray-400 m-0 mt-1">You have a free day!</p>
        </div>

        <!-- Event categories -->
        <div v-for="category in eventCategories" :key="category" class="space-y-2">
          <h5 class="text-xs font-bold text-gray-600 uppercase tracking-wider m-0 mb-1">
            {{ category }}
          </h5>
          <div class="space-y-2">
            <div
              v-for="event in getCategoryEvents(category)"
              :key="event.id"
              class="relative flex gap-0 bg-gradient-to-br from-teal-50 to-white rounded-xl border border-teal-200 hover:border-teal-400 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-teal-100 hover:to-teal-50"
            >
              <div class="w-1 flex-shrink-0 bg-teal-300"></div>
              <div class="flex-1 p-2.5">
                <div class="flex items-center justify-between mb-2">
                  <div
                    class="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-teal-300 to-teal-600 text-white shadow-md"
                  >
                    <i :class="`fi fi-rr-${event.icon}`"></i>
                  </div>
                  <div
                    class="flex items-center gap-1.5 px-2.5 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-lg border border-teal-200"
                  >
                    <i class="fi fi-rr-clock text-xs text-teal-600"></i>
                    {{ event.time }}
                  </div>
                </div>
                <div class="pl-0">
                  <p class="text-sm font-bold text-teal-900 m-0 mb-0.5 leading-tight">
                    {{ event.title }}
                  </p>
                  <p class="text-xs text-teal-700 m-0 leading-snug">{{ event.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty calendar state -->
    <div v-else class="flex-1 flex flex-col items-center justify-center text-gray-400">
      <i class="fi fi-rr-calendar-check text-5xl mb-3 opacity-20"></i>
      <p class="text-sm text-gray-500 m-0">Select a day to view events</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    default: () => [],
  },
})

const today = new Date()
const selectedDay = ref(new Date())

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Get week start (Monday-based)
function getWeekStart(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff))
}

const currentWeekStart = ref(getWeekStart(today))

// Compute week days
const weekDays = computed(() => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentWeekStart.value)
    d.setDate(d.getDate() + i)
    return { date: new Date(d) }
  })
})

// Month title with year
const monthTitle = computed(() => {
  const d = currentWeekStart.value
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

// Week range (e.g., "14 - 20 Nov")
const weekRange = computed(() => {
  const days = weekDays.value
  if (days.length < 7) return ''
  const start = days[0].date
  const end = days[6].date
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()} - ${end.getDate()} ${end.toLocaleDateString('en-US', { month: 'short' })}`
  }
  return `${start.getDate()} ${start.toLocaleDateString('en-US', { month: 'short' })} - ${end.getDate()} ${end.toLocaleDateString('en-US', { month: 'short' })}`
})

// Selected day formatted
const selectedDayFormatted = computed(() => {
  return selectedDay.value.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
})

// Get events for selected day
const selectedDayEvents = computed(() => {
  return props.events
    .filter((event) => isSameDay(event.date, selectedDay.value))
    .sort((a, b) => {
      const timeA = new Date(`1970/01/01 ${a.time}`).getTime()
      const timeB = new Date(`1970/01/01 ${b.time}`).getTime()
      return timeA - timeB
    })
})

// Event categories
const eventCategories = computed(() => {
  const categories = new Set(selectedDayEvents.value.map((e) => e.category || 'General'))
  return Array.from(categories)
})

// Get events by category
const getCategoryEvents = (category) => {
  return selectedDayEvents.value.filter((e) => (e.category || 'General') === category)
}

// Check if day has events
const hasDayEvents = (date) => {
  return props.events.some((event) => isSameDay(event.date, date))
}

// Get event count
const getEventCount = (date) => {
  return props.events.filter((event) => isSameDay(event.date, date)).length
}

// Navigation
function nextWeek() {
  currentWeekStart.value = new Date(
    currentWeekStart.value.setDate(currentWeekStart.value.getDate() + 7),
  )
}

function prevWeek() {
  currentWeekStart.value = new Date(
    currentWeekStart.value.setDate(currentWeekStart.value.getDate() - 7),
  )
}

// Helpers
function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isToday(date) {
  return isSameDay(date, today)
}

function selectDay(date) {
  selectedDay.value = new Date(date)
}
</script>

<style scoped>
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
