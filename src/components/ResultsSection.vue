<script setup lang="ts">
  import { capitalize, removeUnderscores } from '@/common/helpers'
  import type { ApiResponse } from '@/common/models';
  import '../assets/styles/resultsSection.scss'

  defineProps<{
    selectedDate: string,
    resultsData: ApiResponse
  }>()

  const getLabel = (name: string): string => {
    return removeUnderscores(capitalize(name))
  }

  const getResultsText = (name: string, result: string) => {
    return `${getLabel(name.toString())}: ${result}`
  }
</script>

<template>
  <div class="results_container">
      <h2 class="results_header">Results</h2>
      <p id="selected-date">Chosen date - {{ selectedDate }}</p>
      <ul v-for="(result, name, i) in resultsData.results" :key="i">
        <li>{{ getResultsText(name.toString(), result) }}</li>
      </ul>
    </div>
</template>
