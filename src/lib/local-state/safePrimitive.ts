import React from 'react'
import { z } from 'zod'
import type { FieldSpec } from '../validator'
import {
  boolean,
  date,
  dateRange,
  defaultValue,
  integer,
  number,
  string,
} from '../validator'
import { safeUpdateState } from './safeState'

export function primitive<Spec extends FieldSpec>(spec: Spec) {
  const useState = safeUpdateState(z.object({ value: spec }))

  type Value = z.infer<Spec>

  return function usePrimitiveState(initialValue?: Value) {
    const [state, { setValue }] = useState({
      value: initialValue || defaultValue(spec),
    })

    const update = React.useCallback(
      (vfn: (_: Value) => Value) => {
        setValue(vfn)
      },
      [setValue],
    )

    return [state.value as Value, update] as const
  }
}

export const useBoolean = primitive(boolean())
export const useNumber = primitive(number())
export const useInt = primitive(integer())
export const useDate = primitive(date())
export const useString = primitive(string())
export const useDateRange = primitive(dateRange())

export function useToggle(value: boolean) {
  const [v, update] = useBoolean(value)

  const toggle = React.useCallback(() => {
    update(value => !value)
  }, [update])
  const set = React.useCallback(() => {
    update(_ => true)
  }, [update])
  const reset = React.useCallback(() => {
    update(_ => false)
  }, [update])

  return [v, { set, reset, toggle }] as const
}
