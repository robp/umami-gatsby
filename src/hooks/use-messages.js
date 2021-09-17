import { useRef } from "react"

export default function useMessages(messages) {
  const currentRef = useRef(messages)
  const previousRef = useRef()

  if (currentRef.current !== messages) {
    previousRef.current = currentRef.current
    currentRef.current = messages
  }

  return previousRef.current
}
