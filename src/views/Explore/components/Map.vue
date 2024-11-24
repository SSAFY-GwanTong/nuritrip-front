<template>
  <KakaoMap
    :lat="coordinate.lat"
    :lng="coordinate.lng"
    :draggable="true"
    width="85%"
    height="500px"
    class="map"
  >
    <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
  </KakaoMap>
</template>

<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps'
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567,
}
</script>

<style scoped>
.map {
  border-radius: 15px;
}
</style>
