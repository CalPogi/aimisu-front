// utils/eventTimeSlots.js
export function convertTimeSlotsForEdit(timeSlots) {
  const result = {}
  let slots = timeSlots

  if (typeof slots === 'string') {
    try {
      slots = JSON.parse(slots)
    } catch (e) {
      console.error('Failed to parse time_slots:', e)
      return result
    }
  }

  if (Array.isArray(slots)) {
    slots.forEach((slot) => {
      result[slot.date] = slot.start
    })
  }

  return result
}

export function convertTimeSlotsForBackend(timeSlots) {
  if (!timeSlots || typeof timeSlots !== 'object') return []

  return Object.entries(timeSlots).map(([date, time]) => ({
    date,
    start: time,
  }))
}
