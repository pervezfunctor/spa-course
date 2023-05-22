import { isome } from './iter'

export function iincludes<T>(arr: Iterable<T>, value: T): boolean {
  return isome(arr, v => v === value)
}

export function ifind<T>(
  arr: Iterable<T>,
  pred: (x: T) => boolean,
): T | undefined {
  for (const e of arr) {
    if (pred(e)) {
      return e
    }
  }

  return undefined
}

export function ifindIndex<T>(
  arr: Iterable<T>,
  pred: (x: T) => boolean,
): number {
  let i = 0
  for (const e of arr) {
    if (pred(e)) {
      return i
    }
    i += 1
  }
  return -1
}
