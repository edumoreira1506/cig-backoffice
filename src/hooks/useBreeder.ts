import useAuth from './useAuth'

export default function useBreeder() {
  const { userData } = useAuth()

  return userData?.breeders?.[0]
}
