<template>
  <div class="flex gap-4" style="height: calc(100vh - 120px)">
    <!-- Left: Data Table -->
    <div class="flex-1">
      <DataTable
        title="Organizations"
        :columns="columns"
        :rows="organizations"
        :selected-row-id="selectedOrganization?.id"
        empty-message="No organizations found"
        @row-click="handleRowClick"
        @add-new="handleAddNew"
        @toggle-filter="toggleFilter"
      />
    </div>

    <!-- Right: Detail Panel -->
    <div class="w-96 flex-shrink-0">
      <DetailPanel title="Organization Details" :data="selectedOrganization">
        <div v-if="selectedOrganization" class="space-y-6">
          <!-- Organization Logo -->
          <div class="flex justify-center">
            <div
              class="w-24 h-24 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
            >
              {{ selectedOrganization.name.charAt(0) }}
            </div>
          </div>

          <!-- Organization Information -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Organization Information
            </h4>
            <div class="space-y-3">
              <div>
                <label class="text-xs font-medium text-gray-500">Organization Name</label>
                <p class="text-sm text-gray-900 mt-1 font-medium">
                  {{ selectedOrganization.name }}
                </p>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Acronym</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedOrganization.acronym }}</p>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Description</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedOrganization.description }}</p>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-medium text-gray-500">Type</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedOrganization.type }}</p>
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-500">Status</label>
                  <p class="text-sm mt-1">
                    <span :class="getStatusClass(selectedOrganization.status)">{{
                      selectedOrganization.status
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Leadership Information -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Leadership
            </h4>
            <div class="space-y-3">
              <div>
                <label class="text-xs font-medium text-gray-500">President</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedOrganization.president }}</p>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Adviser</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedOrganization.adviser }}</p>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Contact Email</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedOrganization.email }}</p>
              </div>
            </div>
          </div>

          <!-- Statistics -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Statistics
            </h4>
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-medium text-gray-500">Members</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedOrganization.members }}</p>
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-500">Events Hosted</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedOrganization.eventsHosted }}</p>
                </div>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Established</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedOrganization.established }}</p>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center gap-3">
            <button
              @click="handleEdit(selectedOrganization)"
              class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <i class="fi fi-br-pencil text-sm"></i>
              Edit
            </button>
            <button
              @click="handleDelete(selectedOrganization)"
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
  name: 'AdminOrganizations',
}
</script>

<script setup>
import { ref } from 'vue'
import DataTable from '@/components/table/DataTable.vue'
import DetailPanel from '@/components/common/DetailPanel.vue'

const selectedOrganization = ref(null)

const columns = [
  { key: 'name', label: 'Organization Name' },
  { key: 'acronym', label: 'Acronym' },
  { key: 'type', label: 'Type' },
  { key: 'president', label: 'President' },
  { key: 'members', label: 'Members' },
  { key: 'status', label: 'Status' },
]

const organizations = ref([
  {
    id: 1,
    name: 'Computer Science Society',
    acronym: 'CSS',
    description: 'Organization for Computer Science students promoting technology and innovation.',
    type: 'Academic',
    president: 'John Doe',
    adviser: 'Dr. Jane Smith',
    email: 'css@isu.edu.ph',
    members: 150,
    eventsHosted: 12,
    status: 'Active',
    established: '2010-09-15',
  },
  {
    id: 2,
    name: 'Student Government Association',
    acronym: 'SGA',
    description: 'Main student governing body representing all students.',
    type: 'Governance',
    president: 'Maria Garcia',
    adviser: 'Prof. Robert Lee',
    email: 'sga@isu.edu.ph',
    members: 50,
    eventsHosted: 25,
    status: 'Active',
    established: '2005-06-01',
  },
  {
    id: 3,
    name: 'Engineering Club',
    acronym: 'EC',
    description: 'Organization dedicated to engineering students and projects.',
    type: 'Academic',
    president: 'Carlos Santos',
    adviser: 'Engr. Anna Cruz',
    email: 'ec@isu.edu.ph',
    members: 200,
    eventsHosted: 8,
    status: 'Active',
    established: '2012-08-20',
  },
  {
    id: 4,
    name: 'Arts and Culture Society',
    acronym: 'ACS',
    description: 'Promoting arts, culture, and creative expression.',
    type: 'Cultural',
    president: 'Lisa Reyes',
    adviser: 'Ms. Patricia Ramos',
    email: 'acs@isu.edu.ph',
    members: 80,
    eventsHosted: 15,
    status: 'Inactive',
    established: '2015-03-10',
  },
])

const handleRowClick = (row) => {
  selectedOrganization.value = row
}

const handleEdit = (row) => {
  console.log('Edit organization:', row)
}

const handleDelete = (row) => {
  console.log('Delete organization:', row)
}

const handleAddNew = () => {
  console.log('Add new organization')
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
</script>
