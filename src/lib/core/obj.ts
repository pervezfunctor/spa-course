export function ipick<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    result[key] = obj[key]
  }

  return result
}

export function iomit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result: any = {}
  for (const key of Object.keys(obj)) {
    const k = key as K
    if (!keys.includes(k)) {
      result[k] = obj[k]
    }
  }

  return result
}

export function imerge<T1, T2>(obj: T1, obj2: T2): T1 & T2 {
  return { ...obj, ...obj2 }
}

export function entries<K extends string | number, V>(
  o: Record<K, V>,
): Array<[K, V]> {
  return Object.entries(o) as Array<[K, V]>
}
