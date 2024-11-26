<template>
  <div class="contents">
    <div class="exercise-content">
      <!-- 왼쪽: 맥박 이미지 -->
      <img :src="pulseImage" alt="맥박 재기" />
    </div>
    <div class="counter-section">
      <!-- 오른쪽: 카운트다운 -->
      <div class="progress-circle" v-if="countdown > 0">
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
        <button class="btn btn-primary" @click="submitPulse">완료</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 부모에게 체력검사가 완료되었음을 알리는 이벤트
const emit = defineEmits(['pulseComplete']);

const props = defineProps({
  pulseImage: String,
  circumference: Number,
});

// 카운트다운 및 맥박 입력 처리
const countdown = ref(60); // 초기값: 60초
const pulseInput = ref(''); // 맥박 입력 값
const isInputVisible = ref(false); // 맥박 입력 필드 표시 여부

// 타이머 관련 변수
let timer = null;

// 60초 카운트다운 시작
const startPulseMeasurement = () => {
  console.log('60초 카운트다운 시작');
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value < 0) {
      clearInterval(timer);
      countdown.value = 0;
      isInputVisible.value = true; // 맥박 입력 필드 표시
      console.log('카운트다운 완료. 맥박 입력 필드 활성화.');
    }
  }, 1000);
};

// 맥박 입력 완료 시 부모로 emit
const submitPulse = () => {
  console.log(`맥박 입력 완료: ${pulseInput.value}`);
  emit('pulseComplete', pulseInput.value); // 부모 컴포넌트로 값 전달
};

// 키보드 입력 처리
const handleKeydown = (event) => {
  if (event.key === '9') {
    console.log('숫자 9 입력, 카운트다운 종료');
    countdown.value = 0;
    isInputVisible.value = true;
    clearInterval(timer); // 타이머 종료
  }
};

// 컴포넌트가 마운트될 때 타이머 시작 및 키보드 이벤트 등록
onMounted(() => {
  startPulseMeasurement();
  document.addEventListener('keydown', handleKeydown); // 키보드 이벤트 추가
});

// 컴포넌트가 언마운트되기 전에 타이머 정리 및 키보드 이벤트 제거
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
  document.removeEventListener('keydown', handleKeydown); // 키보드 이벤트 제거
});
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

.btn {
  margin-top: 10px;
}
</style>
