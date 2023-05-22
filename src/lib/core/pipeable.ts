import { ieach } from './collectors'
import {
  iconcat,
  ievery,
  ifilter,
  iflatMap,
  igroupBy,
  imap,
  iorderBy,
  ireduce,
  iskip,
  iskipWhile,
  isome,
  itake,
  itakeWhile,
} from './iter'
import { imapGroupBy } from './map'
import { iomit, ipick } from './obj'
import { ifind, ifindIndex, iincludes } from './search'

export function p<Args extends any[], Src, R>(
  f: (src: Src, ...args: Args) => R,
  ...args: Args
) {
  return (src: Src): R => f(src, ...args)
}

export function pipeable<Args extends any[], Src, R>(
  f: (src: Src, ...args: Args) => R,
) {
  return (...args: Args) =>
    (src: Src): R =>
      f(src, ...args)
}

export const map = pipeable(imap)
export const filter = pipeable(ifilter)
export const reduce = pipeable(ireduce)
export const every = pipeable(ievery)
export const some = pipeable(isome)
export const take = pipeable(itake)
export const takeWhile = pipeable(itakeWhile)
export const skipWhile = pipeable(iskipWhile)
export const skip = pipeable(iskip)
export const orderBy = pipeable(iorderBy)
export const groupBy = pipeable(igroupBy)
export const concat = pipeable(iconcat)
export const flatMap = pipeable(iflatMap)

export const each = pipeable(ieach)

export const includes = pipeable(iincludes)
export const find = pipeable(ifind)
export const findIndex = pipeable(ifindIndex)

export const pick = pipeable(ipick)
export const omit = pipeable(iomit)

export const mapGroupBy = pipeable(imapGroupBy)
