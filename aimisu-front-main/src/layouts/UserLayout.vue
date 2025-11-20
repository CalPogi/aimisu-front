<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="bg-gradient-to-br from-blue-600 to-purple-700 text-white px-8 py-6 shadow-md flex justify-between items-center"
    >
      <div>
        <h1 class="text-3xl font-bold m-0">Aimisu</h1>
      </div>
      <nav class="flex gap-8 items-center">
        <router-link
          to="/user/dashboard"
          class="text-white no-underline font-medium hover:opacity-80 transition py-2 px-4 rounded"
          active-class="bg-white/20"
          >Dashboard</router-link
        >
        <router-link
          to="/user/events"
          class="text-white no-underline font-medium hover:opacity-80 transition py-2 px-4 rounded"
          active-class="bg-white/20"
          >Events</router-link
        >
        <router-link
          to="/user/announcements"
          class="text-white no-underline font-medium hover:opacity-80 transition py-2 px-4 rounded"
          active-class="bg-white/20"
          >Announcements</router-link
        >
        <router-link
          to="/user/profile"
          class="text-white no-underline font-medium hover:opacity-80 transition py-2 px-4 rounded"
          active-class="bg-white/20"
          >Profile</router-link
        >
        <button
          @click="handleLogout"
          class="bg-white text-blue-600 border-none py-2 px-6 rounded cursor-pointer font-bold transition hover:-translate-y-1"
        >
          Logout
        </button>
      </nav>
    </header>

    <main class="flex-1 px-8 py-8 max-w-6xl mx-auto w-full">
      <router-view />
    </main>

    <footer class="bg-slate-800 text-white text-center py-8 mt-auto">
      <p>&copy; 2025 Aimisu. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { logout } from '@/middleware/authMiddleware'
import { apiPost } from '@/utils/api'

const router = useRouter()

const handleLogout = async () => {
  try {
    await apiPost('/logout')
  } catch (err) {
    console.error('Logout error:', err)
  } finally {
    logout()
    router.push('/')
  }
}
</script>
