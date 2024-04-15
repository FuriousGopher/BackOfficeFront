<template>
  <q-dialog v-model="childState.modalOpen" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Register New Agent</div>
      </q-card-section>
      <q-card-section>
        <q-input dense v-model="name" label="Name" outlined />
        <q-input dense v-model="email" label="Email" outlined />
        <!-- Add more input fields for other registration information as needed -->
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" @click="closeModal" />
        <q-btn label="Register" color="primary" @click="registerAgent" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useToast } from 'vue-toast-notification'

const props = defineProps<{
  state?: any
}>()
const childState = reactive(props.state)
const $toast = useToast()

const closeModal = () => {
  childState.modalOpen = false
}
const registerAgent = async () => {
  try {
    childState.modalOpen = false
  } catch (e) {
    $toast.error(e)
  }
}
</script>

<style scoped></style>
