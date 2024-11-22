<template>
  <div class="main-container">
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
</script>

<style scoped>
.main-container {
  background-color: transparent;
  background-image: url('@/assets/img/cover1.png');
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-position: right top;
}
.signin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  float: left;
  margin: 0 auto;
  margin-left: 150px;
}

.overlap-group {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 610px;
  width: 580px;
  background-color: white;
  z-index: 1;
  border-radius: 10px;
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
  color: #000000;
  font-family: 'Red Hat Display-Bold', Helvetica;
  font-size: 18px;
  font-weight: 700;
  height: 24px;
  letter-spacing: 0;
  line-height: normal;
  text-align: center;
}
</style>
