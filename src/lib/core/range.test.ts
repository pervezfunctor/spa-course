import { expect, test } from 'vitest'
import { range } from './source'

test('range', () => {
  expect([...range(0, 0)]).toEqual([])
  expect([...range(0, 5)]).toEqual([0, 1, 2, 3, 4])
  expect([...range(5)]).toEqual([0, 1, 2, 3, 4])
  expect([...range(0, 5, 2)]).toEqual([0, 2, 4])
  expect([...range(0, 5, 3)]).toEqual([0, 3])
})
