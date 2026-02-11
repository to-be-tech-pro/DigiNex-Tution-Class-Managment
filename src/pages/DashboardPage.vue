<template>
  <q-page class="q-pa-lg">
    <!-- Welcome Header -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <h1 class="text-h4 text-weight-bolder text-grey-9 q-my-none">
          Good Morning, <span class="text-primary">Admin!</span> <span class="text-h4">👋</span>
        </h1>
        <p class="text-grey-5 text-subtitle1 q-mt-sm q-mb-none font-medium">
          Here's what's happening in your institute today.
        </p>
      </div>
      <div>
        <q-btn
          unelevated
          rounded
          color="primary"
          icon="add"
          label="New Student"
          no-caps
          to="/students"
          class="q-px-lg q-py-sm shadow-2 hover-scale"
        />
      </div>
    </div>

    <!-- Modern Stats Grid -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-sm-6 col-md-3" v-for="(stat, index) in stats" :key="index">
        <q-card
          class="stats-card no-shadow border-radius-lg overflow-hidden hover-card full-height"
        >
          <q-card-section class="q-pa-md relative-position">
            <div class="row items-center justify-between q-mb-md">
              <div
                class="q-pa-md rounded-borders-15 shadow-2"
                :class="`bg-${stat.color}-1 text-${stat.color}-9`"
                style="
                  width: 50px;
                  height: 50px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <q-icon :name="stat.icon" size="22px" />
              </div>

              <div class="text-right">
                <div class="text-h4 text-weight-bolder">{{ stat.value }}</div>
              </div>
            </div>

            <div class="row items-center justify-between">
              <div class="text-subtitle2 text-grey-5 font-medium text-uppercase tracking-wide">
                {{ stat.label }}
              </div>
              <div class="flex items-center">
                <span
                  class="text-weight-bold q-mr-xs"
                  :class="stat.trend > 0 ? 'text-green-5' : 'text-red-5'"
                >
                  {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
                </span>
                <span class="text-caption text-grey-5">vs last month</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="row q-col-gutter-xl">
      <!-- Left Column: Activity & Charts -->
      <div class="col-12 col-lg-8">
        <!-- Quick Actions Grid -->
        <div class="row q-col-gutter-md q-mb-lg">
          <div class="col-6 col-md-3" v-for="action in quickActions" :key="action.label">
            <q-card
              class="stats-card no-shadow border-radius-lg cursor-pointer hover-border text-center full-height"
              v-ripple
              @click="$router.push(action.route)"
            >
              <q-card-section>
                <q-avatar
                  size="48px"
                  :color="action.color + '-1'"
                  :text-color="action.color + '-9'"
                  class="q-mb-sm"
                >
                  <q-icon :name="action.icon" size="22px" />
                </q-avatar>
                <div class="text-weight-bold">{{ action.label }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Performance Analytics Chart -->
        <q-card class="no-shadow border-radius-lg q-mb-lg overflow-hidden">
          <q-card-section class="q-pa-lg">
            <div class="row items-center justify-between q-mb-md">
              <div>
                <div class="text-h6 text-weight-bold">Performance Overview</div>
                <div class="text-caption text-grey-5">Revenue and enrollment growth over time</div>
              </div>
              <q-btn-toggle
                v-model="chartTab"
                spread
                no-caps
                rounded
                unelevated
                toggle-color="primary"
                color="grey-2"
                text-color="grey-9"
                :options="[
                  { label: 'Revenue', value: 'revenue' },
                  { label: 'Enrollments', value: 'enrollments' },
                ]"
                class="border-radius-lg"
              />
            </div>

            <div v-if="chartTab === 'revenue'" class="q-mt-md">
              <apexchart
                type="area"
                height="350"
                :options="revenueOptions"
                :series="revenueSeries"
              ></apexchart>
            </div>
            <div v-else class="q-mt-md">
              <apexchart
                type="bar"
                height="350"
                :options="enrollmentOptions"
                :series="enrollmentSeries"
              ></apexchart>
            </div>
          </q-card-section>
        </q-card>

        <!-- Recent Enrollments Table -->
        <q-card class="no-shadow border-radius-lg q-mt-lg">
          <q-card-section class="row items-center justify-between q-pa-lg">
            <div>
              <div class="text-h6 text-weight-bold">Recent Enrollments</div>
              <div class="text-caption text-grey-5">Latest students joined this month</div>
            </div>
            <q-btn
              flat
              no-caps
              color="primary"
              label="View All Students"
              icon-right="arrow_forward"
              to="/students"
            />
          </q-card-section>

          <q-separator color="grey-8" />

          <q-card-section class="q-pa-none">
            <q-table
              :rows="recentStudents"
              :columns="studentColumns"
              row-key="id"
              flat
              hide-pagination
              :rows-per-page-options="[0]"
            >
              <template v-slot:body-cell-name="props">
                <q-td :props="props">
                  <div class="row items-center">
                    <q-avatar
                      size="36px"
                      color="primary"
                      text-color="white"
                      class="q-mr-md font-bold text-subtitle2"
                    >
                      {{ props.row.name.charAt(0) }}
                    </q-avatar>
                    <div>
                      <div class="text-weight-bold">{{ props.row.name }}</div>
                      <div class="text-caption text-grey-5">{{ props.row.id }}</div>
                    </div>
                  </div>
                </q-td>
              </template>
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-badge
                    :color="props.row.status === 'Paid' ? 'green-2' : 'orange-2'"
                    :text-color="props.row.status === 'Paid' ? 'green-9' : 'orange-9'"
                    class="q-px-md q-py-xs rounded-full font-bold"
                  >
                    {{ props.row.status }}
                  </q-badge>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

      <!-- Right Column: Schedule & Summary -->
      <div class="col-12 col-lg-4">
        <!-- Next Class Card (Featured) -->
        <q-card
          class="no-shadow border-radius-lg bg-gradient-primary text-white q-mb-lg relative-position overflow-hidden"
        >
          <!-- Decorative Circles -->
          <div
            class="absolute-top-right bg-white opacity-10 rounded-full"
            style="width: 150px; height: 150px; right: -50px; top: -50px"
          ></div>
          <div
            class="absolute-bottom-left bg-white opacity-10 rounded-full"
            style="width: 100px; height: 100px; left: -20px; bottom: -20px"
          ></div>

          <q-card-section class="q-pa-lg relative-position" style="z-index: 10">
            <div class="row items-center justify-between q-mb-md">
              <q-badge
                color="white"
                text-color="primary"
                class="q-px-sm q-py-xs text-weight-bold shadow-1"
              >
                Upcoming Class
              </q-badge>
              <q-icon name="more_horiz" class="cursor-pointer opacity-80" size="24px" />
            </div>

            <div class="text-h4 text-weight-bolder q-mb-xs">Physics 101</div>
            <div class="text-subtitle1 opacity-90 q-mb-lg font-medium">Dr. S. Perera • Hall A</div>

            <div class="row items-end justify-between">
              <div>
                <div class="text-h3 font-mono text-weight-bold">10:30</div>
                <div class="text-subtitle2 opacity-80">AM Today</div>
              </div>
              <q-btn
                round
                color="white"
                text-color="primary"
                icon="arrow_forward"
                unelevated
                class="shadow-2"
              />
            </div>
          </q-card-section>
        </q-card>

        <!-- Calendar / Timeline -->
        <q-card class="no-shadow border-radius-lg">
          <q-card-section class="q-pa-lg">
            <div class="text-h6 text-weight-bold q-mb-md">Today's Schedule</div>

            <q-timeline color="primary" class="q-ml-sm">
              <q-timeline-entry icon="access_time">
                <template v-slot:title>
                  <div class="text-weight-bold">Mathematics Revision</div>
                </template>
                <template v-slot:subtitle> 08:00 AM - 10:00 AM </template>
                <div class="text-caption text-grey-5">Grade 11 • Mr. Kamal</div>
              </q-timeline-entry>

              <q-timeline-entry icon="access_time" color="orange">
                <template v-slot:title>
                  <div class="text-weight-bold">Physics Theory</div>
                </template>
                <template v-slot:subtitle> 10:30 AM - 12:30 PM </template>
                <div class="text-caption text-grey-5">Grade 12 • Dr. Perera</div>
              </q-timeline-entry>

              <q-timeline-entry icon="access_time" color="teal">
                <template v-slot:title>
                  <div class="text-weight-bold">Chemistry Lab</div>
                </template>
                <template v-slot:subtitle> 02:00 PM - 04:00 PM </template>
                <div class="text-caption text-grey-5">Grade 13 • Ms. Silva</div>
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { label: 'Total Students', value: '1,240', icon: 'school', color: 'blue', trend: 12 },
  { label: 'Total Tutors', value: '45', icon: 'person', color: 'purple', trend: 5 },
  { label: 'Monthly Revenue', value: 'LKR 425k', icon: 'payments', color: 'green', trend: 8 },
  { label: 'New Inquiries', value: '18', icon: 'pending_actions', color: 'orange', trend: -2 },
])

const quickActions = [
  { label: 'Add Student', icon: 'person_add', color: 'blue', route: '/students' },
  { label: 'New Payment', icon: 'payments', color: 'green', route: '/payments' },
  { label: 'Create Class', icon: 'class', color: 'purple', route: '/classes' },
  { label: 'New Tutor', icon: 'badge', color: 'orange', route: '/tutors' },
]

const studentColumns = [
  { name: 'name', label: 'Student Name', align: 'left', field: 'name' },
  { name: 'subject', label: 'Subject', align: 'left', field: 'subject' },
  { name: 'date', label: 'Date', align: 'right', field: 'date' },
  { name: 'status', label: 'Status', align: 'right', field: 'status' },
]

const recentStudents = [
  { id: '#ST-001', name: 'Kasun Perera', subject: 'Mathematics', date: 'Oct 24', status: 'Paid' },
  { id: '#ST-002', name: 'Nimali Silva', subject: 'Science', date: 'Oct 23', status: 'Pending' },
  { id: '#ST-003', name: 'Amal De Silva', subject: 'History', date: 'Oct 22', status: 'Paid' },
  { id: '#ST-004', name: 'Rohan Jay', subject: 'Physics', date: 'Oct 21', status: 'Paid' },
]

// --- Charts Data ---
const chartTab = ref('revenue')

const revenueSeries = ref([
  {
    name: 'Income',
    data: [31000, 40000, 28000, 51000, 42000, 109000, 100000],
  },
  {
    name: 'Expenses',
    data: [11000, 32000, 45000, 32000, 34000, 52000, 41000],
  },
])

const revenueOptions = ref({
  chart: {
    fontFamily: 'Roboto, sans-serif',
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  colors: ['#1976D2', '#FF9800'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  xaxis: {
    categories: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      formatter: (val) => `LKR ${val / 1000}k`,
    },
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: (val) => `LKR ${val}`,
    },
  },
  grid: {
    borderColor: 'rgba(0,0,0,0.05)',
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.2,
      stops: [0, 90, 100],
    },
  },
})

const enrollmentSeries = ref([
  {
    name: 'New Students',
    data: [44, 55, 57, 56, 61, 58, 63],
  },
])

const enrollmentOptions = ref({
  chart: {
    fontFamily: 'Roboto, sans-serif',
    toolbar: { show: false },
  },
  colors: ['#1976D2'],
  plotOptions: {
    bar: {
      columnWidth: '50%',
      borderRadius: 8,
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  tooltip: {
    theme: 'dark',
  },
  grid: {
    borderColor: 'rgba(0,0,0,0.05)',
  },
})
</script>

<style lang="scss" scoped>
.font-medium {
  font-weight: 500;
}
.font-bold {
  font-weight: 600;
}
.tracking-wide {
  letter-spacing: 0.05em;
}
.border-radius-lg {
  border-radius: 16px;
}
.rounded-borders-md {
  border-radius: 12px;
}
.opacity-10 {
  opacity: 0.1;
}
.opacity-80 {
  opacity: 0.8;
}
.opacity-90 {
  opacity: 0.9;
}
.stats-card {
  background: white;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.body--dark .stats-card {
  background: #252a3e; /* Lighter, blue-ish grey for better contrast */
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.hover-scale {
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.02);
  }
}
.hover-card {
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow:
      0 10px 25px -5px rgba(0, 0, 0, 0.1),
      0 8px 10px -6px rgba(0, 0, 0, 0.1);
  }
}
.hover-border {
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
  border: 1px solid transparent;
  background: white; /* Default light */
}
.body--dark .hover-border {
  background: #1e1e1e; /* Dark mode card */
}
.hover-border:hover {
  border-color: var(--q-primary);
  transform: translateY(-2px);
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
}

.rounded-full {
  border-radius: 9999px;
}
.font-mono {
  font-family: 'Roboto Mono', monospace;
}
</style>
