<template>
  <div class="flex flex-col h-full">
    <!-- Table Header -->
    <div v-if="title" class="px-4 py-3 border-b border-gray-200 bg-gray-50">
      <h3 class="text-sm font-semibold text-gray-900">{{ title }}</h3>
    </div>

    <!-- Table Content -->
    <div class="flex-1 overflow-auto">
      <table class="w-full border-collapse">
        <!-- Header -->
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="bg-gray-50 px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 sticky top-0"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody>
          <tr v-for="row in rows" :key="row.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <!-- Dynamic columns -->
            <td v-for="column in columns" :key="column.key" class="px-3 py-2 text-xs text-gray-900">
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                <span v-if="column.key === 'status'" :class="getStatusClass(row[column.key])">
                  {{ row[column.key] }}
                </span>
                <span v-else-if="column.key === 'priority'" :class="getPriorityClass(row[column.key])">
                  {{ row[column.key] }}
                </span>
                <span v-else>{{ row[column.key] }}</span>
              </slot>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-if="rows.length === 0">
            <td :colspan="columns.length" class="text-center py-6 text-xs text-gray-500">
              {{ emptyMessage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  emptyMessage: {
    type: String,
    default: 'No data available',
  },
})

const getStatusClass = (status) => {
  const statusLower = status?.toLowerCase()
  if (statusLower === 'pending') return 'inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700'
  if (statusLower === 'approved') return 'inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700'
  if (statusLower === 'rejected') return 'inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700'
  return 'inline-block px-2 py-0.5 rounded-full text-xs font-medium'
}

const getPriorityClass = (priority) => {
  const priorityLower = priority?.toLowerCase()
  if (priorityLower === 'high') return 'inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700'
  if (priorityLower === 'medium') return 'inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700'
  if (priorityLower === 'low') return 'inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700'
  return 'inline-block px-2 py-0.5 rounded-full text-xs font-medium'
}
</script>

