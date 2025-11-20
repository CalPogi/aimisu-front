<template>
  <div class="flex h-screen">
    <Sidebar class="w-64 flex-shrink-0" />

    <div class="bg-gray-100 rounded-3xl px-4 relative flex-1 overflow-hidden">
      <!-- Header -->
      <div class="absolute top-0 left-0 right-0 h-20 z-10">
        <AdminHeader
          class="h-full"
          :title="currentTitle"
          :user-name="userName"
          :user-role="userRole"
          :user-avatar="userAvatar"
          :notifications="notifications"
          :notification-count="notificationCount"
          :is-scrolled="isScrolled"
          @view-notifications="handleViewNotifications"
          @profile-settings="handleProfileSettings"
          @view-profile="handleViewProfile"
          @logout="handleLogout"
        />
      </div>

      <!-- Page Content -->
      <div
        class="h-full pt-20 rounded-tl-3xl rounded-bl-3xl overflow-auto scrollbar-hide"
        @scroll="handleScroll"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import AdminHeader from '@/components/header/Header.vue'
import api from '@/axios'

export default {
  name: 'AdminLayout',
  components: {
    Sidebar,
    AdminHeader,
  },

  setup() {
    const router = useRouter()
    const route = useRoute()

    // UI States
    const isScrolled = ref(false)

    // User Data
    const userName = ref('Admin')
    const userRole = ref('Admin')
    const userAvatar = ref('https://via.placeholder.com/40')

    // Notifications
    const notifications = ref([])
    const notificationCount = ref(0)

    // Page Title Based on Route Name
    const currentTitle = computed(() => {
      const name = route.name
      const titles = {
        'admin-dashboard': 'Dashboard',
        'admin-events': 'Events',
        'admin-announcements': 'Announcements',
        'admin-users': 'Users',
        'admin-analytics': 'Analytics',
      }
      return titles[name] || 'Dashboard'
    })

    // Load user data on mount
    onMounted(() => {
      const user = JSON.parse(localStorage.getItem('user_data')) || null

      if (user) {
        userName.value = user.name || 'Admin'
        userRole.value = user.role || 'Admin'
        userAvatar.value = user.avatar || 'https://via.placeholder.com/40'
      }
    })

    return {
      router,
      route,
      isScrolled,
      userName,
      userRole,
      userAvatar,
      notifications,
      notificationCount,
      currentTitle,
    }
  },

  methods: {
    handleScroll(e) {
      this.isScrolled = e.target.scrollTop > 10
    },

    handleViewNotifications() {
      console.log('View all notifications')
    },

    handleProfileSettings() {
      console.log('Profile settings')
    },

    handleViewProfile() {
      console.log('View profile')
    },

    async handleLogout() {
      try {
        await api.post('/logout')
      } catch (error) {
        console.warn('Logout request failed, continuing anyway.')
      }

      // Remove stored user data
      localStorage.removeItem('token')
      localStorage.removeItem('user_data')
      localStorage.removeItem('userRoles')

      this.router.push('/login')
    },
  },
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
