<template>
  <div class="text-box">
    <div class="standard-default">{{ content }}</div>
    <input type="text" />
  </div>
</template>

<script setup>
defineProps({
  content: {
    Type: String,
  },
})
</script>

<style scoped>
input {
  width: 396px;
  height: 46px;
  font-size: 15px;
  border: 0;
  border-radius: 10px;
  outline: none;
  padding-left: 20px;
  background-color: #efefef;
}

.standard-default {
  color: var(--default);
  font-family: 'ABeeZee-Regular', Helvetica;
  font-size: 18px;
  font-weight: 400;
  left: 0;
  letter-spacing: 0;
  line-height: normal;
  width: 416px;
}
.text-box {
  height: 66px;
  width: 416px;
  margin-top: 40px;
}
</style>
