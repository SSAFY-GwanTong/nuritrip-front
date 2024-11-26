<template lang="">
  <Select
    v-model="selected"
    :options="cities"
    optionLabel="name"
    :placeholder="content"
    class="w-full md:w-56"
  />
</template>
<script setup>
import Select from 'primevue/select'
import { ref, defineEmits, watch } from 'vue'
const props = defineProps({
  content: {
    Type: String,
  },
})
const cities = ref([
  { name: '서울특별시', code: 1 },
  { name: '인천광역시', code: 2 },
  { name: '대전광역시', code: 3 },
  { name: '대구광역시', code: 4 },
  { name: '광주광역시', code: 5 },
  { name: '부산광역시', code: 6 },
  { name: '울산광역시', code: 7 },
  { name: '세종특별자치시', code: 8 },
  { name: '경기도', code: 31 },
  { name: '강원특별자치도', code: 32 },
])
const emit = defineEmits(['update'])
const selected = ref(null)

watch(selected, (newValue) => {
  emit('update', newValue)
})
</script>
<style scoped>
.p-select {
  font-size: 15px;
  background-color: transparent;
  border: none;
  width: 35%;
  height: 100%;
  border-radius: 50px 0 0 50px;
  display: flex;
  align-items: center;
  padding-left: 15px;
}
</style>
