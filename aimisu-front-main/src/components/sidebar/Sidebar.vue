<template>
  <div class="flex flex-col h-screen w-64 bg-white border-r border-gray-200 py-4">
    <!-- Logo -->
    <div class="flex justify-start items-center mb-13 mt-5 px-6">
      <img src="@/assets/images/logo/logo-text.png" alt="Aimisu" class="h-10 drop-shadow-lg" />
    </div>

    <!-- Menu Items -->
    <div class="flex-1 flex flex-col gap-2 px-3 overflow-y-auto">
      <!-- Single menu items -->
      <router-link
        v-for="item in singleMenuItems"
        :key="item.route"
        :to="`${basePath}/${item.route}`"
        class="flex items-center gap-3 px-6 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-600 no-underline transition-all duration-200 font-semibold text-sm rounded-lg"
        :class="{
          'bg-teal-50 text-teal-600 border-l-4 border-teal-500 pl-5': isActive(item.route),
        }"
      >
        <i :class="`fi fi-rr-${item.icon}`" class="w-5 h-5 flex-shrink-0"></i>
        <span>{{ item.label }}</span>
      </router-link>

      <!-- Section menu items (with subsections) -->
      <div v-for="section in sectionMenuItems" :key="section.name" class="flex flex-col">
        <button
          class="flex items-center gap-3 px-6 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-600 bg-transparent border-none cursor-pointer transition-all duration-200 font-semibold text-sm rounded-lg w-full text-left"
          @click="toggleSection(section.name)"
        >
          <i :class="`fi fi-rr-${section.icon}`" class="w-5 h-5 flex-shrink-0"></i>
          <span>{{ section.label }}</span>
          <i
            class="fi fi-rr-angle-right ml-auto text-sm transition-transform duration-300"
            :class="{ 'rotate-90': openSections.includes(section.name) }"
          ></i>
        </button>

        <!-- Subsections -->
        <div v-if="openSections.includes(section.name)" class="flex flex-col gap-1 pl-4 mt-1 mb-1">
          <router-link
            v-for="subitem in section.items"
            :key="subitem.route"
            :to="`${basePath}/${subitem.route}`"
            class="flex items-center px-4 py-2 text-sm text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg no-underline"
            :class="{
              'border-l-4 border-teal-500 pl-3 text-teal-600': isActive(subitem.route),
            }"
          >
            <span>{{ subitem.label }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar',
}
</script>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const openSections = ref([])

defineProps({
  basePath: {
    type: String,
    default: '/admin',
  },
  singleMenuItems: {
    type: Array,
    default: () => [{ label: 'Dashboard', route: 'dashboard', icon: 'chart-pie' }],
  },
  sectionMenuItems: {
    type: Array,
    default: () => [
      {
        name: 'management',
        label: 'Management',
        icon: 'briefcase',
        items: [
          { label: 'Events', route: 'events' },
          { label: 'Announcements', route: 'announcements' },
          { label: 'Users', route: 'users' },
        ],
      },
      {
        name: 'structure',
        label: 'Structure',
        icon: 'building',
        items: [
          { label: 'Organizations', route: 'organizations' },
          { label: 'Departments', route: 'departments' },
        ],
      },
      {
        name: 'settings',
        label: 'Settings',
        icon: 'gear',
        items: [
          { label: 'Roles & Permissions', route: 'roles' },
          { label: 'System Settings', route: 'system-settings' },
        ],
      },
    ],
  },
})

const isActive = (itemRoute) => route.path.includes(itemRoute)

const toggleSection = (sectionName) => {
  const index = openSections.value.indexOf(sectionName)
  if (index > -1) {
    openSections.value.splice(index, 1)
  } else {
    openSections.value.push(sectionName)
  }
}
</script>
