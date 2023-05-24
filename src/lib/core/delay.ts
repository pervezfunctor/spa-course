import { checked, int } from './spec'

export const delay = checked(
  [int],
  (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
)
