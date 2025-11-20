<template>
  <div class="profile-dropdown relative">
    <button
      class="border-0 bg-transparent flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
      @click.stop="toggleDropdown"
    >
      <img :src="userAvatar" :alt="userName" class="w-8 h-8 rounded-full" />
      <div class="flex flex-col items-start">
        <span class="text-sm font-medium text-gray-900">{{ userName }}</span>
        <span class="text-xs text-gray-500">{{ userRole }}</span>
      </div>
      <i class="fi fi-rr-angle-down text-xs"></i>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-56 rounded-xl shadow-lg border border-gray-200 z-50"
    >
      <div class="p-4 bg-gray-50 border-b border-gray-200">
        <p class="text-sm font-semibold text-gray-900">{{ userName }}</p>
        <p class="text-xs text-gray-500">{{ userRole }}</p>
      </div>

      <div class="py-2 bg-white">
        <button
          class="w-full bg-white border-0 text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          @click="settings"
        >
          <i class="fi fi-rr-settings mr-2"></i> Settings
        </button>

        <button
          class="w-full bg-white border-0 text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          @click="profile"
        >
          <i class="fi fi-rr-user mr-2"></i> Profile
        </button>

        <button
          class="w-full bg-white border-0 text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          @click="logout"
        >
          <i class="fi fi-rr-sign-out mr-2"></i> Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userName', 'userRole', 'userAvatar'],
  emits: ['settings', 'profile', 'logout'],

  data() {
    return { isOpen: false }
  },

  mounted() {
    document.addEventListener('click', this.closeDropdown)
  },
  unmounted() {
    document.removeEventListener('click', this.closeDropdown)
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },

    closeDropdown(e) {
      if (!e.target.closest('.profile-dropdown')) {
        this.isOpen = false
      }
    },

    settings() {
      this.$emit('settings')
      this.isOpen = false
    },

    profile() {
      this.$emit('profile')
      this.isOpen = false
    },

    logout() {
      this.$emit('logout')
      this.isOpen = false
    },
  },
}
</script>
