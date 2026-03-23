import { useNavigate, useParams } from 'react-router-dom'

export function useAnalyticsNavigation() {
  const navigate = useNavigate()
  const { userId } = useParams<{ userId: string }>()

  const navigateToUser = (userId: string) => {
    navigate(`user/${userId}`)
  }

  const navigateBack = () => {
    navigate('..')
  }

  return { userId, navigateToUser, navigateBack }
}
