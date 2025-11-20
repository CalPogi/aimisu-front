import { ref } from 'vue'

export function useModal() {
  const isModalOpen = ref(false)
  const modalTitle = ref('')
  const modalButtonText = ref('')
  const modalFormData = ref({})
  const isEditMode = ref(false)

  const openModal = ({ title, buttonText, initialData = {}, editMode = false }) => {
    modalTitle.value = title
    modalButtonText.value = buttonText
    modalFormData.value = initialData
    isEditMode.value = editMode
    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
    modalFormData.value = {}
  }

  return {
    isModalOpen,
    modalTitle,
    modalButtonText,
    modalFormData,
    isEditMode,
    openModal,
    closeModal,
  }
}
