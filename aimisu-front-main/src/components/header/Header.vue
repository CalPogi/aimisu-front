<template>
  <header class="w-full h-full flex items-center justify-between px-8 bg-transparent transition-all duration-300" :class="{ 'backdrop-blur-md bg-white/70 shadow-sm': isScrolled }">
    <!-- Left side: Dynamic title -->
    <div class="flex items-center">
      <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
    </div>

    <!-- Right side: Notifications and Profile -->
    <div class="flex items-center gap-2">
      <NotificationDropdown
        :notifications="notifications"
        :notification-count="notificationCount"
        @view-all="$emit('view-notifications')"
      />

      <div class="h-6 w-px bg-gray-200"></div>

      <ProfileDropdown
        :user-name="userName"
        :user-role="userRole"
        :user-avatar="userAvatar"
        @settings="$emit('profile-settings')"
        @profile="$emit('view-profile')"
        @logout="$emit('logout')"
      />
    </div>
  </header>
</template>

<script setup>
import NotificationDropdown from '@/components/common/Notification.vue'
import ProfileDropdown from '@/components/common/Profile.vue'

defineProps({
  title: {
    type: String,
    default: 'Dashboard',
  },
  userName: {
    type: String,
    default: 'User Name',
  },
  userRole: {
    type: String,
    default: 'User',
  },
  userAvatar: {
    type: String,
    default: 'https://via.placeholder.com/40',
  },
  notifications: {
    type: Array,
    default: () => [],
  },
  notificationCount: {
    type: Number,
    default: 0,
  },
  isScrolled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['view-notifications', 'profile-settings', 'view-profile', 'logout'])
</script>

