import { capitalize, removeUnderscores } from './helpers'
import { describe, expect, test } from 'vitest'

describe('Capitalize', () => {
  test('capitalizes the first letter of a string', () => {
    const lowerCaseString = 'hello'
    expect(capitalize(lowerCaseString)).toBe('Hello')
  })

  test('string remains unchanged if it is already capitalized', () => {
    const capitalizedString = 'Hello'
    expect(capitalize(capitalizedString)).toBe('Hello')
  })
})

describe('Remove underscores', () => {
  test('replaces all underscores in a string with spaces', () => {
    const stringWithUnderscores = 'this_is_a_string'
    expect(removeUnderscores(stringWithUnderscores)).toBe('this is a string')
  })

  test('string remains unchanged if there are no underscores', () => {
    const stringWithSpaces = 'this is a string'
    expect(removeUnderscores(stringWithSpaces)).toBe('this is a string')
  })
})