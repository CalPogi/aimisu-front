<template>
  <div class="flex gap-4" style="height: calc(100vh - 120px)">
    <!-- Left: Data Table -->
    <div class="flex-1">
      <DataTable
        title="Users"
        :columns="columns"
        :rows="users"
        :selected-row-id="selectedUser?.id"
        empty-message="No users found"
        @row-click="handleRowClick"
        @add-new="handleAddNew"
        @toggle-filter="toggleFilter"
      />
    </div>

    <!-- Right: Detail Panel -->
    <div class="w-96 flex-shrink-0">
      <DetailPanel title="User Details" :data="selectedUser">
        <div v-if="selectedUser" class="space-y-6">
          <!-- Profile Picture -->
          <div class="flex justify-center">
            <div
              class="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold"
            >
              {{ selectedUser.name.charAt(0) }}
            </div>
          </div>

          <!-- User Information -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Personal Information
            </h4>
            <div class="space-y-3">
              <div>
                <label class="text-xs font-medium text-gray-500">Full Name</label>
                <p class="text-sm text-gray-900 mt-1 font-medium">{{ selectedUser.name }}</p>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Email</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedUser.email }}</p>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-medium text-gray-500">Role</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedUser.role }}</p>
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-500">Status</label>
                  <p class="text-sm mt-1">
                    <span :class="getStatusClass(selectedUser.status)">{{
                      selectedUser.status
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Academic Information -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Academic Information
            </h4>
            <div class="space-y-3">
              <div>
                <label class="text-xs font-medium text-gray-500">Student ID</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedUser.studentId }}</p>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Department</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedUser.department }}</p>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-medium text-gray-500">Year Level</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedUser.yearLevel }}</p>
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-500">Program</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedUser.program }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Details -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Account Details
            </h4>
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-medium text-gray-500">Joined</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedUser.joinedAt }}</p>
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-500">Last Login</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedUser.lastLogin }}</p>
                </div>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Events Attended</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedUser.eventsAttended }}</p>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center gap-3">
            <button
              @click="handleEdit(selectedUser)"
              class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <i class="fi fi-br-pencil text-sm"></i>
              Edit
            </button>
            <button
              @click="handleDelete(selectedUser)"
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
  name: 'AdminUsers',
}
</script>

<script setup>
import { ref } from 'vue'
import DataTable from '@/components/table/DataTable.vue'
import DetailPanel from '@/components/common/DetailPanel.vue'

const selectedUser = ref(null)

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'studentId', label: 'Student ID' },
  { key: 'department', label: 'Department' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
]

const users = ref([
  {
    id: 1,
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@isu.edu.ph',
    studentId: '2021-00001',
    department: 'Computer Science',
    yearLevel: '3rd Year',
    program: 'BS Computer Science',
    role: 'Student',
    status: 'Active',
    joinedAt: '2021-08-15',
    lastLogin: '2025-11-17',
    eventsAttended: 15,
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@isu.edu.ph',
    studentId: '2022-00045',
    department: 'Engineering',
    yearLevel: '2nd Year',
    program: 'BS Civil Engineering',
    role: 'Student',
    status: 'Active',
    joinedAt: '2022-08-20',
    lastLogin: '2025-11-16',
    eventsAttended: 8,
  },
  {
    id: 3,
    name: 'Dr. Roberto Garcia',
    email: 'roberto.garcia@isu.edu.ph',
    studentId: 'FAC-2015-001',
    department: 'Computer Science',
    yearLevel: 'Faculty',
    program: 'Professor',
    role: 'Faculty',
    status: 'Active',
    joinedAt: '2015-06-01',
    lastLogin: '2025-11-17',
    eventsAttended: 45,
  },
  {
    id: 4,
    name: 'Anna Reyes',
    email: 'anna.reyes@isu.edu.ph',
    studentId: '2023-00120',
    department: 'Education',
    yearLevel: '1st Year',
    program: 'BS Elementary Education',
    role: 'Student',
    status: 'Inactive',
    joinedAt: '2023-08-15',
    lastLogin: '2025-10-30',
    eventsAttended: 3,
  },
])

const handleRowClick = (row) => {
  selectedUser.value = row
}

const handleEdit = (row) => {
  console.log('Edit user:', row)
}

const handleDelete = (row) => {
  console.log('Delete user:', row)
}

const handleAddNew = () => {
  console.log('Add new user')
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
