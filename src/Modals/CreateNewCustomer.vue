<template>
  <q-dialog v-model="childState.modalOpen">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create New Customer</div>
      </q-card-section>
      <q-card-section>
        <q-input dense v-model="name" label="Name" outlined />
        <q-input dense v-model="vatNumber" label="Vat number" outlined />
        <q-input dense v-model="email" label="Email" outlined :rules="[emailRule]" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" @click="closeModal" />
        <q-btn label="Register" color="primary" @click="registerAgent" :disable="!validForm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { createNewCustomer } from '@/api/api'
import { emailRule } from '@/helpers/validators'

const props = defineProps<{
  state?: any
}>()
const childState = reactive(props.state)
const $toast = useToast()
const email = ref('')
const name = ref('')
const vatNumber = ref('')

const validForm = computed(() => {
  return emailRule(email.value) === true
})

const closeModal = () => {
  childState.modalOpen = false
}
const registerAgent = async () => {
  try {
    const result = await createNewCustomer(name.value, email.value, vatNumber.value)
    $toast.success(result)
    email.value = ''
    name.value = ''
    vatNumber.value = ''
    childState.modalOpen = false
    window.location.reload()
  } catch (e: any) {
    $toast.error(e.response.data)
  }
}
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
