import { useNavigate, useParams } from 'react-router-dom'

export function useChatNavigation() {
  const navigate = useNavigate()
  const { chatId } = useParams<{ chatId: string }>()

  const navigateToChat = (id: string) => {
    navigate(`/ai-support-chat/chats/${id}`)
  }

  const navigateBack = () => {
    navigate('/ai-support-chat/chats')
  }

  return { chatId, navigateToChat, navigateBack }
}
