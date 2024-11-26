<template>
  <div>
    <div class="guide">
      <img :src="shiba" alt="" />
      <SpeechBubble :contents="guideContents" class="speech-bubble"></SpeechBubble>
    </div>
    <div class="choices">
      <RouterLink to="/fitness" class="choice">체력 측정하기</RouterLink>
      <RouterLink to="/" class="choice">여행 계획 세우기</RouterLink>
      <RouterLink to="/explore" class="choice">여행지 살펴보기</RouterLink>
      <RouterLink to="" class="choice">내 여행 계획 보관함 가기</RouterLink>
    </div>
  </div>
</template>
<script setup>
import SpeechBubble from '@/components/SpeechBubble.vue'
import shiba from '@/assets/img/shiba-inu-dog-praying.png'
import { useRouter } from 'vue-router';

const{name} = history.state

const guideContents = [
  `안녕하세요! ${name} 님의 여행 매니저 누리입니다.`,
  '무엇을 도와드릴까요?',
]
const choices = ['체력 측정하기', '여행 계획 세우기', '여행지 살펴보기', '내 여행 계획 보관함 가기']
</script>
<style scoped>
.guide {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
img {
  width: 100px;
  height: 100px;
}
.speech-bubble {
  margin-top: 13px;
}
.choices {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
}

.choice {
  width: 492px;
  height: 55px;
  margin-top: 20px;
  align-content: center;
  text-align: center;
  border-radius: 15px;
  margin-left: 100px;
  border: 1px solid var(--graycolor);
  background-color: var(--graycolor);
  cursor: pointer;
  text-decoration: none;
}
</style>
