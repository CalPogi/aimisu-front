// composables/useEventsCrud.js
import api from '@/axios.js'
import { convertTimeSlotsForEdit, convertTimeSlotsForBackend } from '@/utils/eventTimeSlots'

export function useEventsCrud() {
  const fetchEvents = async () => {
    const res = await api.get('/events')
    return Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []
  }

  const buildEventPayload = (formData) => ({
    name: formData.name,
    description: formData.description,
    start_date: formData.dateRange?.start || '',
    end_date: formData.dateRange?.end || '',
    time_slots: convertTimeSlotsForBackend(formData.timeSlots),
    location: formData.location?.name || '',
    latitude: formData.location?.coordinates?.[1] || null,
    longitude: formData.location?.coordinates?.[0] || null,
  })

  const buildEditData = (item) => ({
    name: item.name || '',
    description: item.description || '',
    dateRange: { start: item.start_date || '', end: item.end_date || '' },
    timeSlots: convertTimeSlotsForEdit(item.time_slots),
    location: {
      name: item.location || '',
      coordinates: [item.longitude || 0, item.latitude || 0],
    },
  })

  const createEvent = (payload) => api.post('/events', payload)
  const updateEvent = (id, payload) => api.put(`/events/${id}`, payload)
  const deleteEvent = (id) => api.delete(`/events/${id}`)

  return {
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    buildEventPayload,
    buildEditData,
  }
}
