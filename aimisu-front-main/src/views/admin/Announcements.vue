<template>
  <div class="flex gap-4" style="height: calc(100vh - 120px)">
    <!-- Left: Data Table -->
    <div class="flex-1">
      <DataTable
        title="Announcements"
        :columns="columns"
        :rows="announcements"
        :selected-row-id="selectedAnnouncement?.id"
        empty-message="No announcements found"
        @row-click="handleRowClick"
        @add-new="handleAddNew"
        @toggle-filter="toggleFilter"
      />
    </div>

    <!-- Right: Detail Panel -->
    <div class="w-96 flex-shrink-0">
      <DetailPanel title="Announcement Details" :data="selectedAnnouncement">
        <div v-if="selectedAnnouncement" class="space-y-6">
          <!-- Announcement Information -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Announcement Information
            </h4>
            <div class="space-y-3">
              <div>
                <label class="text-xs font-medium text-gray-500">Title</label>
                <p class="text-sm text-gray-900 mt-1 font-medium">
                  {{ selectedAnnouncement.title }}
                </p>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Content</label>
                <p class="text-sm text-gray-900 mt-1 whitespace-pre-wrap">
                  {{ selectedAnnouncement.content }}
                </p>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-medium text-gray-500">Priority</label>
                  <p class="text-sm mt-1">
                    <span :class="getPriorityClass(selectedAnnouncement.priority)">{{
                      selectedAnnouncement.priority
                    }}</span>
                  </p>
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-500">Status</label>
                  <p class="text-sm mt-1">
                    <span :class="getStatusClass(selectedAnnouncement.status)">{{
                      selectedAnnouncement.status
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Publishing Information -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Publishing Details
            </h4>
            <div class="space-y-3">
              <div>
                <label class="text-xs font-medium text-gray-500">Author</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedAnnouncement.author }}</p>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Department</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedAnnouncement.department }}</p>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-medium text-gray-500">Created</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedAnnouncement.createdAt }}</p>
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-500">Published</label>
                  <p class="text-sm text-gray-900 mt-1">
                    {{ selectedAnnouncement.publishedAt || 'Not yet' }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Audience & Reach -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Audience & Reach
            </h4>
            <div class="space-y-3">
              <div>
                <label class="text-xs font-medium text-gray-500">Target Audience</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedAnnouncement.audience }}</p>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-medium text-gray-500">Views</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedAnnouncement.views }}</p>
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-500">Engagement</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedAnnouncement.engagement }}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center gap-3">
            <button
              @click="handleEdit(selectedAnnouncement)"
              class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <i class="fi fi-br-pencil text-sm"></i>
              Edit
            </button>
            <button
              @click="handleDelete(selectedAnnouncement)"
              class="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <i class="fi fi-br-trash text-sm"></i>
              Delete
            </button>
          </div>
        </template>
      </DetailPanel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminAnnouncements',
}
</script>

<script setup>
import { ref } from 'vue'
import DataTable from '@/components/table/DataTable.vue'
import DetailPanel from '@/components/common/DetailPanel.vue'

const selectedAnnouncement = ref(null)

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
  { key: 'department', label: 'Department' },
  { key: 'priority', label: 'Priority' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Created' },
]

const announcements = ref([
  {
    id: 1,
    title: 'Campus Closure for Holiday',
    content:
      'The campus will be closed on December 25-26 for the Christmas holiday. All offices will resume normal operations on December 27.',
    author: 'Admin Office',
    department: 'Administration',
    priority: 'High',
    status: 'Approved',
    audience: 'All Students & Staff',
    views: 1250,
    engagement: 85,
    createdAt: '2025-11-10',
    publishedAt: '2025-11-12',
  },
  {
    id: 2,
    title: 'New Library Hours',
    content:
      'The university library will extend its hours starting December 1. New hours: Mon-Fri 7:00 AM - 10:00 PM, Sat-Sun 9:00 AM - 6:00 PM.',
    author: 'Library Services',
    department: 'Library',
    priority: 'Medium',
    status: 'Pending',
    audience: 'All Students',
    views: 0,
    engagement: 0,
    createdAt: '2025-11-15',
    publishedAt: null,
  },
  {
    id: 3,
    title: 'Scholarship Application Deadline',
    content:
      'Reminder: The deadline for scholarship applications for the Spring 2026 semester is December 15, 2025. Submit your applications online.',
    author: 'Financial Aid',
    department: 'Student Services',
    priority: 'High',
    status: 'Approved',
    audience: 'Undergraduate Students',
    views: 890,
    engagement: 72,
    createdAt: '2025-11-05',
    publishedAt: '2025-11-06',
  },
])

const handleRowClick = (row) => {
  selectedAnnouncement.value = row
}

const handleEdit = (row) => {
  console.log('Edit announcement:', row)
}

const handleDelete = (row) => {
  console.log('Delete announcement:', row)
}

const handleAddNew = () => {
  console.log('Add new announcement')
}

const toggleFilter = () => {
  console.log('Toggle filter')
}

const getStatusClass = (status) => {
  const statusLower = status?.toLowerCase()
  if (statusLower === 'pending')
    return 'inline-block px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700'
  if (statusLower === 'approved' || statusLower === 'active')
    return 'inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700'
  if (statusLower === 'rejected' || statusLower === 'inactive')
    return 'inline-block px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700'
  return 'inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700'
}

const getPriorityClass = (priority) => {
  const priorityLower = priority?.toLowerCase()
  if (priorityLower === 'high')
    return 'inline-block px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700'
  if (priorityLower === 'medium')
    return 'inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700'
  if (priorityLower === 'low')
    return 'inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700'
  return 'inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700'
}
</script>
