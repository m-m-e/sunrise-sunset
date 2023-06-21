<script setup lang="ts">
  import { ref, watch } from 'vue'
  import type { Ref } from 'vue'
  import type { ApiResponse } from './common/models'
  import ApiService from '@/services/ApiService'
  import './assets/styles/home.scss'

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

  const formatDate = () => {
    // @ts-ignore
    return new Date(selectedDate.value).toLocaleDateString()
  }

  watch(selectedFilter, () => {
    if (sunriseData.value) filterList()
  })
</script>

<template>
  <header class="header">
    <img class="header_icon" src="./assets/img/sunrise.svg" alt="Sunrise logo"/>
  </header>

  <main class="main-content">
    <h1 class="main-heading">Sunrise sunset information</h1>

    <MainForm
      v-model:selectedDate="selectedDate"
      v-model:termsAccepted="termsAccepted"
      :errorMessage="errorMessage"
      @submit="getData"
    />

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
  </main>

  <ResultsSection
    v-if="filteredData"
    :selectedDate="formatDate()"
    :resultsData="filteredData"
  />

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
