import axios from 'axios'

export const BASE_URL = 'https://clearvue-back.onrender.com'
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})
