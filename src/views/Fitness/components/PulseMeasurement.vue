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
        <!-- 맥박 입력 필드 -->
        <div v-if="countdown <= 0 && isInputVisible" class="pulse-input">
          <label for="pulse">맥박 입력:</label>
          <input
            id="pulse"
            type="number"
            placeholder="맥박을 입력하세요"
            v-model="pulseInput"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, } from 'vue'
  
  const props = defineProps({
    pulseImage: String,
    circumference: Number,
  })
  
  // 카운트다운 및 맥박 입력 처리
  const countdown = ref(5) // 초기값: 대기 시간 5초
  const pulseInput = ref('') // 맥박 입력
  const isInputVisible = ref(false) // 맥박 입력 필드 표시 여부
  
  // 타이머 관련 변수
  let timer = null
  let countdownTimer = null
  
  // 대기 시간 5초 후 카운트다운 시작
  const startCountdown = () => {
    console.log('5초 대기 시작')
    countdown.value = 5
    countdownTimer = setInterval(() => {
      console.log(countdown.value)
      countdown.value--
      if (countdown.value < 0) {
        clearInterval(countdownTimer)
        startPulseMeasurement() // 60초 카운트다운 시작
      }
    }, 1000)
  }
  
  // 60초 카운트다운 시작
  const startPulseMeasurement = () => {
    console.log('60초 카운트다운 시작')
    countdown.value = 60 // 카운트다운 초기값 60초
    timer = setInterval(() => {
      countdown.value--
      if (countdown.value < 0) {
        clearInterval(timer)
        countdown.value = 0
        isInputVisible.value = true // 맥박 입력 필드 표시
        console.log('카운트다운 완료. 맥박 입력 필드 활성화.')
      }
    }, 1000)
  }
  
  // 컴포넌트가 마운트될 때 대기 시간 시작
  onMounted(() => {
    startCountdown()
  })
  
  // 컴포넌트가 언마운트되기 전에 타이머 정리
  onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
    if (countdownTimer) clearInterval(countdownTimer)
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
  