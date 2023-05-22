import { ireduce, snoc } from './iter'
import { plus } from './operators'

export function ieach<T>(arr: Iterable<T>, impureFn: (x: T) => void): void {
  for (const e of arr) {
    impureFn(e)
  }
}

export const sum = (arr: Iterable<number>): number => ireduce(arr, plus, 0)

export const max = (arr: Iterable<number>): number => {
  const [first, rest] = snoc(arr)

  return ireduce(rest, Math.max, first)
}

export const min = (arr: Iterable<number>): number => {
  const [first, rest] = snoc(arr)

  return ireduce(rest, Math.min, first)
}

export const toArray = <T>(arr: Iterable<T>): T[] => [...arr]

export const toSet = <T>(arr: Iterable<T>): Set<T> => new Set(arr)

export const toMap = <K, V>(arr: Iterable<readonly [K, V]>): Map<K, V> =>
  new Map(arr)

export const count = <T>(arr: Iterable<T>): number =>
  ireduce(arr, acc => acc + 1, 0)
