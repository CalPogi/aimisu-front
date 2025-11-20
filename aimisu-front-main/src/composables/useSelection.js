// composables/useSelection.js
import { ref } from 'vue'

export function useSelection(initialItems = []) {
  const items = ref(initialItems)
  const selectedItem = ref(null)

  const selectItem = (item) => {
    selectedItem.value = item
  }

  return {
    items,
    selectedItem,
    selectItem,
  }
}
