<script setup lang="ts">
  import { capitalize, removeUnderscore } from '@/common/helpers'
  import type { ApiResponse } from '@/common/models';
  import '../assets/styles/results.scss'

  defineProps<{
    selectedDate: string,
    resultsData: ApiResponse
  }>()

  const getLabel = (name: string): string => {
    return removeUnderscore(capitalize(name))
  }
</script>

<template>
  <div class="results_container">
      <h2 class="results_header">Results</h2>
      <p>Chosen date - {{ selectedDate }}</p>
      <ul v-for="(result, name, i) in resultsData.results" :key="i">
        <li>{{ `${getLabel(name.toString())}: ${result}` }}</li>
        <p></p>
      </ul>
    </div>
</template>
