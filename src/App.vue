<template>
  <div class="app">
    <Logo v-if="['SignIn', 'SignUp'].includes($route.name) == true"></Logo>
    <NavbarBeforeLogin v-else></NavbarBeforeLogin>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import NavbarBeforeLogin from './components/navbar/NavbarBeforeLogin.vue'
import Logo from './components/navbar/Logo.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
* {
  font-family: 'Red Hat Display', sans-serif;
}
body {
  margin: 0;
}

.app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
