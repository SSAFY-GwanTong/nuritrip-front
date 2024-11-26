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
import { ref, onMounted, onBeforeUnmount, defineEmits, defineProps } from 'vue';

// Props 정의
const props = defineProps({
  exerciseName: String, // 운동 이름 전달받음
});

const emit = defineEmits(['nextExercise']); // 부모에게 전달할 이벤트 정의
const counter = ref(0); // 전체 카운터 값 (누적 증가)
const currentCounter = ref(0); // 화면에 표시될 10단위 카운터
const circumference = 2 * Math.PI * 50; // 원형 진행 바 둘레
const timeProgress = ref(100); // 제한 시간 진행 바
const duration = ref(60); // 제한 시간 (초), 기본값은 1분
const remainingTime = ref(duration.value); // 남은 시간 (초)

let model = null; // Teachable Machine 모델
let webcam = null; // Teachable Machine 웹캠
let canvasCtx = null; // 캔버스 컨텍스트
let timer = null; // 제한 시간 타이머

// 운동에 따라 제한 시간 설정
const setDuration = () => {
  if (props.exerciseName === '벤치 클라임') {
    duration.value = 180; // 3분
  } else {
    duration.value = 60; // 1분
  }
  remainingTime.value = duration.value; // 남은 시간 초기화
};

// Teachable Machine 초기화
const initTeachableMachine = async () => {
  try {
    const MODEL_URL = "https://teachablemachine.withgoogle.com/models/8VC6L_Qre/";
    const modelURL = `${MODEL_URL}model.json`;
    const metadataURL = `${MODEL_URL}metadata.json`;

    model = await window.tmPose.load(modelURL, metadataURL);

    const size = 300;
    webcam = new window.tmPose.Webcam(size, size, true); // flip: true
    await webcam.setup();
    await webcam.play();

    const canvas = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    canvasCtx = canvas.getContext("2d");

    startTimer(); // 제한 시간 시작
    window.requestAnimationFrame(loop); // 루프 시작
  } catch (error) {
    console.error("Teachable Machine 초기화 실패:", error);
  }
};

// 제한 시간 타이머 시작
const startTimer = () => {
  const totalTicks = duration.value * 10; // 10ms 간격으로 1초당 10 tick
  let currentTick = 0;

  timer = setInterval(() => {
    currentTick++;
    timeProgress.value = 100 - (currentTick / totalTicks) * 100; // 진행 바 감소
    remainingTime.value = Math.ceil(duration.value - (currentTick / 10)); // 남은 시간 갱신

    if (currentTick >= totalTicks) {
      clearInterval(timer);
      emit('nextExercise', counter.value); // 제한 시간 종료 시 카운터 값 전달
    }
  }, 100);
};

// 예측 및 조건 만족 시 카운터 증가
const predict = async () => {
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  const prediction = await model.predict(posenetOutput);

  if (prediction[0].probability > 0.9) {
    incrementCounter(); // 조건 만족 시 카운터 증가
  }

  drawPose(pose);
};

// 루프
const loop = async () => {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
};

// 포즈 그리기
const drawPose = (pose) => {
  if (webcam.canvas) {
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
  if (currentCounter.value == 10) {
    currentCounter.value = 0; // 카운터 칸 초기화
  }
};

// 컴포넌트가 마운트될 때 실행
onMounted(async () => {
  setDuration(); // 운동에 따라 제한 시간 설정
  document.addEventListener("keydown", handleKeydown); // 키보드 이벤트 추가
  await initTeachableMachine();
});

// 컴포넌트가 언마운트되기 전에 실행
onBeforeUnmount(() => {
  if (webcam) {
    webcam.stop();
  }
  if (timer) {
    clearInterval(timer);
  }
});

const handleKeydown = (event) => {
  if (event.key === "7") {
    incrementCounter();
  } else if (event.key === "9") {
    emit('nextExercise', counter.value); // 숫자 9를 누르면 카운터 값과 함께 전달
  }
};
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
