<template lang="">
    <div class="main-container">
      <!-- <div class="title">
        <img src="https://img.freepik.com/free-psd/3d-rendering-travel-still-life_23-2151799375.jpg?ga=GA1.1.624011667.1732600568&semt=ais_hybrid">
        <p>{{}}</p>
        <p></p>
      </div> -->
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
          <DetailPlan v-if="info" :info="info" :selectedDay="selectedDay"></DetailPlan>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'; // ref를 import
  import Map from './components/Map.vue';
  import DetailPlan from './components/DetailPlan.vue';
  import Button from 'primevue/button';
  import { useAuthStore } from '@/stores/index.js'
  import { axiosInstance } from '@/axios';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  
  const days = [1, 2, 3, 4, 5]
  const selectedDay = ref(1); // 선택된 day를 저장할 ref
  const info = ref(null);
  const plans = ref();

  axiosInstance.get(`users/my/plans/${route.params.plan_id}`)
    .then((res) => {
      info.value = res.data.result;
      console.log(info.value)
    })
  const selectDay = (day) => {
    selectedDay.value = day; // 클릭된 day를 selectedDay에 저장
  }
  </script>
  
  <style scoped>
  .main-container{
    min-width:930px;
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

  </style>
  