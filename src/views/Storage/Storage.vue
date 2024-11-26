<template lang="">
    <div>
        <div class="guide">
            <img :src="shiba" alt="" />
            <SpeechBubble :contents="guideContents" class="speech-bubble"></SpeechBubble>
        </div>
        <div class="mid-container">
            <RouterLink to="/plan" class="button">
                <p>일정 만들기</p>
                <i class="pi pi-flag-fill"></i>
            </RouterLink>
        </div>
        <div class="plans-container">
            <div class="plans">
                <RouterLink :to="{ name: 'DetailPlan', params: { plan_id: plan.id } }" class="card" v-for="plan in plans" :key=plan.id>
                    <img class="attraction-img" src="https://img.freepik.com/free-psd/3d-rendering-travel-still-life_23-2151799375.jpg?ga=GA1.1.624011667.1732600568&semt=ais_hybrid">
                    <div class="info">
                    <p class="title">{{plan.title}}</p> 
                    <div class="date">
                            <p>{{plan.startDate[0]}}.{{plan.startDate[1]}}.{{plan.startDate[2]}} ~</p>
                            <p>{{plan.endDate[0]}}.{{plan.endDate[1]}}.{{plan.endDate[2]}} </p>
                    </div>
                    </div>
                </RouterLink>
            </div>
        </div>
        
        
    </div>
</template>
<script setup>
import shiba from '@/assets/img/shiba-inu-dog-lying-down.png'
import SpeechBubble from './components/SpeechBubble.vue';
import { ref } from 'vue';
import { axiosInstance } from '@/axios';

const guideContents = [
    '나의 여행 계획들을 한 눈에 볼 수 있어요.',
    `일정 만들기를 통해 여행 일정을 만들어보세요!`,
]

const plans = ref([])
axiosInstance.get('users/my/plans')
    .then((res) => {
        if(res.data.isSuccess === true){
            plans.value = res.data.result;
        }
    })

</script>
<style scoped>
.guide {
display: flex;
justify-content: center;
margin-top: 30px;

}
img {
width: 100px;
height: 100px;
margin-right: 20px;
}
.speech-bubble {
margin-top: 13px;
}
.mid-container{
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
.button{
    text-decoration: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    width: 230px;
    height: 70px;
    border: 3px solid black;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.button p{
    margin-right: 10px;
}
.plans-container{
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.plans{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 95%;
    flex-flow: wrap;
}
.card p{
    margin: 0;
    padding: 0;
}
.card{
    cursor: pointer;
    text-decoration: none;
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 10px;
    display: flex;
    background-color: white;
    width: 270px;
    height: 120px;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.attraction-img{
    width: 93px;
    height: 93px;
    border-radius: 15px;
    margin-left: 15px;
    margin-top: 12px;
}
.info{
    margin-top: 15px;
    margin-left: 10px;
}
.title{
    font-weight: 600;
    font-size: 17px;
}
.date{
    margin-top: 20px;
    font-size: 15px;
}
</style>