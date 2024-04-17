<template>
  <q-dialog v-model="childState.modalOpen">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create new meter</div>
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="selectedOption"
          label="Choose a site to connect"
          outlined
          :options="options"
        />
        <p></p>
        <q-input dense v-model="name" label="Name" outlined />
        <q-input dense v-model="serialNumber" label="Serial Number" outlined />
        <q-input dense v-model="installationDate" label="Installation date" outlined type="date" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" @click="closeModal" />
        <q-btn label="Create" color="primary" @click="registerMeter" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { createNewMeter } from '@/api/metersApi'

const props = defineProps<{
  state?: any
  modalData: any
}>()
const childState = reactive(props.state)
const $toast = useToast()
const installationDate = ref()
const serialNumber = ref()
const name = ref()
const selectedOption = ref()

const closeModal = () => {
  childState.modalOpen = false
}
const registerMeter = async () => {
  try {
    const result = await createNewMeter(
      selectedOption.value,
      name.value,
      serialNumber.value,
      installationDate.value
    )
    $toast.success(result)
    installationDate.value = name.value = serialNumber.value = childState.modalOpen = false
    window.location.reload()
  } catch (e: any) {
    $toast.error(e.response.data)
  }
}

const options = computed(() => {
  return props.modalData.map((item: any) => ({ label: item.name, value: item.id }))
})
</script>

<style scoped>
.q-dialog {
  max-width: 400px;
  width: 100%;
}

.q-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.q-card-section {
  padding: 20px;
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: bold;
}

.q-input {
  margin-bottom: 20px;
}

.q-card-actions {
  padding: 20px;
  justify-content: flex-end;
}

.q-btn {
  margin-left: 10px;
}

.q-btn.primary {
  background-color: #4caf50;
}

.q-btn.primary:hover {
  background-color: #388e3c;
}
</style>
