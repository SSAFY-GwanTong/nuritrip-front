<template>
    <div>
      <!-- 콘텐츠 영역 -->
      <div class="contents">
        <!-- 왼쪽: 웹캠 -->
        <div class="webcam-container">
          <canvas id="canvas" class="webcam"></canvas>
        </div>
  
        <!-- 오른쪽: 카운터 -->
        <div class="counter-section">
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
                :stroke-dashoffset="circumference - ((counter % 10) / 10) * circumference"
                stroke="#ff6347"
                stroke-width="10"
                stroke-linecap="round"
              />
            </svg>
            <div class="counter-number">{{ counter }}</div>
          </div>
        </div>
      </div>
  
      <!-- 아래쪽: 남은 시간을 표시하는 직선 바 -->
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue'
  
  const emit = defineEmits(['nextExercise'])
  
  const counter = ref(0)
  const circumference = 2 * Math.PI * 50
  const progress = ref(100) // 진행률 초기값 (100%)
  const duration = 10 // 진행 시간 (초)
  const interval = 100 // 업데이트 간격 (ms)
  
  let model = null
  let webcam = null
  let canvasCtx = null
  let timer = null
  let countdownTimer = null
  
  // Teachable Machine 초기화
  const initTeachableMachine = async () => {
    try {
      const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/8VC6L_Qre/'
      const modelURL = `${MODEL_URL}model.json`
      const metadataURL = `${MODEL_URL}metadata.json`
      model = await window.tmPose.load(modelURL, metadataURL)
  
      const size = 300
      webcam = new window.tmPose.Webcam(size, size, true) // flip: true
      await webcam.setup()
      await webcam.play()
  
      const canvas = document.getElementById('canvas')
      canvas.width = size
      canvas.height = size
      canvasCtx = canvas.getContext('2d')
  
      startCountdown() // 5초 대기 시작
    } catch (error) {
      console.error('Teachable Machine 초기화 실패:', error)
    }
  }
  
  // 5초 대기
  const startCountdown = () => {
    let countdown = 5
    console.log('웹캠 초기화 완료. 5초 대기 시작.')
    countdownTimer = setInterval(() => {
      console.log(countdown)
      countdown--
      if (countdown < 0) {
        clearInterval(countdownTimer)
        startProgressBar() // 진행 바 시작
      }
    }, 1000)
  }
  
  // 진행 바 시작
  const startProgressBar = () => {
    const totalTicks = (duration * 1000) / interval
    let currentTick = 0
  
    console.log('진행 바 시작.')
    timer = setInterval(() => {
      currentTick++
      progress.value = (currentTick / totalTicks) * 100 // 진행 바 감소 방향 반전
  
      if (currentTick >= totalTicks) {
        clearInterval(timer)
        emit('nextExercise') // 다음 운동으로 이동
      }
    }, interval)
  }
  
  // 컴포넌트가 마운트될 때 실행
  onMounted(async () => {
    await initTeachableMachine()
  })
  
  // 컴포넌트가 언마운트되기 전에 실행
  onBeforeUnmount(() => {
    if (webcam) {
      webcam.stop()
    }
    if (timer) {
      clearInterval(timer)
    }
    if (countdownTimer) {
      clearInterval(countdownTimer)
    }
  })
  </script>
  
  <style scoped>
  .contents {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  
  /* 웹캠 */
  .webcam-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .webcam {
    width: 300px; /* 크기 조정 */
    height: auto;
    border-radius: 10px;
    background-color: #000; /* 웹캠 미사용 시 빈 화면 */
  }
  
  /* 카운터 */
  .counter-section {
    flex: 0.3;
    display: flex;
    justify-content: center;
    align-items: center;
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
  
  /* 진행 바 */
  .progress-bar-container {
    margin-top: 20px;
    height: 10px;
    background-color: #eee;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #ff6347;
    transition: width 0.1s linear;
  }
  </style>
  