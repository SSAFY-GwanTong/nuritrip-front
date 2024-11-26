<template>
  <div class="black-bg" @mousedown="handleBlackBgClick">
    <div class="white-bg" @mousedown="handleWhiteBgClick">
      <div class="close-button" @click="handleBlackBgClick">
        <i class="pi pi-times"></i>
      </div>
      <div class="attraction-img">
        <img v-if="cardInfo.img" :src="cardInfo.img" alt="" />
        <img v-else src="https://img.freepik.com/free-psd/3d-rendering-travel-still-life_23-2151799375.jpg?ga=GA1.1.624011667.1732600568&semt=ais_hybrid">
      </div>
      <div class="title">
        <p>경포해변</p>
        <div class="tag">#{{ cardInfo.type }}</div>
      </div>
      <div class="option">
        <div
          class="info"
          @click="selectOption('info')"
          :class="{ underline: selectedOption === 'info' }"
        >
          정보
        </div>
        <div
          class="review"
          @click="selectOption('review')"
          :class="{ underline: selectedOption === 'review' }"
        >
          리뷰
        </div>
      </div>
      <!-- 정보 -->
      <div v-if="selectedOption === 'info'">
        <div class="detail-info">
          <div class="text-wrapper">
            <i class="pi pi-map-marker"></i>
            <p>{{ cardInfo.addr }}</p>
          </div>
          <div class="text-wrapper">
            <i class="pi pi-phone"></i>
            <p v-if="cardInfo.call">{{ cardInfo.call }}</p>
            <p v-else>-</p>
          </div>
          <div class="text-wrapper">
            <i class="pi pi-heart-fill"></i>
            <p>523</p>
          </div>
        </div>
        <div class="content">
          <p>{{ cardInfo.content }}</p>
        </div>
      </div>
      <!-- 리뷰 -->
      <div v-else></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
defineProps({
  cardInfo: {
    Type: Object,
  },
})
const emit = defineEmits(['close-detail'])
const handleBlackBgClick = () => {
  emit('close-detail')
}
const handleWhiteBgClick = () => {
  event.stopPropagation()
}
const selectedOption = ref('info')
const selectOption = (option) => {
  selectedOption.value = option
}
</script>
<style scoped>
.black-bg {
  z-index: 15;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
}
.white-bg {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 20;
  width: 45em;
  background: white;
  box-sizing: border-box;
  border-radius: 20px;
  margin: 0 auto;
  margin-top: 4em;
  height: 40em;
  overflow: scroll;
}
.attraction-img {
  height: 300px;
}
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.title p {
  font-weight: 800;
  font-size: 30px;
  margin-top: 15px;
  margin-bottom: 5px;
}
.tag {
  margin-bottom: 30px;
}
.option {
  display: flex;
}
.info,
.review {
  width: 50%;
  align-content: center;
  text-align: center;
  padding-bottom: 6px;
  cursor: pointer;
  border-bottom: 1.5px solid var(--graycolor);
}

.underline {
  border-bottom: 1.5px solid var(--maincolor);
}

p {
  margin: 0;
  padding: 0;
}
.detail-info {
  margin-top: 30px;
}
.text-wrapper {
  margin-top: 10px;
  display: flex;
}
i {
  margin-top: 2px;
  margin-right: 10px;
}
.pi-heart-fill {
  color: var(--heartcolor);
}
.content {
  margin-top: 30px;
  line-height: 25px;
  width: 90%;
  margin-bottom: 50px;
}
.title,
.detail-info,
.content {
  margin-left: 40px;
}
.close-button {
  position: absolute;
  right: 17px;
  top: 15px;
  width: 35px;
  height: 35px;
  background-color: white;
  border-radius: 30px;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.pi-times {
  padding: 0;
  margin: 0;
}
</style>
