<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" container style="height: 96vh" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>ClearVue</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area
          style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
        >
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            vertical
          >
            <q-tab name="customers" label="Customers" />
            <q-tab name="sites" label="Sites" />
            <q-tab name="meters" label="Meters" />
            <q-tab name="circuits" label="Circuits" />
          </q-tabs>
          <div class="logout">
            <button @click="logout">Logout</button>
          </div>
          <div class="create-agent">
            <button @click="openModal">Create new agent</button>
          </div>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm"> <img src="/avatar.png" /> /> </q-avatar>
            <div class="text-weight-bold">Agent Name</div>
            <div>@clearvueagent</div>
          </div>
        </q-img>
      </q-drawer>
      <q-page-container>
        <div class="q-pa-md">
          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="slide-down"
            transition-next="slide-up"
          >
            <q-tab-panel name="customers">
              <div class="text-h4 q-mb-md">Customers</div>
              <q-table :rows="customers" row-key="name" flat bordered @row-click="get" />
            </q-tab-panel>

            <q-tab-panel name="sites">
              <div class="text-h4 q-mb-md">Sites</div>
              <q-table :rows="sites" row-key="name" flat bordered @row-click="get" />
            </q-tab-panel>

            <q-tab-panel name="meters">
              <div class="text-h4 q-mb-md">Meters</div>
              <q-table :rows="meters" row-key="name" flat bordered @row-click="get" />
            </q-tab-panel>
            <q-tab-panel name="circuits">
              <div class="text-h4 q-mb-md">Circuits</div>
              <q-table :rows="meters" row-key="name" flat bordered @row-click="get" />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-page-container>
    </q-layout>
  </div>
  <div>
    <RegisterNewAgent :state="state" />
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import {
  getAllCircuits,
  getAllCustomers,
  getAllMeters,
  getAllSites,
  logoutAgent
} from '@/api/api.ts'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import router from '@/router/index.ts'
import { Loading } from 'quasar'
import RegisterNewAgent from '@/components/RegisterNewAgent.vue'

const $toast = useToast()

export default {
  components: { RegisterNewAgent },
  setup() {
    const drawer = ref(false)
    const customers = ref([])
    const meters = ref([])
    const sites = ref([])
    const circuits = ref([])
    const tab = ref('customers')
    const state = reactive({ modalOpen: false })

    onMounted(async () => {
      try {
        Loading.show()
        const [customersPromise, sitesPromise, metersPromise, circuitsPromise] =
          await Promise.allSettled([
            getAllCustomers(),
            getAllSites(),
            getAllMeters(),
            getAllCircuits()
          ])
        customers.value = customersPromise.value
        sites.value = sitesPromise.value
        meters.value = metersPromise.value
        circuits.value = circuitsPromise.value
        Loading.hide()
        $toast.success('All data is loaded successfully')
      } catch (e) {
        $toast.error(e.response.data)
      }
    })

    const logout = async () => {
      try {
        await logoutAgent()
        $toast.success('Logged out successfully')
        router.push('/')
      } catch (e) {
        $toast.error(e.response.data)
        router.push('/')
      }
    }

    const get = async (_props, row) => {
      try {
        console.log(row)
      } catch (e) {
        $toast.error(e)
      }
    }

    const openModal = () => {
      state.modalOpen = true
    }

    const closeModal = () => {
      state.modalOpen = false
    }

    return {
      drawer,
      customers,
      logout,
      tab,
      get,
      meters,
      sites,
      circuits,
      state,
      closeModal,
      openModal
    }
  }
}
</script>

<style>
.logout {
  position: fixed;
  bottom: 10px;
  left: 10px;
}

.create-agent {
  position: fixed;
  bottom: 50px;
  left: 10px;
}

button {
  padding: 8px;
  border: none;
  width: 180px;
  border-radius: 3px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}
</style>
