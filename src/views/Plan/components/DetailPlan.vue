<template>
    <div class="plans">
        <div class="plan" v-for="(x, index) in days" :key="x"> 
            <div class="circle">
                {{ x }}
            </div>
            
            <div class="white-bg">
                <div class="first-container">
                    <img src="https://img.freepik.com/free-psd/3d-rendering-travel-still-life_23-2151799375.jpg?ga=GA1.1.624011667.1732600568&semt=ais_hybrid" alt="">
                    <div class="info">
                        <p class="title">경포해변</p>
                        <p class="addr">강원 강릉시 강문동 산1-1</p>
                    </div>
                </div>
                <div class="line"></div>
                <div class="second-container">
                    넓고 평탄한 해변이라 걷기 부담이 적고, 시원한 바다 풍경을 여유롭게 즐길 수 있어 체력 2인에게 적합한 장소입니다.
                </div>
            </div>

            <!-- 선 추가 -->
            <div v-if="index < days.length - 1" class="connector"></div> 
        </div>
    </div>
</template>

<script setup>
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
    height: calc(100% + 30px); /* 다음 circle까지의 높이 */
    background-color: var(--graycolor); /* 선 색상 */
}
</style>
