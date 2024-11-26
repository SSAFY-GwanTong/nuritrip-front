<template>
  <div class="app">
    <LogoLogin v-if="['SignIn'].includes($route.name) == true"></LogoLogin>
    <LogoSignUp v-else-if="['SignUp'].includes($route.name) == true"></LogoSignUp>
    <NavbarBeforeLogin v-else-if="['HomeView'].includes($route.name) == true"></NavbarBeforeLogin>
    <NavbarAfterLogin @set-name="setName" v-else></NavbarAfterLogin>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import NavbarBeforeLogin from './components/navbar/NavbarBeforeLogin.vue'
import LogoLogin from './components/navbar/LogoLogin.vue'
import LogoSignUp from './components/navbar/LogoSignUp.vue'
import NavbarAfterLogin from './components/navbar/NavbarAfterLogin.vue'
import { ref } from 'vue'
const name = ref('')
const setName = (value) => {
  name.value = value
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
* {
  font-family: 'Red Hat Display', sans-serif;
  color: var(--textcolor);
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.app {
  display: flex;
  width: 100vw;
  flex-direction: column;
}
</style>
