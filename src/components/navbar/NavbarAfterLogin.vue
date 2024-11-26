<template>
  <div class="navbar">
    <nav>
      <ul>
        <div class="nav-left-div">
          <li class="nav-left">
            <RouterLink to="/" class="logo">
              <img class="union" alt="Union" :src="union" />
              <div class="text-wrapper-2">NURI TRIP</div>
            </RouterLink>
          </li>
        </div>
        <RouterLink to="/mypage" class="nav-right-div">
          <li class="nav-right">
            <div class="circle-profile">
              <img :src="userInfo.profile_img" alt="" />
            </div>
          </li>
          <li class="nav-right">
            <div class="user-info">
              <div>환영합니다, {{ userInfo.name }}님!</div>
              <div>체력 LV {{ userInfo.strength_level }}</div>
            </div>
          </li>
        </RouterLink>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import union from '@/assets/img/union.png'
import userprofile from '@/assets/img/userprofile.png'
import { axiosInstance } from '@/axios.js';
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/index.js';
const store = useAuthStore();
const userInfo = ref({})

onBeforeMount(async () => {
  axiosInstance.get(`/users/my`)
    .then((res) => {
      if(res.data.isSuccess === true){
        console.log(res)
        const data = res.data.result
        userInfo.value = {name : data.name, profile_img: data.profileImg, strength_level: data.strengthLevel}
        store.setName(data.name);
      }
    })
    .catch((err) => {
      console.log('데이터를 가져오는 중 오류 발생 : ', err)
    })
})


const name = ref('홍길동')
const level = ref(3)
</script>

<style scoped>
.navbar {
  z-index: 1;
  height: 80px;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  min-width: 800px;
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  padding: 0 10px; /* 좌우 패딩 추가 */
  border-bottom: 1px solid #dbdbdb;
  background-color: white;
}

nav ul {
  list-style-type: none;
  display: flex; /* Flexbox 사용 */
  justify-content: space-between; /* 좌우 정렬 */
  padding: 0; /* 기본 패딩 제거 */
  margin: 0; /* 기본 마진 제거 */
}

.nav-left-div {
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  margin-left: 80px; /* 왼쪽 여백 */
}

.nav-right-div {
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  position: absolute; /* 절대 위치 설정 */
  right: 40px; /* 오른쪽 여백 */
  margin-right: 50px;
  text-decoration: none;
  margin-top: -5px;
}

.nav-right {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
}

.logo {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  text-decoration: none;
}

.text-wrapper-2 {
  color: #2d3134;
  font-size: 30px;
  font-weight: 700;
  white-space: nowrap;
  margin-left: 10px;
}

img {
  width: 100%;
  object-fit: cover;
}
.circle-profile {
  width: 50px;
  height: 50px;
  border-radius: 70%;
  overflow: hidden;
  background: #f5f6fa;
  border: none;
}
.user-info {
  margin-left: 15px;
  font-weight: 550;
  text-decoration: none;
}
</style>
