import invariant from 'tiny-invariant'
import { z } from 'zod'
import { is } from './spec'

export function isNumber(x: unknown): x is number {
  return is(z.number(), x)
}

export function isString(x: unknown): x is string {
  return is(z.string(), x)
}

export function isDate(x: unknown): x is Date {
  return is(z.date(), x)
}

export function isBoolean(x: unknown): x is boolean {
  return is(z.boolean(), x)
}

export function isNil(x: unknown): x is null | undefined {
  return is(z.null(), x) || is(z.undefined(), x)
}

export function isArray(x: unknown): x is readonly unknown[] {
  return is(z.array(z.unknown()), x)
}

export function isObject(x: unknown): x is Record<string, unknown> {
  return is(z.record(z.any()), x)
}

export function notNil<T>(x: T | null | undefined): T {
  invariant(!isNil(x), 'notNil: value is nil')
  return x
}

export function isFunction(x: unknown): x is (...args: any) => any {
  return is(z.function(), x)
}
