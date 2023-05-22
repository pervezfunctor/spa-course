import invariant from 'tiny-invariant'

export function iterator<T>(arr: Iterable<T>): Iterator<T> {
  return arr[Symbol.iterator]()
}

export function toIterable<T>(iterator: Iterator<T>): Iterable<T> {
  return { [Symbol.iterator]: () => iterator }
}

export const snoc = <T>(arr: Iterable<T>): [T, Iterable<T>] => {
  const iter = arr[Symbol.iterator]()
  const first = iter.next()
  invariant(!first.done, 'snoc: empty array')

  return [first.value, toIterable(iter)]
}

export function* imap<T, U>(
  arr: Iterable<T>,
  f: (x: T) => U,
): IterableIterator<U> {
  for (const e of arr) {
    yield f(e)
  }
}

export function* ifilter<T>(
  arr: Iterable<T>,
  pred: (x: T) => boolean,
): IterableIterator<T> {
  for (const e of arr) {
    if (pred(e)) {
      yield e
    }
  }
}

export function ireduce<T, U>(
  arr: Iterable<T>,
  f: (acc: U, x: T) => U,
  init: U,
): U {
  let result = init
  for (const e of arr) {
    result = f(result, e)
  }

  return result
}

export function* flatten<T>(
  arr:
    | Iterable<readonly T[]>
    | IterableIterator<readonly T[]>
    | Iterable<Iterable<T>>
    | IterableIterator<IterableIterator<T>>
    | IterableIterator<Iterable<T>>
    | Iterable<IterableIterator<T>>,
): IterableIterator<T> {
  for (const e of arr) {
    yield* e
  }
}

export function ievery<T>(arr: Iterable<T>, pred: (v: T) => boolean): boolean {
  for (const e of arr) {
    if (!pred(e)) {
      return false
    }
  }

  return true
}

export function isome<T>(arr: Iterable<T>, pred: (v: T) => boolean): boolean {
  for (const e of arr) {
    if (pred(e)) {
      return true
    }
  }

  return false
}

export function* itakeWhile<T>(
  arr: Iterable<T>,
  f: (x: T) => boolean,
): IterableIterator<T> {
  for (const e of arr) {
    if (!f(e)) {
      break
    }

    yield e
  }
}

export function* iskipWhile<T>(
  arr: Iterable<T>,
  f: (x: T) => boolean,
): IterableIterator<T> {
  let skip = true
  for (const e of arr) {
    if (skip && f(e)) {
      continue
    }

    skip = false
    yield e
  }
}

export function* itake<T>(arr: Iterable<T>, n: number): IterableIterator<T> {
  let i = 0
  for (const e of arr) {
    if (i >= n) {
      break
    }

    i += 1
    yield e
  }
}

export function* iskip<T>(arr: Iterable<T>, n: number): IterableIterator<T> {
  let i = 0
  for (const e of arr) {
    if (i >= n) {
      yield e
    }

    i += 1
  }
}

type Order = 'asc' | 'desc'

export function cmp<T, K extends keyof T>(key: K, order: Order) {
  return (a: T, b: T): number => {
    const x = a[key]
    const y = b[key]

    if (x < y) {
      return order === 'asc' ? -1 : 1
    }
    if (x > y) {
      return order === 'asc' ? 1 : -1
    }
    return 0
  }
}

export function iorderBy<T, K extends keyof T>(
  arr: Iterable<T>,
  key: K,
  order: Order = 'asc',
): T[] {
  return [...arr].sort(cmp<T, K>(key, order))
}

export function igroupBy<T, K extends string | number>(
  arr: Iterable<T>,
  f: (x: T) => K,
): Record<K, T[]> {
  const result: any = {}

  for (const v of arr) {
    const k = f(v)
    const values = result[k]
    if (!values) {
      result[k] = [v]
    } else {
      values.push(v)
    }
  }

  return result
}

export function* iconcat<T>(
  first: Iterable<T>,
  ...arrs: Array<Iterable<T>>
): IterableIterator<T> {
  yield* first
  for (const arr of arrs) {
    yield* arr
  }
}

export function* iflatMap<T, U>(
  arr: Iterable<T>,
  f: (x: T) => Iterable<U>,
): IterableIterator<U> {
  for (const e of arr) {
    yield* f(e)
  }
}

export function* islice<T>(
  iter: Iterable<T>,
  start: number,
  stop?: number,
): IterableIterator<T> {
  invariant(start >= 0, 'start must be >= 0')

  let i = 0
  for (const e of iter) {
    if (stop !== undefined && i >= stop) {
      break
    }
    if (i >= start) {
      yield e
    }

    i += 1
  }
}
