<script setup lang="ts">
  import { ref, watch } from 'vue'
  import type { Ref } from 'vue'
  import { capitalize, removeUnderscore } from './common/helpers'
  import type { ApiResponse } from './common/models'
  import ApiService from '@/services/ApiService'
  import './assets/styles/home.scss'

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
  <header class="header">
    <img class="header_icon" src="./assets/img/sunrise.svg" alt="Sunrise logo"/>
    <img class="header_icon" src="./assets/img/sunset.svg" alt="Sunset logo"/>
  </header>

  <main class="main-content">
    <h1 class="main-heading">Sunrise sunset information</h1>
    <div class="form_input">
      <label for="date-picker">Choose a date</label>
      <el-date-picker
        v-model="selectedDate"
        type="date"
        placeholder="Pick a day"
        :size="size"
        id="date-picker"
      />
    </div>

    <div class="form_input form_input--checkbox">
      <input type="checkbox" id="terms-checkbox" name="terms-checkbox" required v-model="termsAccepted">
      <label for="terms-checkbox">I accept the terms and conditions</label>
    </div>

    <p v-if="errorMessage.length" class="error">{{ errorMessage }}</p>
    <button @click="getData" type="submit" class="button--primary">Get results</button>

    <div class="form_input">
      <label for="filters">Filter by</label>
      <select
        v-model="selectedFilter"
        name="filters"
        id="filters"
        :disabled="!sunriseData"
        class="form_input--dropdown"
      >
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
  
    <div v-if="filteredData" class="results_container">
      <h2 class="results_header">Results</h2>
      <p>Chosen date: {{ formatDate() }}</p>
      <ul v-for="(result, name, i) in filteredData.results" key="i">
        <li>{{ `${getLabel(name.toString())}: [${result}]` }}</li>
        <p></p>
      </ul>
    </div>
  </main>

  <footer class="footer">
    <p class="footer_text">
      Powered by
        <a
          href="https://sunrisesunset.io/"
          target="_blank"
          rel="noopener noreferrer"
          class="footer_text--link"
        >
          SunriseSunset.io
        </a>
    </p>
  </footer>
</template>
