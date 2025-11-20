<template>
  <div class="flex gap-4" style="height: calc(100vh - 120px)">
    <!-- Left side: Data Table -->
    <div class="flex-1 flex flex-col">
      <div class="mb-3 flex gap-2">
        <button
          @click="openAddModal"
          class="bg-teal-600 border-0 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Add Event
        </button>
      </div>
      <DataTable
        title="Events"
        :columns="columns"
        :rows="items"
        :selected-row-id="selectedItem?.id"
        empty-message="No events found"
        @row-click="selectItem"
      />
    </div>

    <!-- Right side: Detail Panel -->
    <div class="w-96 flex-shrink-0 space-y-5">
      <DetailPanel
        v-if="selectedItem"
        :data="selectedItem"
        :schema="detailSchema"
        title="Event Details"
      >
        <button
          @click="openEditModal"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          @click="deleteItem"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </DetailPanel>
      <div v-else class="bg-white rounded-lg border h-full flex items-center justify-center text-gray-500">
        <div class="text-center p-8">
          <p class="font-medium mb-1">No Event Selected</p>
          <p class="text-sm">Click on a row to view details</p>
        </div>
      </div>
    </div>

    <!-- Modal for Add/Edit -->
    <InputModal
      :is-open="isModalOpen"
      :title="modalTitle"
      :fields="modalFields"
      :initial-data="modalFormData"
      :submit-button-text="modalButtonText"
      @close="closeModal"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import DataTable from '@/components/table/DataTable.vue'
import DetailPanel from '@/components/common/DetailPanel.vue'
import InputModal from '@/components/common/InputModal.vue'

import { useSelection } from '@/composables/useSelection'
import { useModal } from '@/composables/useModal'
import { useEventsCrud } from '@/composables/useEventsCrud'
import { EVENT_COLUMNS, EVENT_DETAIL_SCHEMA, EVENT_MODAL_FIELDS } from '@/configs/eventViewConfig'

export default {
  name: 'EventsPage',
  components: { DataTable, DetailPanel, InputModal },
  data() {
    return {
      columns: EVENT_COLUMNS,
      detailSchema: EVENT_DETAIL_SCHEMA,
      modalFields: EVENT_MODAL_FIELDS,
      selection: useSelection(),
      modal: useModal(),
      crud: useEventsCrud(),
    }
  },
  computed: {
    items() {
      return this.selection.items
    },
    selectedItem() {
      return this.selection.selectedItem
    },
    isModalOpen() {
      return this.modal.isModalOpen
    },
    modalTitle() {
      return this.modal.modalTitle
    },
    modalButtonText() {
      return this.modal.modalButtonText
    },
    modalFormData() {
      return this.modal.modalFormData
    },
    isEditMode() {
      return this.modal.isEditMode
    },
  },
  mounted() {
    this.loadEvents()
  },
  methods: {
    async loadEvents() {
      try {
        const data = await this.crud.fetchEvents()
        this.selection.setItems(data)
      } catch {
        alert('Failed to load events')
      }
    },
    selectItem(item) {
      this.selection.selectItem(item)
    },
    openAddModal() {
      this.modal.openModal({
        title: 'Create New Event',
        buttonText: 'Create',
        initialData: {},
        editMode: false,
      })
    },
    openEditModal() {
      if (!this.selectedItem) return alert('Please select an event first')

      this.modal.openModal({
        title: 'Edit Event',
        buttonText: 'Update',
        initialData: this.crud.buildEditData(this.selectedItem),
        editMode: true,
      })
    },
    closeModal() {
      this.modal.closeModal()
    },
    async handleSubmit(formData) {
      try {
        const payload = this.crud.buildEventPayload(formData)

        if (this.isEditMode && this.selectedItem?.id) {
          await this.crud.updateEvent(this.selectedItem.id, payload)
          alert('Event updated successfully!')
        } else {
          await this.crud.createEvent(payload)
          alert('Event created successfully!')
        }

        this.closeModal()
        await this.loadEvents()
        this.selection.clearSelection()
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to save event')
      }
    },
    async deleteItem() {
      if (!this.selectedItem?.id) return alert('Please select an event first')
      if (!confirm('Are you sure?')) return

      try {
        await this.crud.deleteEvent(this.selectedItem.id)
        alert('Event deleted successfully!')
        this.selection.clearSelection()
        await this.loadEvents()
      } catch {
        alert('Failed to delete event')
      }
    },
  },
}
</script>
