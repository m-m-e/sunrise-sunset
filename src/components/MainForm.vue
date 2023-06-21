<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import '../assets/styles/mainForm.scss'

  const size = ref<'default' | 'large' | 'small'>('default')

  const props = defineProps({
    selectedDate: {
      type: String,
      required: true
    },
    termsAccepted: {
      type: Boolean,
      required: true
    },
    errorMessage: {
      type: String
    }
  })
  const emits = defineEmits(['update:selectedDate', 'update:termsAccepted', 'submit'])

  const date = ref(props.selectedDate)
  const checkbox = ref(props.termsAccepted)

  watchEffect(() => {
    emits('update:selectedDate', date.value)
    emits('update:termsAccepted', checkbox.value)
  })

  const submitForm = () => {
    emits('submit')
  }
</script>

<template>
  <div>
    <div class="form_input">
      <label for="date-picker">Choose a date</label>
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="Pick a day"
        :size="size"
        id="date-picker"
      />
    </div>

    <div class="form_input form_input--checkbox">
      <input type="checkbox" id="terms-checkbox" name="terms-checkbox" required v-model="checkbox">
      <label for="terms-checkbox">I accept the terms and conditions</label>
    </div>

    <p v-if="errorMessage?.length" class="error">{{ errorMessage }}</p>
    <button @click="submitForm" type="submit" class="button--primary">Get results</button>
  </div>
</template>
