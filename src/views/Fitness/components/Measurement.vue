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
              :stroke-dashoffset="circumference - (currentCounter / 10) * circumference"
              stroke="#ff6347"
              stroke-width="10"
              stroke-linecap="round"
            />
          </svg>
          <div class="counter-number">
            {{ counter }} <span class="small">개</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 제한 시간 바 -->
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: `${timeProgress}%` }"></div>
    </div>

    <!-- 제한 시간 텍스트 -->
    <div class="remaining-time">{{ remainingTime }}초 남음</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue';

// Props 정의
const props = defineProps({
  exerciseName: String, // 운동 이름
  modelUrl: String, // Teachable Machine 모델 URL
});

const emit = defineEmits(['nextExercise']);
const counter = ref(0);
const currentCounter = ref(0);
const circumference = 2 * Math.PI * 50;
const timeProgress = ref(100);
const duration = ref(60);
const remainingTime = ref(duration.value);

let model = null;
let webcam = null;
let canvasCtx = null;
let timer = null;

// 제한 시간 설정
const setDuration = () => {
  if (props.exerciseName === '벤치 클라임') {
    duration.value = 180;
  } else {
    duration.value = 60;
  }
  remainingTime.value = duration.value;
};

// Teachable Machine 초기화
const initTeachableMachine = async () => {
  try {
    const modelUrl = `${props.modelUrl}model.json`;
    const metadataUrl = `${props.modelUrl}metadata.json`;

    console.log('전달된 모델 URL:', modelUrl);

    model = await window.tmPose.load(modelUrl, metadataUrl);

    const size = 300;
    webcam = new window.tmPose.Webcam(size, size, true); // flip: true
    await webcam.setup();
    await webcam.play();

    const canvas = document.getElementById('canvas');
    canvas.width = size;
    canvas.height = size;
    canvasCtx = canvas.getContext('2d');

    startTimer(); // 제한 시간 시작
    window.requestAnimationFrame(loop); // 루프 시작
  } catch (error) {
    console.error('Teachable Machine 초기화 실패:', error);
  }
};
let status = "";

// 예측 및 조건 만족 시 카운터 증가
const predict = async () => {
  if (!model || !webcam) return;

  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  const prediction = await model.predict(posenetOutput);
  
  // 예측 결과가 특정 조건을 만족할 경우 카운터 증가
  if (prediction[0].probability.toFixed(2) === "1.00") {
    if (status === prediction[1].className){
      incrementCounter();
    }
    status = prediction[0].className
  }else if (prediction[1].probability.toFixed(2) === "1.00") {
                status = prediction[1].className;
            }
 

  drawPose(pose);
};

// 루프
const loop = async () => {
  webcam.update(); // 웹캠 업데이트
  await predict(); // 예측 실행
  window.requestAnimationFrame(loop); // 다음 루프 호출
};

// 포즈 그리기
const drawPose = (pose) => {
  if (canvasCtx && webcam.canvas) {
    canvasCtx.drawImage(webcam.canvas, 0, 0);
    if (pose) {
      const minPartConfidence = 0.5;
      window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, canvasCtx);
      window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, canvasCtx);
    }
  }
};

// 카운터 증가
const incrementCounter = () => {
  counter.value++;
  currentCounter.value++;
  if (currentCounter.value >= 10) {
    currentCounter.value = 0; // 화면 카운터 초기화
  }
};

// 키보드 이벤트 핸들러
const handleKeydown = (event) => {
  if (event.key === '7') {
    incrementCounter(); // 숫자 7 입력 시 카운터 증가
  } else if (event.key === '9') {
    emit('nextExercise', counter.value); // 숫자 9 입력 시 다음 운동으로 이동
  }
};

// 제한 시간 타이머 시작
const startTimer = () => {
  const totalTicks = duration.value * 10;
  let currentTick = 0;

  timer = setInterval(() => {
    currentTick++;
    timeProgress.value = 100 - (currentTick / totalTicks) * 100;
    remainingTime.value = Math.ceil(duration.value - currentTick / 10);

    if (currentTick >= totalTicks) {
      clearInterval(timer);
      emit('nextExercise', counter.value); // 제한 시간 종료 시 부모에 카운터 전달
    }
  }, 100);
};

// 컴포넌트 마운트 시 Teachable Machine 초기화 및 이벤트 바인딩
onMounted(async () => {
  setDuration();
  document.addEventListener('keydown', handleKeydown); // 키보드 이벤트 추가
  await initTeachableMachine();
});

// 컴포넌트 언마운트 시 자원 정리 및 이벤트 제거
onBeforeUnmount(() => {
  if (webcam) webcam.stop();
  if (timer) clearInterval(timer);
  document.removeEventListener('keydown', handleKeydown); // 키보드 이벤트 제거
});
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
  width: 300px;
  height: auto;
  border-radius: 10px;
  background-color: #000;
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

.counter-number .small {
  font-size: 16px;
  color: #666;
}

/* 제한 시간 바 */
.progress-bar-container {
  margin-top: 20px;
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: #ff6347;
  transition: width 0.1s linear;
}

/* 제한 시간 텍스트 */
.remaining-time {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: #000;
}
</style>
