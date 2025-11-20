<template>
  <div
    class="bg-white rounded-xl shadow border border-gray-200 overflow-hidden h-full flex flex-col"
  >
    <div class="flex-1 overflow-auto">
      <table v-if="rows && rows.length > 0" class="w-full table-fixed border-collapse">
        <thead class="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              @click="column.sortable ? emitSort(column.key) : null"
              class="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide truncate select-none hover:text-teal-600 cursor-pointer"
            >
              {{ column.label }}
              <i
                v-if="sortKey === column.key"
                :class="sortAsc ? 'fi fi-rr-angle-small-up' : 'fi fi-rr-angle-small-down'"
                class="ml-1 text-xs"
              ></i>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="row in rows"
            :key="row.id"
            @click="handleRowClick(row)"
            :class="getRowClass(row.id)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-2 text-xs text-gray-900 truncate align-middle"
              :title="row[column.key] || '-'"
            >
              <template v-if="column.key === 'status'">
                <span
                  :class="[
                    'rounded-full px-3 py-1 text-xs font-semibold',
                    row.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : row.status === 'In Progress'
                        ? 'bg-purple-100 text-purple-700'
                        : row.status === 'Active'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700',
                  ]"
                  >{{ row[column.key] }}</span
                >
              </template>
              <template v-else>
                {{ row[column.key] || '-' }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="flex items-center justify-center h-full min-h-100 text-gray-400">
        <div class="text-center px-4">
          <i class="fi fi-rr-calendar text-6xl text-gray-300 mb-4"></i>
          <p class="text-sm font-medium text-gray-500">{{ emptyMessage }}</p>
          <p class="text-xs text-gray-400 mt-1">Create your first event to get started</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    columns: { type: Array, required: true },
    rows: { type: Array, default: () => [] },
    selectedRowId: { type: [String, Number], default: null },
    emptyMessage: { type: String, default: 'No data found' },
    sortKey: { type: String, default: '' },
    sortAsc: { type: Boolean, default: true },
  },
  emits: ['row-click', 'sort'],
  methods: {
    handleRowClick(row) {
      this.$emit('row-click', row)
    },
    getRowClass(rowId) {
      const isSelected = this.selectedRowId === rowId
      return [
        'cursor-pointer transition-colors duration-150',
        isSelected ? 'bg-teal-50 hover:bg-teal-100 border-l-4 border-teal-500' : 'hover:bg-gray-50',
      ]
    },
    emitSort(key) {
      this.$emit('sort', { key })
    },
  },
}
</script>
