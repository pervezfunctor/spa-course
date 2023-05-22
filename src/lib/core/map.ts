import invariant from 'tiny-invariant'

export function mget<K, V>(map: Map<K, V>, k: K): V {
  const r = map.get(k)
  invariant(r !== null && r !== undefined, 'value null or undefined')

  return r
}

export function imapGroupBy<T, K>(
  arr: Iterable<T>,
  f: (x: T) => K,
): Map<K, T[]> {
  const result = new Map<K, T[]>()

  for (const v of arr) {
    const k = f(v)
    const values = result.get(k)
    if (!values) {
      result.set(k, [v])
    } else {
      values.push(v)
    }
  }

  return result
}
