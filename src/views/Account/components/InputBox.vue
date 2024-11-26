<template>
  <div class="text-box">
    <div class="standard-default">{{ content }}</div>
    <input type="text" v-model="inputValue" @input="sendData"/>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
const props = defineProps({
  content: {
    Type: String,
  },
  type:{
    Type: String,
  }
})

const inputValue = ref("")
const emit = defineEmits();
const sendData = () => {
  emit('update-input', {type:props.type, value: inputValue.value})
}

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
  margin-top: 20px;
}
</style>
