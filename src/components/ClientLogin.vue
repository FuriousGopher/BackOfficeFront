<template>
  <div class="login-wrapper">
    <div class="login-header">
      <img src="/backOffice.png" alt="logo" />
    </div>
    <div class="login-board">
      <div class="login-container">
        <h4>Login</h4>
        <form @submit.prevent="clientLogin">
          <div class="form-group">
            <label for="username">Email: cardis@bing.com</label>
            <input type="text" id="username" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="vatNumber">Vat number: 8484484844</label>
            <input type="text" id="vatNumber" v-model="vatNumber" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import router from '@/router/index.ts'
import { customerLogin } from '@/api/customersApi.ts'

const email = ref('')
const vatNumber = ref('')
const $toast = useToast()

const clientLogin = async () => {
  try {
    const result = await customerLogin(email.value, vatNumber.value)
    router.push({ path: '/client-company-page', query: { id: result } })
  } catch (e) {
    $toast.error(e.response.data)
  }
}
</script>

<style scoped>
.login-board {
  display: flex;
}

.login-container {
  justify-content: center;
  align-items: center;
  padding: 50px ;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.form-group {
  margin-bottom: 15px;
}

h4 {
  text-align: center;
}

label {
  display: block;
  margin-bottom: 5px;
}

.login-wrapper {
  display: flex;
  flex-direction: column;
}

h2 {
  text-align: center;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 3px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.login-header {
  text-align: center;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 10px;
}
</style>
