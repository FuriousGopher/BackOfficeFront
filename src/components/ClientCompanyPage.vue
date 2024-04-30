<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" container style="height: 96vh" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>{{
            customerData.length > 0 ? customerData[0].name : 'Customer Name'
          }}</q-toolbar-title>
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
            <q-tab name="customer" label="Customer info" />
            <q-tab name="sites" label="Sites" />
            <q-tab name="meters" label="Meters" />
            <q-tab name="circuits" label="Circuits" />
          </q-tabs>
          <div class="logout">
            <button @click="logout">Logout</button>
          </div>
        </q-scroll-area>
        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="/avatar.png" alt="img" /> />
            </q-avatar>
            <div class="text-weight-bold">Client Name</div>
            <div>@clientEmail</div>
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
            <q-tab-panel name="customer">
              <div class="text-h4 q-mb-md">Customer info</div>
              <q-table
                :rows="customerData"
                row-key="name"
                flat
                bordered
                :columns="columnsView.customerColumns"
              >
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="sites">
              <div class="text-h4 q-mb-md">Sites</div>
              <q-table
                :rows="customerSites"
                row-key="name"
                flat
                bordered
                :columns="columnsView.siteColumns"
              >
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="meters">
              <div class="text-h4 q-mb-md">Meters</div>
              <q-table
                :rows="customerMeters"
                row-key="name"
                flat
                bordered
                :columns="columnsView.meterColumns"
              >
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="circuits">
              <div class="text-h4 q-mb-md">Circuits</div>
              <q-table
                :rows="customerCircuits"
                row-key="name"
                flat
                bordered
                :columns="columnsView.circuitColumns"
              >
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toast-notification'
import { onMounted, ref } from 'vue'
import { Loading } from 'quasar'
import router from '@/router'
import { useRoute } from 'vue-router'
import { columnsView } from '@/helpers/columnsView.ts'
import { getAllCompanyInfoForClient } from '@/api/customersApi.ts'

const $toast = useToast()

    const drawer = ref(false)
    const customerData = ref([])
    const customerSites = ref([])
    const customerMeters = ref([])
    const customerCircuits = ref([])
    const tab = ref('customer')

    const route = useRoute()
    const id = +route.query.id

    onMounted(async () => {
      try {
        Loading.show()
        const allInfo = await getAllCompanyInfoForClient(id)
        customerData.value = allInfo.customer || []
        customerSites.value = allInfo.sites || []
        customerMeters.value = allInfo.meters || []
        customerCircuits.value = allInfo.circuits || []
        Loading.hide()
        $toast.success('All data is loaded successfully')
      } catch (e) {
        $toast.error(e.response)
        Loading.hide()
      }
    })

    const logout = async () => {
        $toast.success('Logged out successfully')
        router.push('/')
}
</script>
