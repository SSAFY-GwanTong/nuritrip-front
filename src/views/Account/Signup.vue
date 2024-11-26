<template>
  <div class="main-container">
    <div class="left-container">
      <div class="signup">
        <div class="title">회원가입</div>
        <InputBox content="아이디"></InputBox>
        <InputBox content="이름"></InputBox>
        <InputBox content="비밀번호"></InputBox>
        <InputBox content="비밀번호 확인"></InputBox>
        <button class="button">
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
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fff1da;
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
}

.title {
  font-family: 'Red Hat Display-SemiBold', Helvetica;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 42px;
  width: 416px;
  margin-bottom: 20px;
  margin-top: 45px;
}

.button {
  all: unset;
  background-color: #fea14e;
  border-radius: 10px;
  box-sizing: border-box;
  height: 46px;
  width: 416px;
  margin-top: 60px;
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
</style>
