import { produce, type Draft } from 'immer'
import {
  atom,
  useAtom,
  type Getter,
  type PrimitiveAtom,
  type WritableAtom,
  useAtomValue,
  useSetAtom,
  Atom,
} from 'jotai'
import { selectAtom } from 'jotai/utils'
import type { Read, Write } from './types'
import React from 'react'

export function signal<Value extends object>(initialValue: Value) {
  return atom(initialValue)
}

export function snapshot<Value extends object>(signal: PrimitiveAtom<Value>) {
  return () => useAtomValue(signal)
}

export function signals<Value>() {
  return signal<PrimitiveAtom<Value>[]>([])
}

export function computed<Value>(read: Read<Value>) {
  return atom(read)
}

export function computedHook<Value>(read: Read<Value>) {
  const atom = computed(read)
  return () => useAtomValue(atom)
}

export const select = selectAtom

export function derived<Value, Args extends unknown[], Result extends void>(
  read: Read<Value>,
  write: Write<Args, Result>,
): WritableAtom<Value, Args, Result> {
  return atom(read, write)
}

export function action<Value, Args extends unknown[], Result extends void>(
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

export function actionHook<Value, Args extends unknown[], Result extends void>(
  signal: WritableAtom<Value, any, Result>,
  fn: (get: Getter, draft: Draft<Value>, ...args: Args) => void,
) {
  const actionAtom = action(signal, fn)

  return () => useAtom(actionAtom)
}

export function useValue<Value>(
  signal: Atom<Value> | Atom<Promise<Value>> | Atom<Value | Promise<Value>>,
) {
  return useAtomValue(signal)
}

export const useAction = useSetAtom

export function useSignal<
  Value,
  Args extends unknown[],
  Result extends void | Promise<void>,
>(atom: WritableAtom<Value, Args, Result>) {
  return [useValue(atom), useAction(atom)]
}

export function useLocalSignal<Value extends object>(initialValue: Value) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useSignal(React.useMemo(() => signal(initialValue), []))
}
