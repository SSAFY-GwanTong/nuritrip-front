<template>
  <div>
    <!-- 가이드 영역 -->
    <div class="guide">
      <img :src="shiba" alt="Guide Character" />
      <SpeechBubble :contents="guideContents" class="speech-bubble"></SpeechBubble>
    </div>

    <!-- 콘텐츠 영역 -->
    <component
      :is="currentComponent"
      :video-source="currentExerciseData.source"
      :counter="counter"
      :circumference="circumference"
      :countdown="countdown"
      :pulse-image="pulseImage"
      @startMeasurement="startMeasurement"
      @nextExercise="nextExercise"
    ></component>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SpeechBubble from '@/components/SpeechBubble.vue'
import shiba from '@/assets/img/shiba-inu-dog-showing-muscles.png'
import ShowVideo from './components/ShowVideo.vue'
import Measurement from './components/Measurement.vue'
import PulseMeasurement from './components/PulseMeasurement.vue'

// 가이드 내용
const guideContents = ['체력 측정을 시작합니다!', '다음 동작을 20초 안에 최대한 많이 따라하세요']

// 운동 데이터
const exercises = ref([
  { name: '스쿼트', type: 'video', source: 'https://ghwns82.github.io/tmp/squat.mp4' },
  { name: '버피', type: 'video', source: 'https://ghwns82.github.io/tmp/burpee.mp4' },
  { name: '싯업', type: 'video', source: 'https://ghwns82.github.io/tmp/situps.mp4' },
  { name: '벤치 클라임', type: 'image', source: 'data:image/jpeg;base64,/9j/4AA...' },
])

const pulseImage = 'data:image/jpeg;base64,/9j/4AA...'
const stage = ref('show-video')
const currentExercise = ref(0)
const counter = ref(0)
const countdown = ref(60)
const circumference = 2 * Math.PI * 50

// 현재 운동 데이터
const currentExerciseData = computed(() => exercises.value[currentExercise.value])

// 현재 컴포넌트
const currentComponent = computed(() => {
  if (stage.value === 'show-video') return ShowVideo
  if (stage.value === 'measurement') return Measurement
  if (stage.value === 'pulse-measurement') return PulseMeasurement
})

// 이벤트 핸들러
const startMeasurement = () => (stage.value = 'measurement')
const nextExercise = () => {
  if (currentExercise.value === exercises.value.length - 1) {
    stage.value = 'pulse-measurement'
  } else {
    counter.value = 0
    currentExercise.value++
    stage.value = 'show-video'
  }
}
</script>

<style scoped>
/* 가이드 영역 스타일 */
.guide {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
img {
  width: 100px;
  height: 100px;
  margin-right: 25px;
}
.speech-bubble {
  margin-top: 13px;
}

/* 콘텐츠 영역 */
.contents {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;
  gap: 20px;
}

/* 기본 버튼 스타일 */
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #ff4500;
}

/* 공통 원형 진행 바 스타일 */
.progress-circle {
  position: relative;
  width: 120px;
  height: 120px;
}
.circle {
  transform: rotate(-90deg); /* 시작 위치를 위로 이동 */
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

/* 맥박 입력 필드 */
.pulse-input {
  margin-top: 20px;
  text-align: center;
}
</style>
