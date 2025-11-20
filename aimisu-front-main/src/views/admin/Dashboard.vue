<template>
  <div class="flex gap-4">
    <div class="flex-1 flex flex-col gap-4">
      <div class="flex gap-3 items-stretch justify-start">
        <GreetingCard
          :user-name="userName"
          :daily-quote="motivationalText"
          :illustration-url="illustrationUrl"
        />
        <QuickStat
          title="Events Today"
          :value="12"
          label="Active events"
          size="sm"
          icon="calendar"
          icon-color="teal"
          :trend="5"
          :show-trend="true"
        />
        <QuickStat
          title="Pending Approvals"
          :value="12"
          label="Awaiting review"
          size="sm"
          icon="check-circle"
          icon-color="orange"
          :trend="6"
          :show-trend="true"
        />
        <QuickStat
          title="Active Users"
          :value="12"
          label="Online now"
          size="sm"
          icon="user-check"
          icon-color="green"
          :trend="10"
          :show-trend="true"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div
          class="bg-white h-full rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden h-96"
        >
          <DashboardTable
            title="Pending Event"
            :columns="eventColumns"
            :rows="pendingEventRows"
            empty-message="No pending events"
          />
        </div>

        <div
          class="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden h-96"
        >
          <DashboardTable
            title="Pending Announcement"
            :columns="announcementColumns"
            :rows="pendingAnnouncementRows"
            empty-message="No pending announcements"
          />
        </div>
      </div>
    </div>

    <div class="rounded-2xl border h-[628px] flex flex-col overflow-hidden p-0 flex-shrink-0">
      <WeekCalendar :events="calendarEvents" />
    </div>
    <VueApexCharts type="line" height="310" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QuickStat from '@/components/common/QuickStat.vue'
import GreetingCard from '@/components/common/GreetingCard.vue'
import DashboardTable from '@/components/table/DashboardTable.vue'
import WeekCalendar from '@/components/calendar/WeekCalendar.vue'

const userName = ref('Ezekiel')
const motivationalText = ref('Have a productive day managing your dashboard!')
const illustrationUrl = ref('https://via.placeholder.com/300')

const eventColumns = [
  { key: 'name', label: 'Event Name' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
  { key: 'submittedBy', label: 'Submitted By' },
]

const pendingEventRows = ref([
  {
    id: '1',
    name: 'Team Building',
    date: '2025-11-25',
    status: 'Pending',
    submittedBy: 'John Doe',
  },
  { id: '2', name: 'Webinar', date: '2025-11-30', status: 'Pending', submittedBy: 'Jane Smith' },
  {
    id: '3',
    name: 'Training Session',
    date: '2025-12-05',
    status: 'Pending',
    submittedBy: 'Mike Johnson',
  },
])

// Pending Announcement Table
const announcementColumns = [
  { key: 'title', label: 'Title' },
  { key: 'date', label: 'Submitted' },
  { key: 'priority', label: 'Priority' },
  { key: 'submittedBy', label: 'Submitted By' },
]

const pendingAnnouncementRows = ref([
  {
    id: '1',
    title: 'Q4 Goals Update',
    date: '2025-11-14',
    priority: 'High',
    submittedBy: 'HR Manager',
  },
  {
    id: '2',
    title: 'New Office Hours',
    date: '2025-11-13',
    priority: 'Medium',
    submittedBy: 'Admin',
  },
  {
    id: '3',
    title: 'Holiday Schedule',
    date: '2025-11-12',
    priority: 'Medium',
    submittedBy: 'Operations',
  },
])

const calendarEvents = ref([
  {
    id: '1',
    date: new Date(2025, 10, 14),
    time: '10:00 AM',
    title: 'Team Meeting',
    description: 'Project kickoff',
    icon: 'users',
    category: 'Meetings',
    color: 'teal',
  },
  {
    id: '2',
    date: new Date(2025, 10, 14),
    time: '02:00 PM',
    title: 'Client Call',
    description: 'Q4 review',
    icon: 'phone',
    category: 'Calls',
    color: 'blue',
  },
  {
    id: '3',
    date: new Date(2025, 10, 15),
    time: '03:00 PM',
    title: 'Workshop',
    description: 'Vue.js advanced',
    icon: 'presentation',
    category: 'Training',
    color: 'purple',
  },
  {
    id: '4',
    date: new Date(2025, 10, 16),
    time: '09:00 AM',
    title: 'Budget Review',
    description: 'Q4 financial',
    icon: 'chart-line',
    category: 'Meetings',
    color: 'teal',
  },
  {
    id: '5',
    date: new Date(2025, 10, 18),
    time: '04:00 PM',
    title: 'Team Standup',
    description: 'Weekly sync',
    icon: 'users',
    category: 'Meetings',
    color: 'teal',
  },
])
</script>
