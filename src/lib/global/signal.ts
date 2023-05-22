import { produce, type Draft } from 'immer'
import {
  atom,
  useAtom,
  type Getter,
  type PrimitiveAtom,
  type WritableAtom,
} from 'jotai'
import { selectAtom } from 'jotai/utils'
import type { Read, Write } from './types'

export function signal<Value extends object>(initialValue: Value) {
  return atom(initialValue)
}

export function signals<Value>() {
  return signal<PrimitiveAtom<Value>[]>([])
}

export function computed<Value>(read: Read<Value>) {
  return atom(read)
}

export const select = selectAtom

export function derived<Value, Args extends unknown[], Result extends void>(
  read: Read<Value>,
  write: Write<Args, Result>,
): WritableAtom<Value, Args, Result> {
  return atom(read, write)
}

function action$<Value, Args extends unknown[], Result extends void>(
  signal: WritableAtom<Value, any, Result>,
  fn: (get: Getter, draft: Draft<Value>, ...args: Args) => void,
) {
  return atom(null, (get, set, ...args: Args) => {
    const value = produce(get(signal), draft => {
      fn(get, draft, ...args)
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    set(signal, value)
  })
}

export function action<Value, Args extends unknown[], Result extends void>(
  signal: WritableAtom<Value, any, Result>,
  fn: (get: Getter, draft: Draft<Value>, ...args: Args) => void,
) {
  const actionAtom = action$(signal, fn)

  return () => useAtom(actionAtom)
}
