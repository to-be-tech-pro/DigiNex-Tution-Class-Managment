<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1 text-grey-9 font-inter">
    <!-- Header -->
    <q-header class="bg-white text-dark shadow-1 q-py-xs" height-hint="60">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="q-mr-sm text-grey-7"
        />

        <q-toolbar-title class="text-weight-bold text-h6 text-grey-9 row items-center">
          DigiNex
          <span
            class="text-caption text-white bg-primary q-px-xs q-py-none q-ml-sm rounded-borders"
            style="font-size: 10px; padding: 2px 6px"
            >BETA</span
          >
        </q-toolbar-title>

        <q-space />

        <!-- Top Right Actions -->
        <div class="q-gutter-x-sm row items-center">
          <q-input
            dense
            outlined
            rounded
            v-model="search"
            placeholder="Global Search (Students, Tutors)..."
            class="gt-xs q-mr-md"
            bg-color="grey-1"
            borderless
            input-class="text-dark"
            style="min-width: 250px"
            @keyup.enter="handleSearch"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="grey-6" class="cursor-pointer" @click="handleSearch" />
            </template>
          </q-input>

          <q-btn round flat color="grey-7" icon="notifications">
            <q-badge color="red" floating rounded mini />
            <q-menu transition-show="jump-down" transition-hide="jump-up" :offset="[0, 10]">
              <q-list style="min-width: 300px">
                <div class="q-px-md q-py-sm border-bottom-light">
                  <div class="text-weight-bold text-dark">Notifications</div>
                </div>

                <q-item clickable v-ripple class="q-py-md">
                  <q-item-section avatar top>
                    <q-avatar icon="person_add" color="blue-1" text-color="blue" size="md" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-bold text-dark text-subtitle2"
                      >New Student Registration</q-item-label
                    >
                    <q-item-label caption class="text-grey-7"
                      >Kasun Perera joined Grade 10 Math Class.</q-item-label
                    >
                    <q-item-label caption class="text-grey-5 q-mt-xs" style="font-size: 11px"
                      >2 mins ago</q-item-label
                    >
                  </q-item-section>
                </q-item>

                <q-separator spaced inset />

                <q-item clickable v-ripple class="q-py-md">
                  <q-item-section avatar top>
                    <q-avatar icon="payments" color="green-1" text-color="green" size="md" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-bold text-dark text-subtitle2"
                      >Payment Received</q-item-label
                    >
                    <q-item-label caption class="text-grey-7"
                      >Rs. 2,500 received from Amal Silva.</q-item-label
                    >
                    <q-item-label caption class="text-grey-5 q-mt-xs" style="font-size: 11px"
                      >1 hour ago</q-item-label
                    >
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable v-close-popup class="text-center block">
                  <q-item-section class="text-primary text-weight-bold cursor-pointer"
                    >View All Notifications</q-item-section
                  >
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn round flat color="grey-7" icon="settings" to="/settings" />

          <q-separator vertical inset class="q-mx-sm" />

          <q-btn flat no-caps class="q-ml-none rounded-borders text-grey-8 pl-1">
            <q-avatar size="36px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-left q-ml-sm gt-xs">
              <div class="text-weight-bold text-subtitle2" style="line-height: 1.1">Admin User</div>
              <div class="text-caption text-grey-6" style="line-height: 1; font-size: 11px">
                Super Admin
              </div>
            </div>

            <!-- Profile Dropdown Menu -->
            <q-menu transition-show="jump-down" transition-hide="jump-up" :offset="[0, 10]">
              <q-list style="min-width: 200px">
                <div class="q-px-md q-py-sm">
                  <div class="text-weight-bold">Admin User</div>
                  <div class="text-caption text-grey-6">admin@diginex.com</div>
                </div>
                <q-separator />

                <q-item clickable v-close-popup to="/profile" class="text-grey-8">
                  <q-item-section avatar>
                    <q-icon name="person_outline" />
                  </q-item-section>
                  <q-item-section>My Profile</q-item-section>
                </q-item>

                <q-item clickable v-close-popup to="/settings" class="text-grey-8">
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>
                  <q-item-section>Settings</q-item-section>
                </q-item>

                <q-separator />

                <q-item
                  clickable
                  v-close-popup
                  @click="handleLogout"
                  class="text-red-7 hover:bg-red-50"
                >
                  <q-item-section avatar>
                    <q-icon name="logout" color="red-7" />
                  </q-item-section>
                  <q-item-section>Log Out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Sidebar (Drawer) -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white sidebar-shadow"
      :width="260"
    >
      <div class="q-pa-lg q-mb-xs flex flex-center">
        <div class="row items-center cursor-pointer" @click="$router.push('/dashboard')">
          <div class="bg-primary text-white rounded-borders q-pa-xs q-mr-sm shadow-2">
            <q-icon name="school" size="24px" />
          </div>
          <div class="text-h5 text-weight-bolder text-grey-9 tracking-tight font-heading">
            DigiNex
          </div>
        </div>
      </div>

      <q-list padding class="text-grey-7">
        <q-item-label
          header
          class="text-grey-5 text-uppercase text-weight-bold text-caption q-pl-lg q-mb-xs q-pt-sm"
          style="font-size: 0.7rem; letter-spacing: 1px"
        >
          Main Menu
        </q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="link in mainLinks"
          :key="link.title"
          :to="link.link"
          active-class="bg-blue-1 text-primary active-border"
          class="q-mx-md rounded-borders q-mb-sm transition-all text-grey-8"
        >
          <q-item-section avatar style="min-width: 40px">
            <q-icon :name="link.icon" size="22px" />
          </q-item-section>
          <q-item-section class="text-weight-medium text-body2">
            {{ link.title }}
          </q-item-section>
        </q-item>

        <q-separator spaced="lg" class="q-mx-lg bg-grey-2" />

        <q-item-label
          header
          class="text-grey-6 text-uppercase text-weight-bold text-caption q-pl-lg q-mb-xs"
          style="font-size: 0.7rem; letter-spacing: 1px"
        >
          Management
        </q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="link in managementLinks"
          :key="link.title"
          :to="link.link"
          active-class="bg-blue-1 text-primary active-border"
          class="q-mx-md rounded-borders q-mb-sm transition-all text-grey-8"
        >
          <q-item-section avatar style="min-width: 40px">
            <q-icon :name="link.icon" size="22px" />
          </q-item-section>
          <q-item-section class="text-weight-medium text-body2">
            {{ link.title }}
          </q-item-section>
        </q-item>

        <!-- Bottom Section -->
        <div class="absolute-bottom q-pa-md bg-grey-1 ma-3 rounded-borders q-ma-md">
          <div class="row items-center no-wrap">
            <q-icon name="headset_mic" color="primary" size="24px" class="q-mr-sm" />
            <div>
              <div class="text-caption text-weight-bold text-grey-9">Need Help?</div>
              <div class="text-caption text-grey-6" style="font-size: 10px">Contact Support</div>
            </div>
          </div>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-1" style="min-height: 100vh">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'boot/supabase'

const leftDrawerOpen = ref(false)
const search = ref('')
const router = useRouter()

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const handleSearch = () => {
  if (search.value.trim() === '') return

  // For now, redirect to relevant page based on input or just global search
  // Assuming simple implementation: redirect to Students page with query
  router.push({ path: '/students', query: { q: search.value } })
}

const mainLinks = [{ title: 'Dashboard', icon: 'grid_view', link: '/dashboard' }]

const managementLinks = [
  { title: 'Students', icon: 'school', link: '/students' },
  { title: 'Tutors', icon: 'co_present', link: '/tutors' },
  { title: 'Classes', icon: 'class', link: '/classes' },
  { title: 'Attendance', icon: 'rule', link: '/attendance' },
  { title: 'Payments', icon: 'payments', link: '/payments' },
  { title: 'Exams', icon: 'assignment', link: '/exams' },
  { title: 'Reports', icon: 'bar_chart', link: '/reports' },
  { title: 'System Users', icon: 'manage_accounts', link: '/users' },
]

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}
.font-heading {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.5px;
}

/* Sidebar Active State Styling */
.active-border {
  position: relative;
  font-weight: 600 !important;
  background: #e3f2fd !important; /* Soft Blue */
  color: #1976d2 !important;
}

.transition-all {
  transition: all 0.3s ease;
}

.transition-all:hover {
  background-color: #f5f5f5;
  color: #1976d2;
}

/* Smooth Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.border-bottom-light {
  border-bottom: 1px solid #eaecf0;
}
</style>
