<template>
    <div class="card flex justify-center">
        <DatePicker v-model="dates" placeholder="날짜" dateFormat="yy/mm/dd" selectionMode="range" :manualInput="false" showIcon iconDisplay="input" />   
    </div>

</template>

<script setup>
import DatePicker from 'primevue/datepicker';
import { ref } from "vue";

const dates = ref();
</script>
<style>
.p-datepicker{
    border: none;
    background: transparent;
    height: 100% !important;
    width: 100%;
}

.p-inputtext{
    font-size: 15px !important;
    cursor: pointer;
    color: #9498A4;
    min-width: 200px !important;
    width: 100% !important;
    height: 100% !important;
    box-shadow: none !important;
    background: transparent !important;
    padding: 0px !important;
    border: none !important;
}
.p-inputtext i{
    color: #9498A4;
    font-size: 15px !important;
}
</style>
