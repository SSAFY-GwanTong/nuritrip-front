<template>
  <div class="speech-bubble">
    <p v-for="content in contents" :key="content">
      {{ content }}
    </p>
  </div>
</template>
<script setup>
const props = defineProps({
  contents: {
    Type: Array,
  },
})
</script>
<style scoped>
.speech-bubble {
  background: var(--maincolor);
  width: 600px;
  height: 75px;
  border-radius: 15px;
  position: relative;
  padding: 12px;
  padding-top: 16px;
  padding-left: 30px;
  margin-right: 50px;
}

.speech-bubble::before {
  display: inline-block;
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  left: -16px; /* 왼쪽으로 이동 */
  bottom: 15px;
  border-bottom: 15px solid transparent; /* 말풍선 배경색 */
  border-right: 16px solid transparent; /* 오른쪽 투명 */
  border-left: 0 solid transparent; /* 왼쪽 투명 */
}

.speech-bubble::after {
  display: inline-block;
  content: '';
  position: absolute;
  left: -15px; /* 왼쪽으로 이동 */
  bottom: 15px;
  width: 0;
  height: 0;
  border-top: 16px solid transparent; /* 위쪽 투명 */
  border-bottom: 10px solid transparent; /* 아래쪽 투명 */
  border-right: 25px solid var(--maincolor); /* 말풍선 배경색 */
}
p {
  margin: 0;
  padding: 0;
  color: white;
}
</style>
