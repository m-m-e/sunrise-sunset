import { describe, expect, beforeEach, test } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import ResultsSection from '@/components/ResultsSection.vue'
import { capitalize, removeUnderscores } from '@/common/helpers'

describe('ResultsSection', () => {
  let wrapper: VueWrapper<any>
  const resultsData = {
    results : {
      sunrise: '5:25:58 AM',
      sunset: '8:27:40 PM'
    },
    status: '200'
  }
  const selectedDate = '01/01/2023'

  beforeEach(() => {
    wrapper = mount(ResultsSection, {
      props: {
        resultsData,
        selectedDate
      }
    })
  })

  test('displays the selected date correctly', () => {
    const selectedDateElement = wrapper.find('#selected-date')
    expect(selectedDateElement.text()).toBe(`Chosen date - ${selectedDate}`)
  })

  test('displays the list of results received', () => {
    const resultsItems = wrapper.findAll('li')
    const originalDataAsArray = Object.entries(resultsData.results)

    expect(resultsItems).toHaveLength(originalDataAsArray.length)

    originalDataAsArray.forEach((item, i) => {
      expect(resultsItems[i].text()).toBe(`${removeUnderscores(capitalize(item[0]))}: ${item[1]}`)
    })
  })
})