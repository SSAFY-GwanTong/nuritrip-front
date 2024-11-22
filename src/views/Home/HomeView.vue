<template>
    <div class="mainpage">
      <div class="div">
        <img class="shiba-inu-dog" alt="Shiba inu dog" :src="shibaInuDogShowingMuscles" />
        <div class="group">
          <div class="overlap-group-wrapper">
            <div class="overlap-group">
              <div class="text-wrapper">시작하기</div>
            </div>
          </div>
          <p class="p">
            당신의 체력에 맞춘
            <br />
            맞춤형 여행 코스
          </p>
          <p class="text-wrapper-2">
            체력 측정부터 여행 일정까지, <br />
            여행 매니저와 함께하는 완벽한 여행 준비
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import shibaInuDogShowingMuscles from '@/assets/img/shiba-inu-dog-showing-muscles.png'
  </script>
  
  <style scoped>
  .mainpage {
    background-color: #fff1da;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
  .mainpage .div {
    background-color: #fff1da;
    height: 900px;
    overflow-x: hidden;
    position: relative;
    width: 1440px;
  }
  .mainpage .shiba-inu-dog {
    height: 667px;
    left: 695px;
    object-fit: cover;
    position: absolute;
    top: 157px;
    width: 667px;
  }
  .mainpage .group {
    height: 397px;
    left: 106px;
    position: absolute;
    top: 260px;
    width: 511px;
  }
  .mainpage .overlap-group-wrapper {
    height: 70px;
    left: 0;
    position: absolute;
    top: 327px;
    width: 225px;
  }
  .mainpage .overlap-group {
    background-color: #f66f4d;
    border-radius: 40px;
    height: 70px;
    width: 223px;
  }
  .mainpage .text-wrapper {
    color: #ffffff;
    font-size: 25px;
    font-weight: 600;
    left: 65px;
    letter-spacing: 0;
    line-height: 16px;
    position: absolute;
    text-align: center;
    top: 27px;
    white-space: nowrap;
  }
  .mainpage .p {
    color: #000000;
    font-size: 60px;
    font-weight: 600;
    left: 0;
    letter-spacing: 0;
    line-height: 100px;
    top: 0;
    width: 507px;
  }
  .mainpage .text-wrapper-2 {
    color: #000000;
    font-size: 25px;
    font-weight: 400;
    left: 0;
    letter-spacing: 0;
    line-height: 35px;
    position: absolute;
    top: 216px;
    width: 507px;
  }
  
  .mainpage .div-wrapper {
    border: 1.4px solid;
    border-color: #f66f4d;
    border-radius: 27px;
    height: 54px;
    left: 129px;
    top: 0;
    width: 170px;
  }
  .mainpage .text-wrapper-3 {
    color: #f66f4d;
    font-family: 'Poppins-SemiBold', Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 44px;
    letter-spacing: 0;
    line-height: 16px;
    text-align: center;
    top: 18px;
    width: 80px;
  }
  .mainpage .text-wrapper-4 {
    color: #2d3134;
    font-family: 'Poppins-SemiBold', Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 0;
    letter-spacing: 0;
    line-height: 16px;
    text-align: center;
    top: 19px;
    width: 80px;
  }
  .mainpage .logo {
    height: 35px;
    left: 107px;
    top: 44px;
    width: 216px;
  }
  .mainpage .union {
    height: 35px;
    left: 0;
    top: 0;
    width: 42px;
  }
  .mainpage .text-wrapper-5 {
    color: #2d3134;
    font-family: 'Sen-Bold', Helvetica;
    font-size: 30px;
    font-weight: 700;
    left: 48px;
    letter-spacing: 0;
    line-height: 20px;
    top: 7px;
    white-space: nowrap;
  }
  </style>
  