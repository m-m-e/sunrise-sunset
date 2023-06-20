<script setup lang="ts">
  import { ref, watch } from 'vue'
  import type { Ref } from 'vue'
  import { capitalize, removeUnderscore } from './common/helpers'
  import type { ApiResponse } from './common/models'
  import ApiService from '@/services/ApiService'

  const size = ref<'default' | 'large' | 'small'>('default')
  const selectedDate = ref(null)
  let sunriseData: Ref<ApiResponse | null> = ref(null)
  let filteredData: Ref<ApiResponse | null> = ref(null)
  let selectedFilter: any = ref(null)
  let termsAccepted = false
  let errorMessage = ref('')

  const getData = async () => {
    errorMessage.value = ''
    if(selectedDate.value && termsAccepted) {
      ApiService.getData(selectedDate.value)
      .then((data: ApiResponse) => {
        sunriseData.value = data
        if (selectedFilter.value) {
          filterList()
        } else {
          filteredData.value = {...sunriseData.value}
        }
      }).catch((error: any) => console.error('An error occurred: ', error))
    } else {
      if(!selectedDate.value) {
        errorMessage.value = 'Please choose a valid date'
      } else {
        errorMessage.value = 'Please accept the terms and conditions'
      }
    }
  }

  const filterList = () => {
    let filteredResults = {...sunriseData.value.results}
    if (selectedFilter.value) {
    const filteredlist = Object.entries(sunriseData.value.results).filter(entry => {
      return entry[0] === selectedFilter.value
    })[0]
    filteredResults = {[filteredlist[0]]: filteredlist[1]}
  }
    filteredData.value.results = filteredResults
  }

  const getLabel = (name: string): string => {
    return removeUnderscore(capitalize(name))
  }

  const formatDate = () => {
    return new Date(selectedDate.value).toLocaleDateString()
  }

  watch(selectedFilter, () => {
    if (sunriseData) filterList()
  })
</script>

<template>
  <h1>Sunrise Sunset information</h1>

  <div>
    <label for="date-picker">Choose a date</label>
    <el-date-picker
      v-model="selectedDate"
      type="date"
      placeholder="Pick a day"
      :size="size"
      id="date-picker"
    />
  </div>

  <div>
    <input type="checkbox" id="terms-checkbox" name="terms-checkbox" required v-model="termsAccepted">
    <label for="terms-checkbox">I accept the terms and conditions</label>
  </div>

  <p v-if="errorMessage.length">{{ errorMessage }}</p>
  <button @click="getData" type="submit">Get results</button>

  <div>
    <label for="filters">Filter by</label>
    <select v-model="selectedFilter" name="filters" id="filters" :disabled="!sunriseData">
      <option value="">Filter type</option>
      <option value="sunrise">sunrise</option>
      <option value="sunset">sunset</option>
      <option value="dawn">dawn</option>
      <option value="dusk">dusk</option>
      <option value="first_light">first light</option>
      <option value="last_light">last light</option>
      <option value="golden_hour">golden hour</option>
    </select>
  </div>

  <div v-if="filteredData">
    <h2>Results</h2>
    <p>Chosen date: {{ formatDate() }}</p>
    <ul v-for="(result, name, i) in filteredData.results" key="i">
      <li>{{ `${getLabel(name.toString())}: [${result}]` }}</li>
      <p></p>
    </ul>
  </div>

  <footer>Powered by SunriseSunset.io</footer>
</template>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
