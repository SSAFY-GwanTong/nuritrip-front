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
        <div class="nav-right-div">
          <li class="nav-right">
            <RouterLink to="/signin" class="div">로그인</RouterLink>
          </li>
          <li class="nav-right">
            <RouterLink to="/signup" class="overlap-group">
              <div class="text-wrapper">회원가입</div>
            </RouterLink>
          </li>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import union from '@/assets/img/union.png'
</script>

<style scoped>
.navbar {
  z-index: 999;
  height: 120px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  min-width: 800px;
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  padding: 0 10px; /* 좌우 패딩 추가 */
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
  margin-right: 40px;
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

.overlap-group {
  border: 2px solid;
  border-color: var(--maincolor);
  border-radius: 27px;
  height: 54px;
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  width: 170px;
  text-decoration: none;
}

.text-wrapper {
  color: var(--maincolor);
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  width: 80px;
  line-height: 16px;
}

.div {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  width: 80px;
  margin-right: 40px; /* 오른쪽 여백 조정 */
  text-decoration: none;
}

.text-wrapper-2 {
  font-size: 30px;
  font-weight: 700;
  white-space: nowrap;
  margin-left: 10px;
}
</style>
