<template>
  <div class="flex flex-col gap-8">
    <h1 class="m-0 text-slate-800">Welcome, {{ userName }}!</h1>

    <div class="grid grid-cols-1 tablet:grid-cols-3 gap-8">
      <div class="bg-white p-8 rounded-lg shadow-sm">
        <h3 class="mt-0 text-blue-600">📅 Upcoming Events</h3>
        <p class="text-gray-600 m-0">No upcoming events</p>
      </div>
      <div class="bg-white p-8 rounded-lg shadow-sm">
        <h3 class="mt-0 text-blue-600">📢 Latest Announcements</h3>
        <p class="text-gray-600 m-0">No announcements</p>
      </div>
      <div class="bg-white p-8 rounded-lg shadow-sm">
        <h3 class="mt-0 text-blue-600">👤 Your Profile</h3>
        <p class="text-gray-600 m-0">View and edit your profile information</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDashboard',
}
</script>

<script setup>
import { ref, onMounted } from 'vue'
import { getCurrentUser } from '@/middleware/authMiddleware'

const userName = ref('User')

onMounted(() => {
  const user = getCurrentUser()
  if (user) {
    userName.value = user.name || 'User'
  }
})
</script>
