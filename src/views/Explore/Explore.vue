<template lang="">
  <div>
    <Detail v-if="cardInfo" @close-detail="closeDetail" :cardInfo="cardInfo"></Detail>
    <div class="guide">
      <img :src="shiba" alt="" />
      <SpeechBubble :contents="guideContents" class="speech-bubble"></SpeechBubble>
    </div>
    <div class="choice">
      <div class="select">
        <Select @update="handleSelectedCity" :options="cities" content="시/도 선택"></Select>
        <Select @update="getAttractions" :options="districts" content="구/군 선택"></Select>
        <Select @update="getAttractions" :options="attractions" content="관광지 유형"></Select>
      </div>
      <div class="options">
        <SelectButton
          v-model="value"
          :options="options"
          optionLabel="value"
          dataKey="value"
          aria-labelledby="custom"
        >
          <template #option="slotProps">
            <i :class="slotProps.option.icon"></i>
          </template>
        </SelectButton>
      </div>
    </div>
    <div class="contents">
      <Map v-if="value.value == 'Map'"></Map>
      <Card v-else :data="data" @card-click="showDetail"></Card>
    </div>
  </div>
</template>
<script setup>
import shiba from '@/assets/img/shiba-inu-dog-lying-down.png'
import SpeechBubble from '@/components/SpeechBubble.vue'
import Map from './components/Map.vue'
import Card from './components/Card.vue'
import Select from './components/Select.vue'
import SelectButton from 'primevue/selectbutton'
import Detail from './Detail.vue'
import { axiosInstance } from '@/axios'
import { ref, onBeforeUnmount, onMounted } from 'vue'
const guideContents = [
  '원하는 지역을 선택하고 어떤 관광지가 있는지 살펴보세요!',
  '지도 형식과 카드 형식 2가지로 볼 수 있습니다.',
]

const value = ref({ icon: 'pi pi-map', value: 'Map' })

// SelectButton에 사용할 옵션 정의
const options = ref([
  { icon: 'pi pi-map', value: 'Map' },
  { icon: 'pi pi-th-large', value: 'Card' },
])

const selectedCity = ref()
const selectedDistrict = ref()
const selectedAttraction = ref()
const data = ref([])

const currentPage = ref(1)
const pageSize = ref(15)

const handleScroll = () => {
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  // 페이지의 끝에 도달했을 때
  if (scrollTop + windowHeight >= documentHeight - 100) {
    loadMoreData()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const cities = ref([
  { name: '서울특별시', code: 1 },
  { name: '인천광역시', code: 2 },
  { name: '대전광역시', code: 3 },
  { name: '대구광역시', code: 4 },
  { name: '광주광역시', code: 5 },
  { name: '부산광역시', code: 6 },
  { name: '울산광역시', code: 7 },
  { name: '세종특별자치시', code: 8 },
  { name: '경기도', code: 31 },
  { name: '강원특별자치도', code: 32 },
])

const districts = ref([{ name: '' }])

const attractions = ref([
  { name: '전체', code: null },
  { name: '관광지', code: 12 },
  { name: '문화시설', code: 14 },
  { name: '축제공연행사', code: 15 },
  { name: '여행코스', code: 25 },
  { name: '레포츠', code: 28 },
  { name: '숙박', code: 32 },
  { name: '쇼핑', code: 38 },
  { name: '음식점', code: 39 },
])
const loadMoreData = () => {
  let url = `attractions?page_size=${pageSize.value}&offset=${(currentPage.value - 1) * pageSize.value}&`
  if (selectedCity.value) url += `sido=${selectedCity.value}&`
  if (selectedDistrict.value) url += `gugun=${selectedDistrict.value}&`
  if (selectedAttraction.value) url += `content=${selectedAttraction.value}`
  axiosInstance.get(url).then((res) => {
    data.value.push(...res.data.result)
    currentPage.value++
  })
}
const getAttractions = (option) => {
  changeValue(option)
  currentPage.value = 1
  let url = `attractions?page_size=${pageSize.value}&offset=${(currentPage.value - 1) * pageSize.value}&`
  if (selectedCity.value) url += `sido=${selectedCity.value}&`
  if (selectedDistrict.value) url += `gugun=${selectedDistrict.value}&`
  if (selectedAttraction.value) url += `content=${selectedAttraction.value}`
  axiosInstance.get(url).then((res) => {
    data.value = res.data.result
    currentPage.value++
  })
}
const changeValue = (option) => {
  if (option != null) {
    if (option.hasOwnProperty('gugunCode')) {
      selectedDistrict.value = option.gugunCode
    } else {
      selectedAttraction.value = option.code
    }
  }
}
const handleSelectedCity = (city) => {
  selectedCity.value = city.code
  axiosInstance.get(`attractions/guguns?sido=${city.code}`).then((res) => {
    districts.value = res.data.result
  })
  getAttractions(null)
}

const cardInfo = ref(null)
const showDetail = (info) => {
  cardInfo.value = info
}
const closeDetail = () => {
  cardInfo.value = null
}
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
  margin-right: 25px;
}
.speech-bubble {
  margin-top: 13px;
}
.choice {
  margin-top: 25px;
  display: flex;
  min-width: 750px;
}
.select {
  margin-left: 100px;
}
.options {
  margin-left: auto;
  margin-right: 100px;
}
.p-selectbutton {
  width: 90px;
  height: 42px;
}
.contents {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
}
</style>
