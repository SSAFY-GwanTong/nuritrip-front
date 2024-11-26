<template>
    <div class="plans">
        
        <div class="plan-card" v-for="(plan, index) in info" :key="index"> 
            <div v-if="plan.day===selectedDay" class="plan">
                <div class="circle">
                {{ plan.sequence }}
            </div>
            
            <div v-if="plan.day===selectedDay" class="white-bg">
                <div class="first-container">
                    <img v-if="plan.imgUrl" :src="plan.imgUrl">
                    <img v-else src="https://img.freepik.com/free-psd/3d-rendering-travel-still-life_23-2151799375.jpg?ga=GA1.1.624011667.1732600568&semt=ais_hybrid" alt="">
                    <div class="info">
                        <p class="title">{{ plan.attractionName }}</p>
                        <p class="addr">{{plan.addr1}} {{ plan.addr2 }}</p>
                    </div>
                </div>
                <div class="line"></div>
                <div class="second-container">
                   {{ plan.overview }}
                </div>
            </div>

            <!-- 선 추가 -->
            <div  v-if="index < days.length - 1 && plan.day===selectedDay" class="connector"></div> 
            </div>
            
            <Mission v-if="plan.mission && plan.day===selectedDay" :mission="plan.mission"></Mission>
        </div>
    </div>
</template>

<script setup>
import Mission from './Mission.vue';
defineProps({
    info: {
        type: Object
    },
    selectedDay:{
        type: Number
    }
})
const days = [1, 2, 3, 4, 5];
</script>

<style scoped>
.plans {
    width: 85%;
    display: flex;
    margin: 0 auto;
    margin-top: 10px;
    flex-direction: column;
    padding: 0;
    margin-bottom: 100px;
}
.plan {
    cursor: pointer;
    margin-top: 30px;
    width: 100%;
    display: flex;
    position: relative; /* position relative 추가 */
}
.circle {
    z-index: 3;
    width: 33px;
    height: 30px;
    background-color: var(--bluecolor);
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-right: 30px;
}
.white-bg {
    border-radius: 10px;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
img {
    border-radius: 10px;
    width: 70px;
    height: 70px;
}
.first-container, .second-container {
    margin-left: 20px;
}
.first-container {
    display: flex;
    margin-top: 15px;
}
.info {
    margin-left: 20px;
}
p {
    padding: 0;
    margin: 0;
}
.title {
    font-weight: 700;
    font-size: 18px;
}
.addr {
    margin-top: 10px;
    color: var(--unselected-day);
}
.line {
    width: 100%;
    margin-top: 15px;
    border: 1px solid var(--graycolor);
    margin-bottom: 15px;
}
.second-container {
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 95%;
}

/* 선 스타일 */
.connector {
    position: absolute;
    left: 14px; /* circle의 위치에 맞추기 */
    top: 30px; /* circle의 높이에 맞추기 */
    width: 2px; /* 선의 두께 */
    height: calc(100% + 150px); /* 다음 circle까지의 높이 */
    background-color: var(--graycolor); /* 선 색상 */
}
</style>
