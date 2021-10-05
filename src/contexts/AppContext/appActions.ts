import { ApiErrorType } from '@cig-platform/types'

export const setError = (error: ApiErrorType | any) => ({
  type: 'SET_ERROR',
  payload: { error }
} as const)

export const setIsLoading = (isLoading: boolean) => ({
  type: 'SET_IS_LOADING',
  payload: { isLoading }
} as const)
