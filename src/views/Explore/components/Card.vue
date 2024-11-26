<template>
  <div class="cards">
    <div v-for="info in data" :key="info.contentId" class="card" @click="showDetail(info)">
      <div class="attraction-img">
        <img v-if="info.img" :src="info.img" alt="" />
        <img v-else src="https://img.freepik.com/free-psd/3d-rendering-travel-still-life_23-2151799375.jpg?ga=GA1.1.624011667.1732600568&semt=ais_hybrid" alt="">
        <div class="icon">
          <i class="pi pi-heart"></i>
        </div>
      </div>
      <div>
        <p class="attraction-name">{{ info.title }}</p>
        <div class="attraction-info">
          <div class="text-wrapper">
            <i class="pi pi-map-marker"></i>
            <p>{{ info.address1 }} {{ info.address2 }}</p>
          </div>
          <div class="text-wrapper">
            <i class="pi pi-tag"></i>
            <p>{{ info.contentType }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: {
    Type: Object,
  },
})

const emit = defineEmits(['card-click'])
const showDetail = (info) => {
  emit('card-click', info)
}
</script>
<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 88%;
  margin-left: 30px;
  justify-content: flex-start;
}
.card {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
  cursor: pointer;
  flex-grow: 1;
}
.attraction-img {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 200px;
}
img {
  width: 200px;
  height: 200px;
  border-radius: 30px;
}
.icon {
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 33px;
  height: 33px;
  border-radius: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}
.pi-heart {
  font-size: 20px;
}
p {
  margin: 0;
  padding: 0;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.attraction-name {
  font-weight: 700;
  margin-top: 5px;
  margin-bottom: 5px;
}
.attraction-info p {
  color: var(--attraction-info-color);
  font-size: 14px;
}
.text-wrapper {
  display: flex;
  align-items: center;
}
.pi-tag {
  font-size: 14px;
  margin-left: 2px;
  color: var(--attraction-info-color);
  margin-right: 5px;
  margin-top: 2px;
}

.pi-map-marker {
  color: var(--attraction-info-color);
  margin-right: 5px;
}
</style>
