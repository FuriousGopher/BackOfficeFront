<template>
  <q-dialog v-model="childState.modalOpen">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Register New Agent</div>
      </q-card-section>
      <q-card-section>
        <q-input
          dense
          v-model="email"
          label="Email"
          outlined
          :rules="[emailRule, checkEmailExist]"
        />
        <q-input
          dense
          v-model="password"
          label="Password"
          outlined
          :rules="[passwordRule]"
          type="password"
        />
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
import { checkEmailExist, emailRule, passwordRule } from '@/helpers/validators'
import { createNewAgent } from '@/api/agentApi'

const props = defineProps<{
  state?: any
}>()
const childState = reactive(props.state)
const $toast = useToast()
const email = ref('')
const password = ref('')

const closeModal = () => {
  childState.modalOpen = false
}
const registerAgent = async () => {
  try {
    const result = await createNewAgent(password.value, email.value)
    $toast.success(result)
    email.value = ''
    password.value = ''
    childState.modalOpen = false
  } catch (e: any) {
    $toast.error(e.response.data.errorsMessages[0].message)
  }
}

const validForm = computed(() => {
  return (
    emailRule(email.value) === true &&
    passwordRule(password.value) === true &&
    checkEmailExist(email.value)
  )
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
