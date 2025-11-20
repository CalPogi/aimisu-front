<template>
  <div class="flex gap-4" style="height: calc(100vh - 120px)">
    <!-- Left: Data Table -->
    <div class="flex-1">
      <DataTable
        title="Departments"
        :columns="columns"
        :rows="departments"
        :selected-row-id="selectedDepartment?.id"
        empty-message="No departments found"
        @row-click="handleRowClick"
        @add-new="handleAddNew"
        @toggle-filter="toggleFilter"
      />
    </div>

    <!-- Right: Detail Panel -->
    <div class="w-96 flex-shrink-0">
      <DetailPanel title="Department Details" :data="selectedDepartment">
        <div v-if="selectedDepartment" class="space-y-6">
          <!-- Department Icon -->
          <div class="flex justify-center">
            <div
              class="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white shadow-lg"
            >
              <i class="fi fi-br-building text-4xl"></i>
            </div>
          </div>

          <!-- Department Information -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Department Information
            </h4>
            <div class="space-y-3">
              <div>
                <label class="text-xs font-medium text-gray-500">Department Name</label>
                <p class="text-sm text-gray-900 mt-1 font-medium">{{ selectedDepartment.name }}</p>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Code</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedDepartment.code }}</p>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Description</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedDepartment.description }}</p>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-medium text-gray-500">Building</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedDepartment.building }}</p>
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-500">Floor</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedDepartment.floor }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Leadership Information -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Department Head
            </h4>
            <div class="space-y-3">
              <div>
                <label class="text-xs font-medium text-gray-500">Name</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedDepartment.head }}</p>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Email</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedDepartment.email }}</p>
              </div>
              <div>
                <label class="text-xs font-medium text-gray-500">Phone</label>
                <p class="text-sm text-gray-900 mt-1">{{ selectedDepartment.phone }}</p>
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
                  <label class="text-xs font-medium text-gray-500">Faculty</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedDepartment.faculty }}</p>
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-500">Students</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedDepartment.students }}</p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-medium text-gray-500">Programs</label>
                  <p class="text-sm text-gray-900 mt-1">{{ selectedDepartment.programs }}</p>
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-500">Status</label>
                  <p class="text-sm mt-1">
                    <span :class="getStatusClass(selectedDepartment.status)">{{
                      selectedDepartment.status
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Programs Offered -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Programs Offered
            </h4>
            <div class="space-y-2">
              <div
                v-for="program in selectedDepartment.programsList"
                :key="program"
                class="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900"
              >
                {{ program }}
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center gap-3">
            <button
              @click="handleEdit(selectedDepartment)"
              class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <i class="fi fi-br-pencil text-sm"></i>
              Edit
            </button>
            <button
              @click="handleDelete(selectedDepartment)"
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
  name: 'AdminDepartments',
}
</script>

<script setup>
import { ref } from 'vue'
import DataTable from '@/components/table/DataTable.vue'
import DetailPanel from '@/components/common/DetailPanel.vue'

const selectedDepartment = ref(null)

const columns = [
  { key: 'name', label: 'Department Name' },
  { key: 'code', label: 'Code' },
  { key: 'head', label: 'Department Head' },
  { key: 'building', label: 'Building' },
  { key: 'students', label: 'Students' },
  { key: 'status', label: 'Status' },
]

const departments = ref([
  {
    id: 1,
    name: 'Computer Science',
    code: 'CS',
    description: 'Department of Computer Science and Information Technology',
    building: 'Science Building',
    floor: '3rd Floor',
    head: 'Dr. Robert Johnson',
    email: 'cs.head@isu.edu.ph',
    phone: '+63 912 345 6789',
    faculty: 25,
    students: 450,
    programs: 3,
    status: 'Active',
    programsList: ['BS Computer Science', 'BS Information Technology', 'MS Computer Science'],
  },
  {
    id: 2,
    name: 'Engineering',
    code: 'ENGR',
    description: 'College of Engineering and Technology',
    building: 'Engineering Building',
    floor: 'All Floors',
    head: 'Engr. Maria Santos',
    email: 'engr.head@isu.edu.ph',
    phone: '+63 912 345 6790',
    faculty: 40,
    students: 850,
    programs: 5,
    status: 'Active',
    programsList: [
      'BS Civil Engineering',
      'BS Electrical Engineering',
      'BS Mechanical Engineering',
      'BS Electronics Engineering',
      'BS Industrial Engineering',
    ],
  },
  {
    id: 3,
    name: 'Education',
    code: 'EDUC',
    description: 'College of Teacher Education',
    building: 'Education Building',
    floor: '2nd Floor',
    head: 'Dr. Ana Reyes',
    email: 'educ.head@isu.edu.ph',
    phone: '+63 912 345 6791',
    faculty: 30,
    students: 600,
    programs: 4,
    status: 'Active',
    programsList: [
      'BS Elementary Education',
      'BS Secondary Education',
      'BS Special Education',
      'Master in Education',
    ],
  },
  {
    id: 4,
    name: 'Business Administration',
    code: 'BA',
    description: 'School of Business and Management',
    building: 'Business Building',
    floor: '1st-2nd Floor',
    head: 'Prof. Carlos Garcia',
    email: 'ba.head@isu.edu.ph',
    phone: '+63 912 345 6792',
    faculty: 20,
    students: 400,
    programs: 3,
    status: 'Active',
    programsList: ['BS Business Administration', 'BS Accountancy', 'BS Entrepreneurship'],
  },
])

const handleRowClick = (row) => {
  selectedDepartment.value = row
}

const handleEdit = (row) => {
  console.log('Edit department:', row)
}

const handleDelete = (row) => {
  console.log('Delete department:', row)
}

const handleAddNew = () => {
  console.log('Add new department')
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
