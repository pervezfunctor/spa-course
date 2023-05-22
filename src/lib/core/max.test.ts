import { expect, test } from 'vitest'
import { max } from './collectors'

test('max', () => {
  expect(() => max([])).toThrow()
  expect(max([1])).toBe(1)
  expect(max([1, 2, 3])).toBe(3)
  expect(max([3, 2, 1])).toBe(3)
  expect(max([1, 3, 2])).toBe(3)
  expect(max([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(10)
  expect(max([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toBe(10)
})
