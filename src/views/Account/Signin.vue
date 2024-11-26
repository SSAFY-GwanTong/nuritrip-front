<template>
  <div class="main-container">
    <img :src="BgImg" alt="" class="bg-img">
    <div class="signin">
      <div class="group-wrapper">
        <div class="group">
          <div class="overlap-group">
            <div class="title">로그인</div>
            <InputBox type="id" content="아이디" @update-input="handleInputUpdate"></InputBox>
            <InputBox type="password" content="비밀번호" @update-input="handleInputUpdate"></InputBox>
            <div class="text-wrapper">
              <RouterLink to="/signup" class="register">회원가입</RouterLink>
              <p>Forgot password?</p>
            </div>
            <button class="button" @click="login">
              <div class="publish">로그인</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputBox from '@/views/Account/components/InputBox.vue'
import BgImg from '@/assets/img/cover1.png'
import { ref } from 'vue';
import { axiosInstance } from '@/axios.js';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/index.js';

const router = useRouter();
const store = useAuthStore();

const id = ref('')
const password = ref('')
const handleInputUpdate = (data) => {
  if(data.type === "id"){
    id.value = data.value;
  }else if(data.type === "password"){
    password.value = data.value;
  }
}

const login = () => {
  const params = {
    id: id.value, 
    password: password.value, 
  }
  axiosInstance.post(`/auth/signin`, params)
    .then((res) => {
      if(res.data.isSuccess === true){
        const data = res.data.result
        store.setJwtToken(data.jwtToken)
        router.push({path: '/home', state:{name: data.name}})
      }else{
        alert("로그인 실패!")
      }
    })
    .catch((err) => {
      alert("로그인 실패!")
    })
}


</script>

<style scoped>
.main-container {
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}
.bg-img{
  position: relative;
  height: 100vh;
  margin-left :180px;
}
.signin {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  left: 30px;
  top: 110px;
}

.overlap-group {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 610px;
  width: 580px;
  margin-left: 10%;
  background-color: white;
  z-index: 1;
  border-radius: 15px;
  /* box-shadow: 0 1px 13px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); */
}

.signin .text-wrapper {
  display: flex;
  font-family: 'Red Hat Display-Medium', Helvetica;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  text-align: right;
  width: 393px;
  margin-right: 20px;
  margin-top: 10px;
  justify-content: space-between;
}
.text-wrapper p, .register{
  margin: 0;
  color: #ac68f7;
  text-decoration: underline;
  cursor: pointer;
}

.signin .title {
  font-family: 'Red Hat Display-SemiBold', Helvetica;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 42px;
  width: 416px;
  margin-bottom: 40px;
  margin-top: 45px;
}

.signin .button {
  all: unset;
  background-color: #fea14e;
  border-radius: 10px;
  box-sizing: border-box;
  height: 46px;
  width: 393px;
  margin-right: 20px;
  margin-top: 90px;
  cursor: pointer;
}

.signin .publish {
  color: #2d3134;
  font-family: 'Red Hat Display-Bold', Helvetica;
  font-size: 18px;
  font-weight: 700;
  height: 24px;
  letter-spacing: 0;
  line-height: normal;
  text-align: center;
}
</style>
