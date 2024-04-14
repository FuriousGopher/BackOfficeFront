<template>
  <div class="login-wrapper">
    <div class="login-header">
      <img src="/logo-home.png" alt="logo" />
    </div>
    <div class="title">Back Office</div>
    <div class="login-board">
      <div class="login-container">
        <h4>Login</h4>
        <form @submit.prevent="userLogin">
          <div class="form-group">
            <label for="username">Email:</label>
            <input type="text" id="username" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>If you dont have access ask your manager</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '/src/api/api.ts'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import router from '@/router/index.ts'

const email = ref('testIvan@gmail.com')
const password = ref('q1w2e3r4')
const $toast = useToast()

const userLogin = async () => {
  try {
    await login({ email: email.value, password: password.value })
    $toast.success('Successfully logged in')
    router.push('/home')
  } catch (e) {
    $toast.error(e.response.data)
  }
}
</script>

<style scoped>
.login-board {
  display: flex;
  height: calc(80vh - 200px);
}

.login-container {
  justify-content: center;
  align-items: center;
  padding: 40px 80px;
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

.login-header > img {
  width: 500px;
  height: 150px;
}

.title {
  font-size: 40px;
  text-align: center;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 10px;
}
</style>
