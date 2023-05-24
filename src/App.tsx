import { Button, Container, Title } from '@mantine/core'
import React from 'react'
import { z } from 'zod'
import { jstr, useInt, useSafeQuery } from '@lib'

const Post = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
})

function useConsoleLog(value: unknown) {
  // eslint-disable-next-line no-console
  React.useEffect(() => {
    jstr(value)
  })
}

const PostView = ({ id }: { id: number }) => {
  const { data } = useSafeQuery({
    paths: ['posts', id],
    spec: Post,
    keepPreviousData: true,
  })

  useConsoleLog('PostView')

  return (
    <Container>
      <Title>{data.title}</Title>
      <p>{data.body}</p>
    </Container>
  )
}

export function App() {
  const [id, setId] = useInt(1)
  return (
    <Container>
      <PostView id={id} />
      <Button onClick={() => setId(id => id + 1)}>Next</Button>
    </Container>
  )
}
