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
      </ul>
    </nav>
  </div>
</template>

<script setup>
import union from '@/assets/img/union.png'
</script>

<style scoped>
.navbar {
  z-index: 1;
  height: 120px;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  min-width: 1200px;
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  padding: 0 10px; /* 좌우 패딩 추가 */
  background-color: var(--bgcolor);
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

.logo {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  text-decoration: none;
}

.text-wrapper-2 {
  color: var(--textcolor);
  font-size: 30px;
  font-weight: 700;
  white-space: nowrap;
  margin-left: 10px;
}
</style>
