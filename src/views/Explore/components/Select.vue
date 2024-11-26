<template lang="">
  <Select
    v-model="selected"
    :options="options"
    optionLabel="name"
    :placeholder="content"
    class="w-full md:w-56"
  />
</template>
<script setup>
import Select from 'primevue/select'
import { ref, defineEmits, watch } from 'vue'
const props = defineProps({
  options: {
    Type: Object,
  },
  content: {
    Type: String,
  },
})
const emit = defineEmits(['update'])
const selected = ref(null)

watch(selected, (newValue) => {
  emit('update', newValue)
})

</script>
<style scoped>
.p-select {
  margin-left: 10px;
}
</style>
