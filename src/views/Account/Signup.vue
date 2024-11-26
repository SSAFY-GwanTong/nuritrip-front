<template>
  <div class="main-container">
    <div class="left-container">
      <div class="signup">
        <div class="title">회원가입</div>
        <InputBox content="아이디" type="user_id" @update-input="handleInputUpdate"></InputBox>
        <InputBox content="이름" type="name" @update-input="handleInputUpdate"></InputBox>
        <InputBox content="비밀번호" type="password" @update-input="handleInputUpdate"></InputBox>
        <div class="attr">
          <div class="flex items-center gap-2">
            <RadioButton v-model="gender" inputId="f" name="gender" value="f" />
            <label for="f">여자</label>
          </div>
          <div class="flex items-center gap-2 m-button">
            <RadioButton v-model="gender" inputId="m" name="gender" value="m" />
            <label for="m">남자</label>
          </div>
          <div class="num-input">
            <p>나이</p>
            <InputNumber v-model="age" inputId="integeronly" :min="0" :max="100" fluid />
          </div>  
        </div>
        <button class="button" @click="register">
          <div class="publish">회원가입</div>
        </button>
      </div>
    </div>
    <div class="right-container">
      <img :src="Car" alt="img" />
    </div>
  </div>
</template>

<script setup>
import Car from '@/assets/img/Car.png'
import InputBox from './components/InputBox.vue'
import RadioButton from 'primevue/radiobutton';
import InputNumber from 'primevue/inputnumber';
import { ref } from 'vue';
import { axiosInstance } from '@/axios.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const user_id = ref('')
const password = ref('')
const name = ref('')
const gender = ref('')
const age = ref(20)

const handleInputUpdate = (data) => {
  if(data.type === "user_id"){
    user_id.value = data.value;
  }else if(data.type === "password"){
    password.value = data.value;
  }else if(data.type === "name"){
    name.value = data.value;
  }
}

const register = () => {
  const params = ref({
    user_id: user_id.value, 
    password: password.value, 
    name: name.value, 
    age: age.value,
    gender: gender.value
  })
  axiosInstance.post(`/users/signup`, params.value)
    .then((res) => {
      if(res.data.isSuccess === true){
        router.push('/signin')
      }else{
        alert("회원가입 실패!")
      }
    })
    .catch((err) => {
      alert("회원가입 실패! 새로운 아이디로 다시 도전하세요.")
    })
}

</script>

<style scoped>
.main-container {
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  background-color: #fff1da;
  min-width: 1200px;
}
img {
  margin-right: 150px;
  margin-top: -130px;
}
.right-container {
  float: right;
  height: 100%;
  background-color: #fff1da;
  align-items: center;
}
.left-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  float: left;
  margin: 0 auto;
  margin-left: 10vw;
}
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 600px;
  width: 550px;
  z-index: 1;
  border-radius: 15px;
  background-color: #ffffff;
  opacity: 0.9;
  margin-top: -60px;
}

.title {
  font-family: 'Red Hat Display-SemiBold', Helvetica;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 42px;
  width: 416px;
  margin-bottom: 20px;
  margin-top: 40px;
}

.button {
  all: unset;
  background-color: #fea14e;
  border-radius: 10px;
  box-sizing: border-box;
  height: 46px;
  width: 393px;
  margin-right: 20px;
  margin-top: 50px;
  cursor: pointer;
}

.publish {
  color: #2d3134;
  font-family: 'Red Hat Display-Bold', Helvetica;
  font-size: 18px;
  font-weight: 700;
  height: 46px;
  letter-spacing: 0;
  line-height: 46px;
  text-align: center;
}

.attr{
  margin-top: 25px;
  display: flex;
  width: 393px;
  margin-right: 21px;
  align-items: center;
  justify-content: space-between;
}
.p-inputnumber{
  width: 53px;
  height: 40px;
}
.num-input{
  display: flex;
  justify-content: center;
  align-items: center;
}
.num-input p{
  margin-right: 20px;
}
.p-radiobutton{
  margin-right: 10px;
}
label{
  cursor: pointer;
}
.m-button{
  margin-right: 50px;
}
</style>
