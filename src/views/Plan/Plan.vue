<template lang="">
    <div class="main-container">
      <div class="guide">
        <img :src="shiba" alt="" />
        <SpeechBubble :contents="guideContents" class="speech-bubble"></SpeechBubble>
      </div>
      <div class="choice">
          <Select content="지역"></Select>
          <div class="line"></div>
          <DatePicker></DatePicker>
          <div class="circle">
              <i class="pi pi-search"></i>
          </div> 
      </div>
      <div class="map">
          <Map></Map>
      </div>
      <div class="day-container">
          <div class="days">
              <div 
                  v-for="day in days" 
                  :key="day" 
                  class="day" 
                  :class="{ active: selectedDay === day }" 
                  @click="selectDay(day)"
              >
                  {{ day }}일차
              </div>
          </div>
      </div>
      <div class="plans">
         <DetailPlan></DetailPlan>
      </div>
      <div class="store">
        <div>
            저장하기
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'; // ref를 import
  import shiba from '@/assets/img/shiba-inu-dog.png'
  import SpeechBubble from './components/SpeechBubble.vue'
  import DatePicker from './components/DatePicker.vue';
  import Select from './components/Select.vue';
  import Map from './components/Map.vue';
  import DetailPlan from './components/DetailPlan.vue';
  import Button from 'primevue/button';
  import { useAuthStore } from '@/stores/index.js'
  
  const store = useAuthStore()
  const name = store.getName
  const days = [1, 2, 3, 4, 5]
  const guideContents = [
    '여행지와 날짜를 선택하세요.',
    `${name} 님의 체력 레벨에 맞는 여행 코스를 추천해드릴게요!`,
  ]
  
  const selectedDay = ref(null); // 선택된 day를 저장할 ref
  
  const selectDay = (day) => {
    selectedDay.value = day; // 클릭된 day를 selectedDay에 저장
    console.log(`Selected day: ${day}`); // 선택된 day 출력
  }
  </script>
  
  <style scoped>
  .main-container{
    min-width:800px;
  }
  .guide {
    display: flex;
    justify-content: center;
    margin-top: 30px;

  }
  img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .speech-bubble {
    margin-top: 13px;
  }
  .choice {
      margin: 0 auto;
      margin-top: 10px;
      display: flex;
      width: 470px;
      height: 65px;
      border-radius: 50px;
      align-items: center;
      justify-content: space-between;
      background-color: var(--lightgray); 
  }
  .line {
      height: 65%;
      border: 0.7px solid #EAEAEB;
  }
  .circle {
      height: 50px;
      width: 50px;
      background-color: var(--maincolor);
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 15px;
      cursor: pointer;
  }
  i {
      font-size: 17px;
      color: white;
  }
  .map {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 20px;
  }
  .day-container {
      display: flex;
      justify-content: center;
  }
  .days {
      width: 85%;
      display: flex;
  }
  .day {
      border: 1px solid var(--unselected-day);
      border-radius: 30px;
      width: 65px;
      height: 35px;
      justify-content: center;
      text-align: center;
      line-height: 35px;
      margin-right: 10px;
      color: var(--unselected-day);
      font-size: 15px;
      cursor: pointer;
      transition: background-color 0.3s; /* 부드러운 색상 전환 */
  }
  .day.active {
      background-color: var(--bluecolor); /* 선택된 day의 배경색 */
      border: none;
      color: white; /* 선택된 day의 글자색 */
  }
  .store{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
    cursor: pointer;
  }
  .store div{
    background-color: var(--blackcolor); 
    width: 300px;
    height: 50px;
    border-radius: 15px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  