import invariant from 'tiny-invariant'

import { Positive, uint, verify, type UInt } from './spec'

export function* range(
  start: UInt,
  stop?: UInt,
  step?: UInt,
): IterableIterator<number> {
  if (stop === undefined) {
    stop = start
    start = 0
  }

  if (step === undefined) {
    step = 1
  }

  verify(uint, start)
  verify(uint, stop)
  verify(Positive, step)
  invariant(start <= stop, `start(${start}) must be less than stop(${stop})`)

  for (let i = start; i < stop; i += step) {
    yield i
  }
}

export function* repeat<T>(n: number, x: T): IterableIterator<T> {
  invariant(n >= 0, 'n must be >= 0')

  for (let i = 0; i < n; i += 1) {
    yield x
  }
}

export function* repeatedly<T>(n: number, f: () => T): IterableIterator<T> {
  invariant(n >= 0, 'n must be >= 0')

  for (let i = 0; i < n; i += 1) {
    yield f()
  }
}

export function* enumerate<T>(
  iter: Iterable<T>,
): IterableIterator<readonly [T, number]> {
  let i = 0
  for (const e of iter) {
    yield [e, i] as const
    i += 1
  }
}

export function* reverse<T>(arr: readonly T[]): IterableIterator<T> {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    yield arr[i]!
  }
}
