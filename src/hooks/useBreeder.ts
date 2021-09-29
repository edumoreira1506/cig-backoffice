import { useBreederSelector } from '../contexts/BreederContext/BreederContext'
import { selectSelectedBreeder } from '../contexts/BreederContext/breederSelectors'

export default function useBreeder() {
  const breeder = useBreederSelector(selectSelectedBreeder)

  return breeder
}
