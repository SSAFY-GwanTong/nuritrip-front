import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'
import 'primeicons/primeicons.css'
import { useKakao } from 'vue3-kakao-maps/@utils'
const { VITE_KAKAO_MAP_API_KEY } = import.meta.env
useKakao(VITE_KAKAO_MAP_API_KEY)

const app = createApp(App)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{Orange.50}',
      100: '{Orange.100}',
      200: '{Orange.200}',
      300: '{Orange.300}',
      400: '{Orange.400}',
      500: '{Orange.500}',
      600: '{Orange.600}',
      700: '{Orange.700}',
      800: '{Orange.800}',
      900: '{Orange.900}',
      950: '{Orange.950}',
    },
  },
})


app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
})

app.mount('#app')
