<template>
    <div class="contents">
      <div class="exercise-content">
        <!-- 왼쪽: 맥박 이미지 -->
        <img :src="pulseImage" alt="맥박 재기" />
      </div>
      <div class="counter-section">
        <!-- 오른쪽: 카운트다운 -->
        <div class="progress-circle">
          <svg class="circle" width="120" height="120">
            <circle class="background" cx="60" cy="60" r="50" fill="none" stroke="#eee" stroke-width="10" />
            <circle
              class="progress"
              cx="60"
              cy="60"
              r="50"
              fill="none"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - ((countdown / 60) * circumference)"
              stroke="#ff6347"
              stroke-width="10"
              stroke-linecap="round"
            />
          </svg>
          <div class="counter-number">{{ countdown }}</div>
        </div>
        <div class="pulse-input">
          <label for="pulse">맥박 입력:</label>
          <input id="pulse" type="number" placeholder="맥박을 입력하세요" v-model="pulseInput" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    countdown: Number,
    pulseImage: String,
    circumference: Number,
  })
  </script>
  
  <style scoped>
  .exercise-content img {
    width: 400px;
    height: auto;
    border-radius: 10px;
  }
  .progress-circle {
    position: relative;
    width: 120px;
    height: 120px;
  }
  .circle {
    transform: rotate(-90deg);
    transform-origin: center;
  }
  .background {
    opacity: 0.3;
  }
  .progress {
    transition: stroke-dashoffset 0.3s ease-in-out;
  }
  .counter-number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  .pulse-input {
    margin-top: 20px;
    text-align: center;
  }
  </style>
  