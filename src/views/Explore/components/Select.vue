<template lang="">
    <Select v-model="selected" :options="options" optionLabel="name" :placeholder="content" class="w-full md:w-56" />
</template>
<script setup>
import Select from 'primevue/select'
import { ref } from 'vue';
const props = defineProps({
    options :{
        Type: Object
    },
    content: {
        Type: String
    }
})
const selected = ref(null);

</script>
<style scoped>
.p-select{
    margin-left: 10px;
}
</style>
