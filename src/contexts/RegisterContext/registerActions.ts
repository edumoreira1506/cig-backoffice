export const setDescription = (description: string) => ({
  payload: { description },
  type: 'SET_DESCRIPTION'
} as const)

export const setType = (type: string) => ({
  payload: { type },
  type: 'SET_TYPE'
} as const)

export const setFiles = (files: File[]) => ({
  payload: { files },
  type: 'SET_FILES'
} as const)
