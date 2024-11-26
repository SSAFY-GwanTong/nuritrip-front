<template>
  <div>
    <!-- 가이드 영역 -->
    <div class="guide">
      <img :src="shiba" alt="Guide Character" />
      <SpeechBubble :contents="currentGuideContents" class="speech-bubble"></SpeechBubble>
    </div>

    <!-- 콘텐츠 영역 -->
    <component
      :is="currentComponent"
      :media-source="currentExerciseData.source"
      :media-type="currentExerciseData.type"
      :counter="counter"
      :circumference="circumference"
      :countdown="countdown"
      :pulse-image="pulseImage"
      :exercise-name="currentExerciseData.name"
      :model-url="currentExerciseData.model"
      @startMeasurement="handleStartMeasurement"
      @nextExercise="handleNextExercise"
      @pulseComplete="handlePulseComplete"
    ></component>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SpeechBubble from '@/components/SpeechBubble.vue';
import ShowVideo from './components/ShowVideo.vue';
import Measurement from './components/Measurement.vue';
import PulseMeasurement from './components/PulseMeasurement.vue';
import shiba from '@/assets/img/shiba-inu-dog-showing-muscles.png';

// 전체 가이드 메시지
const guideMessages = [
  ['첫번째 측정은 스쿼트 입니다', '아래의 영상을 따라 1분간 진행합니다.'],
  ['훌륭합니다! 꾸준히 움직이면 큰 변화를 만드실 수 있어요.'],
  ['두번째 측정은 버피 입니다.', '아래의 영상을 따라 1분간 진행합니다.'],
  ['멋져요! 버피는 전신 운동에 최고입니다.'],
  ['세번째 측정은 싯업 입니다', '아래의 영상을 따라 1분간 진행합니다.'],
  ['대단합니다! 복근 강화에 정말 좋은 운동입니다.'],
  [
    '마지막은 벤치 클라임입니다. 아래처럼 벤치 위로 한 발씩 올라갔다 내려갔다 반복합니다. 3분간 진행합니다.'],[
    '마지막까지 힘내세요! 이 운동은 하체와 심폐 기능을 향상시킵니다.',
  ],
  ['맥박을 측정합니다', '1분동안 맥박수를 세어주세요.'],
];

// 가이드 인덱스 관리
const guideIndex = ref(0);
const currentGuideContents = computed(() => guideMessages[guideIndex.value]);

// 운동 결과 저장 리스트
const exerciseResults = ref([]);

// 운동 데이터
const exercises = ref([
  {
    name: '스쿼트',
    type: 'video',
    source: 'https://ghwns82.github.io/tmp/squat.mp4',
    model: 'https://teachablemachine.withgoogle.com/models/NcKJnoqIZ/',
  },
  {
    name: '버피',
    type: 'video',
    source: 'https://ghwns82.github.io/tmp/burpee.mp4',
    model:"https://teachablemachine.withgoogle.com/models/fDKXviAFC/",
  },
  {
    name: '싯업',
    type: 'video',
    source: 'https://ghwns82.github.io/tmp/situps.mp4',
    model: "https://teachablemachine.withgoogle.com/models/vBPh9VmrZ/",
  },
  {
    name: '벤치 클라임',
    type: 'image',
    source: 'https://ghwns82.github.io/tmp/bench.jpg',
    model: 'https://teachablemachine.withgoogle.com/models/8VC6L_Qre/',
  },
]);

const pulseImage = 'https://ghwns82.github.io/tmp/img_diagnosis_01.png';
const stage = ref('show-video');
const currentExercise = ref(0);
const counter = ref(0);
const circumference = 2 * Math.PI * 50;

// 현재 운동 데이터
const currentExerciseData = computed(() => exercises.value[currentExercise.value]);
console.log('현재 운동 데이터:', currentExerciseData.value);
// 현재 컴포넌트
const currentComponent = computed(() => {
  if (stage.value === 'show-video') return ShowVideo;
  if (stage.value === 'measurement') return Measurement;
  if (stage.value === 'pulse-measurement') return PulseMeasurement;
});

// 레벨 계산 함수
const calculateLevel = () => {
  const levelMapping = {
    스쿼트: [11, 14, 17, 20],
    버피: [11, 19, 37, 45],
    싯업: [16, 25, 32, 40],
    '벤치 클라임': [106, 112, 117, 118],
  };

  let totalLevel = 0;
  let levelCount = 0;

  exerciseResults.value.forEach((result) => {
    const { exercise, count } = result;
    const levels = levelMapping[exercise];

    if (exercise === '벤치 클라임') {
      const adjustedCount = count * 1.25;
      if (adjustedCount >= levels[3]) result.level = 1;
      else if (adjustedCount >= levels[2]) result.level = 2;
      else if (adjustedCount >= levels[1]) result.level = 3;
      else result.level = 4;
    } else {
      if (count > levels[3]) result.level = 5;
      else if (count > levels[2]) result.level = 4;
      else if (count > levels[1]) result.level = 3;
      else if (count > levels[0]) result.level = 2;
      else result.level = 1;
    }

    totalLevel += result.level;
    levelCount++;
  });

  const averageLevel = Math.floor(totalLevel / levelCount);

  console.log('최종 운동 결과:', exerciseResults.value);
  console.log('최종 평균 레벨:', averageLevel);

  return averageLevel;
};

// 이벤트 핸들러
const handleStartMeasurement = () => {
  stage.value = 'measurement';
  if (guideIndex.value < guideMessages.length - 1) {
    guideIndex.value++;
  }
};

const handleNextExercise = (counterValue) => {
  exerciseResults.value.push({
    exercise: exercises.value[currentExercise.value].name,
    count: counterValue,
  });

  if (guideIndex.value < guideMessages.length - 1) {
    guideIndex.value++;
  }

  if (currentExercise.value === exercises.value.length - 1) {
    stage.value = 'pulse-measurement';
  } else {
    counter.value = 0;
    currentExercise.value++;
    stage.value = 'show-video';
  }
};

const handlePulseComplete = (pulseData) => {
  if (exerciseResults.value.length > 0) {
    exerciseResults.value[exerciseResults.value.length - 1].count = pulseData;
  }
  const averageLevel = calculateLevel();
  console.log('평균 레벨:', averageLevel);
};
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
.contents {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;
  gap: 20px;
}
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
</style>
