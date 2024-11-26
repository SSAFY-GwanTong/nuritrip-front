<template>
  <div class="mainpage">
      <div class="group">
        <p class="p">
          당신의 체력에 맞춘
          <br />
          맞춤형 여행 코스
        </p>
        <p class="text-wrapper-2">
          체력 측정부터 여행 일정까지 <br />
          여행 매니저와 함께하는 완벽한 여행 준비
        </p>
        <RouterLink to="/signin" class="overlap-group-wrapper">
          <div class="overlap-group">
            <div class="text-wrapper">시작하기</div>
          </div>
        </RouterLink>
      </div>
      <img class="shiba-inu-dog" alt="Shiba inu dog" :src="shibaInuDogShowingMuscles" />
    </div>
</template>

<script setup>
import shibaInuDogShowingMuscles from '@/assets/img/shiba-inu-dog-showing-muscles.png'
</script>

<style scoped>
body{
  width: 100%;
  height: 100%;
  overflow-x: scroll;
}
.mainpage {
  background-color: var(--bgcolor);
  display: flex;
  width: 100%;
  height: calc(100vh - 120px);
  justify-content: center;
  min-width: 1200px;
}
.mainpage .shiba-inu-dog {
  height: 600px;
  width: 600px;
  object-fit: contain;
}
.mainpage .group {
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
}
.mainpage .overlap-group-wrapper {
  height: 70px;
  width: 200px;
  text-decoration: none;
}
.mainpage .overlap-group {
  background-color: var(--maincolor);
  border-radius: 40px;
  height: 70px;
  width: 223px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mainpage .text-wrapper {
  color: #ffffff;
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 16px;
  text-align: center;
  white-space: nowrap;
}
.mainpage .p {
  font-size: 60px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 100px;
  width: 507px;
  margin: 0;
  padding: 0;
}
.mainpage .text-wrapper-2 {
  font-size: 25px;
  font-weight: 400;
  left: 0;
  letter-spacing: 0;
  line-height: 35px;
  width: 507px;
  margin-bottom: 80px;
}

.mainpage .div-wrapper {
  border: 1.4px solid;
  border-color: var(--maincolor);
  border-radius: 27px;
  height: 54px;
  width: 170px;
}
.mainpage .text-wrapper-3 {
  color: var(--maincolor);
  font-family: 'Poppins-SemiBold', Helvetica;
  font-size: 20px;
  font-weight: 600;
  left: 44px;
  letter-spacing: 0;
  line-height: 16px;
  text-align: center;
  width: 80px;
}
.mainpage .text-wrapper-4 {
  font-family: 'Poppins-SemiBold', Helvetica;
  font-size: 20px;
  font-weight: 600;
  left: 0;
  letter-spacing: 0;
  line-height: 16px;
  text-align: center;
  width: 80px;
}
.mainpage .union {
  height: 35px;
  width: 42px;
}
.mainpage .text-wrapper-5 {
  font-family: 'Sen-Bold', Helvetica;
  font-size: 30px;
  font-weight: 700;
  left: 48px;
  letter-spacing: 0;
  line-height: 20px;
  white-space: nowrap;
}
</style>
