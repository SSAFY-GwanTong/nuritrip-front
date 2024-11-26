<template>
    <div class="contents">
      <div class="video-container">
        <video :src="videoSource" autoplay loop muted class="full-video"></video>
      </div>
      <button class="start-button" @click="startMeasurement">측정 시작</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    videoSource: String, // 운동 영상 소스
  })
  const emit = defineEmits(['startMeasurement']) // 측정 시작 이벤트
  const startMeasurement = () => emit('startMeasurement')
  </script>
  
  <style scoped>
  .contents {
    display: flex;
    flex-direction: column; /* 수직 정렬 */
    align-items: center; /* 수평 중앙 정렬 */
    justify-content: center; /* 수직 중앙 정렬 */
    height: 100%; /* 부모 요소 크기 */
  }
  
  .video-container {
    width: 100%;
    max-width: 800px; /* 최대 너비 설정 */
    display: flex;
    justify-content: center; /* 비디오를 중앙에 배치 */
  }
  
  .full-video {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  .start-button {
    margin-top: 20px; /* 버튼과 영상 사이의 간격 */
    padding: 10px 20px;
    background-color: #ff6347;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .start-button:hover {
    background-color: #ff4500;
  }
  </style>
  