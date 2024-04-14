<template>
  <q-dialog v-model="modalOpen" persistent>
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
        <q-btn label="Cancel" color="primary" @click="modalOpen = false" />
        <q-btn label="Register" color="primary" @click="registerAgent" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    isOpen: Boolean
  },
  setup(props) {
    const modalOpen = ref(false)

    const openModal = () => {
      modalOpen.value = true
    }

    const registerAgent = async () => {
      try {
        modalOpen.value = false
        console.log('register')
      } catch (e) {
        $toast.error(e)
      }
    }

    watch(
      () => props.isOpen,
      (newValue) => {
        modalOpen.value = newValue
      }
    )

    return {
      modalOpen,
      openModal,
      registerAgent
    }
  }
}
</script>

<style scoped></style>
