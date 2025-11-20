// configs/eventViewConfig.js
export const EVENT_COLUMNS = [
  { key: 'name', label: 'Event Name' },
  { key: 'start_date', label: 'Start Date' },
  { key: 'end_date', label: 'End Date' },
  { key: 'location', label: 'Location' },
]

export const EVENT_DETAIL_SCHEMA = [
  {
    title: 'Event Information',
    fields: [
      { key: 'name', label: 'Event Name' },
      { key: 'description', label: 'Description' },
      { key: 'start_date', label: 'Start Date' },
      { key: 'end_date', label: 'End Date' },
      { key: 'location', label: 'Location' },
      { key: 'status', label: 'Status' },
    ],
  },
]

export const EVENT_MODAL_FIELDS = [
  { name: 'name', label: 'Event Name', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'dateRange', label: 'Event Dates', type: 'daterange', required: true },
  { name: 'timeSlots', label: 'Event Times', type: 'daytimes', required: true },
  {
    name: 'location',
    label: 'Location',
    type: 'custom',
    component: 'MapPicker',
    required: true,
  },
]
