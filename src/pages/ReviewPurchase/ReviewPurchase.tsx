import { useCallback, useState, VFC } from 'react'
import { TextField, StarRating, Button } from '@cig-platform/ui'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { success } from 'utils/alert'
import { Routes } from 'constants/routes'

import {
  StyledContainer,
  StyledFeedbackArea,
  StyledFeedbackStars,
  StyledFeedbackText,
  StyledSaveButton,
  StyledTitle,
} from './ReviewPurchase.styles'
import useSaveReview from 'hooks/useSaveReview'

const ReviewPurchase: VFC = () => {
  const saveReview = useSaveReview({ onSuccess: () => success(t('common.saved'), t, () => navigate(Routes.Purchases)) })
  
  const [merchantFeedbackText, setMerchantFeedbackText] = useState('')
  const [dealFeedbackText, setDealFeedbackText] = useState('')

  const [score, setScore] = useState(0)

  const navigate = useNavigate()

  const { t } = useTranslation()

  const handleSaveReview = useCallback(async () => {
    saveReview(dealFeedbackText, merchantFeedbackText, score)
  }, [saveReview, dealFeedbackText, merchantFeedbackText, score])

  return (
    <StyledContainer>
      <StyledTitle>Avalie sua compra</StyledTitle>
  
      <StyledFeedbackArea>
        <StyledFeedbackText>
          <TextField
            onChange={newValue => setMerchantFeedbackText(String(newValue))}
            value={merchantFeedbackText}
            label="Avaliação da compra"
            placeholder='O que você achou da compra?'
          />
        </StyledFeedbackText>
      </StyledFeedbackArea>

      <StyledFeedbackArea>
        <StyledFeedbackText>
          <TextField
            onChange={newValue => setDealFeedbackText(String(newValue))}
            value={dealFeedbackText}
            label="Avaliação do criatório"
            placeholder='O que você achou do criatório?'
          />
        </StyledFeedbackText>
      </StyledFeedbackArea>

      <StyledFeedbackStars>
        <StarRating onChangeValue={setScore} />
      </StyledFeedbackStars>
        
      <StyledSaveButton>
        <Button onClick={handleSaveReview}>
          Salvar
        </Button>
      </StyledSaveButton>
    </StyledContainer>
  )
}

export default ReviewPurchase
