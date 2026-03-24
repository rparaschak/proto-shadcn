import { useState, useCallback, useRef } from 'react'

export interface WidgetMessage {
  id: string
  sender: 'user' | 'ai'
  text: string
}

const loremResponses = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.',
  'Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero.',
]

export function useChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<WidgetMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const responseIndex = useRef(0)

  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  const sendMessage = useCallback((text: string) => {
    const userMsg: WidgetMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
    }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    setTimeout(() => {
      const aiMsg: WidgetMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: loremResponses[responseIndex.current % loremResponses.length],
      }
      responseIndex.current++
      setMessages(prev => [...prev, aiMsg])
      setIsLoading(false)
    }, 1000)
  }, [])

  return { isOpen, toggle, messages, isLoading, sendMessage }
}
