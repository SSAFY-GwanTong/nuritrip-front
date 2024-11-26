import axios from 'axios'
import { useAuthStore } from '@/stores/index'
import router from './router'

//Axios 인스턴스 생성 및 기본 설정
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
})

axiosInstance.interceptors.request.use((config) => {
  const store = useAuthStore()
  const access_token = store.jwtToken
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const status = error.response.status
      if (error.response.data.requestURI) {
        console.error('401 Unauthorized')
        router.push(`${error.response.data.requestURI}`)
      } else {
        console.error(`HTTP Error: ${status} ${error.response.statusText}`)
      }
    } else {
      console.error('Network Error: ', error.message)
    }
    return Promise.reject(error)
  },
)

export { axiosInstance }
