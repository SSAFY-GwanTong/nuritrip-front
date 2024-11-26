<template>
  <div class="main-container">
    <img :src="BgImg" alt="" class="bg-img">
    <div class="signin">
      <div class="group-wrapper">
        <div class="group">
          <div class="overlap-group">
            <div class="title">로그인</div>
            <InputBox content="아이디"></InputBox>
            <InputBox content="비밀번호"></InputBox>
            <div class="text-wrapper">Forgot password?</div>
            <button class="button">
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
</script>

<style scoped>
.main-container {
  background-color: transparent;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
}
.bg-img{
  position: relative;
  width:
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
  box-shadow: 0 1px 13px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.signin .text-wrapper {
  color: #ac68f7;
  font-family: 'Red Hat Display-Medium', Helvetica;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  text-align: right;
  text-decoration: underline;
  width: 416px;
  margin-top: 10px;
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
  width: 416px;
  margin-top: 90px;
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
