<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" container style="height: 96vh" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Header</q-toolbar-title>
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
            <q-tab name="mails" label="Sites" />
            <q-tab name="alarms" label="Meters" />
            <q-tab name="movies" label="Customers" />
          </q-tabs>
          <!--         <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="folder" />
              </q-item-section>
              <q-item-section>Customers</q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>Star</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section> Send </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section> Drafts </q-item-section>
            </q-item>
          </q-list>-->
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
            <q-tab-panel name="mails">
              <div class="text-h4 q-mb-md">Mails</div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
                magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
                assumenda consectetur culpa fuga nulla ullam. In, libero.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
                magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
                assumenda consectetur culpa fuga nulla ullam. In, libero.
              </p>
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="text-h4 q-mb-md">Alarms</div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
                magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
                assumenda consectetur culpa fuga nulla ullam. In, libero.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
                magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
                assumenda consectetur culpa fuga nulla ullam. In, libero.
              </p>
            </q-tab-panel>

            <q-tab-panel name="movies">
              <div class="text-h4 q-mb-md">Movies</div>
              <q-table :rows="customers" row-key="name" flat bordered @row-click="get" />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAllCustomers, logoutAgent } from '@/api/api.ts'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import router from '@/router/index.ts'
import { Loading } from 'quasar'

const $toast = useToast()

export default {
  setup() {
    const drawer = ref(false)
    const customers = ref([])
    const tab = ref('mails')

    onMounted(async () => {
      try {
        Loading.show()
        const result = await getAllCustomers()
        customers.value = result
        Loading.hide()
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

    return {
      drawer,
      customers,
      logout,
      tab,
      get
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
