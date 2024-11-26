<template>
    <div class="bg" :style="{ backgroundColor: bgColor }" @click="changeStatus(mission)">
        <div class="circle" :style="{backgroundColor: checkColor}">
            <i class="pi pi-check"></i>
        </div>
        <div class="text">
            <p class="title">{{ mission.title }}</p>
            <div class="level">
                <p class="level-text">난이도</p>
                <i v-for="x in mission.level" :key="x" class="pi pi-star-fill"></i>
            </div>
            <div class="tags">
                <div 
                    v-for="type in mission.fitnessTypes" 
                    :key="type" 
                    class="tag" 
                    :style="{ backgroundColor: tagColors[type] }"
                >
                    {{ type }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { axiosInstance } from '@/axios';
import { computed } from 'vue';
const props = defineProps({
    mission: {
        type: Object,
        required: true
    }
})

// 태그 종류에 따른 색상 매핑
const tagColors = {
    '근력': "#3772FF",
    '근지구력': "#FF7171",
    '심폐지구력': "#EA8EEC",
    '유연성': "#9160D1",
    '민첩성': "#4A70CB",
    '순발력': "#FFA500",
    '평형성': "#FFA07A"
}

// mission.status에 따른 배경 색상 매핑
const bgColor = computed(() => {
    console.log(props.mission.status)
    if(props.mission.status) {
            return '#fff1da'; // 성공적인 상태 색상
    }else{
        return '#EFEFEF'
     }
});

const checkColor = computed(() => {
    console.log(props.mission.status)
    if(props.mission.status) {
            return '#F66F4D'; // 성공적인 상태 색상
    }else{
        return '#AEAEB2'
     }
});

const changeStatus = (mission) => {
  

    axiosInstance.put(`users/my/missions/${mission.id}/status/${!mission.status}`)
        .then((res) => {
            if(res.data.isSuccess){
                props.mission.status = !props.mission.status;
            }
        })
}
</script>

<style scoped>
.bg {
    cursor: pointer;
    margin-top: 25px;
    margin-left: 100px;
    display: flex;
    width: 650px;
    height: 120px;
    border-radius: 30px;
    align-items: center;
    padding-left: 30px;
}
.circle {
    background-color: var(--maincolor);
    width: 25px;
    height: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.circle i {
    color: white;
    font-size: 13px;
}
p {
    margin: 0;
    padding: 0;
}
.text {
    margin-left: 25px;
}
.title {
    font-weight: 700;
    font-size: 17px;
}
.level {
    margin-top: 5px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}
.level-text {
    margin-top: 3px;
    margin-right: 10px;
}
.pi-star-fill {
    color: #FFCB45;
}
.tags {
    display: flex;
}
.tag {
    padding: 3px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 10px;
    border-radius: 20px;
    color: white; /* 텍스트 색상 */
}
</style>
