/* eslint-disable no-console */
import { MantineProvider, Title } from '@mantine/core'
import { useAtomValue, useSetAtom } from 'jotai'
import { action, computed, signal } from './lib'

const counterAtom = signal({ count: 1 })

const incAtom = action(counterAtom, (_, draft) => {
  draft.count += 1
})

const decAtom = action(counterAtom, (_, draft) => {
  draft.count -= 1
})

const squareAtom = computed(get => {
  const { count } = get(counterAtom)

  return count % 2 === 0 ? count ** 2 : (count - 1) ** 2
})

const CounterView = () => {
  console.log('CounterView')
  const count = useAtomValue(counterAtom)

  return (
    <div>
      <span>{count.count}</span>
    </div>
  )
}

const SquareView = () => {
  console.log('SquareView')
  const count = useAtomValue(squareAtom)

  return (
    <div>
      <span>{count}</span>
    </div>
  )
}

const CounterButtons = () => {
  console.log('CounterButtons')
  const inc = useSetAtom(incAtom)
  const dec = useSetAtom(decAtom)

  return (
    <div>
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </div>
  )
}
export function GlobalCounterApp() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Title align="center">Hello, World!</Title>
      <CounterView />
      <SquareView />
      <CounterButtons />
    </MantineProvider>
  )
}
