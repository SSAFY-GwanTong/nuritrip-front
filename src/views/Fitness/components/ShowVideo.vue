<template>
    <div class="contents">
      <div class="media-container">
        <!-- 비디오 또는 이미지 조건부 렌더링 -->
        <video
          v-if="mediaType === 'video'"
          :src="mediaSource"
          autoplay
          loop
          muted
          class="full-video"
        ></video>
        <img
          v-else-if="mediaType === 'image'"
          :src="mediaSource"
          alt="운동 이미지"
          class="full-image"
        />
      </div>
      <button class="start-button" @click="startMeasurement">측정 시작</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    mediaSource: String, // 운동 미디어 소스 (비디오 또는 이미지 URL)
    mediaType: String, // 미디어 타입 ('video' 또는 'image')
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
  
  .media-container {
    width: 100%;
    max-width: 800px; /* 최대 너비 설정 */
    display: flex;
    justify-content: center; /* 미디어를 중앙에 배치 */
  }
  
  .full-video {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  .full-image {
    width: 100%;
    height: auto;
    border-radius: 10px;
    object-fit: contain; /* 이미지가 비율을 유지하며 전체를 표시 */
  }
  
  .start-button {
    margin-top: 20px; /* 버튼과 미디어 사이의 간격 */
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
  