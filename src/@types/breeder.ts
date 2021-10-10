import { IBreeder } from '@cig-platform/types'

import { EditBreederImage } from '../contexts/EditBreederContext/editBreederReducer'

export interface BreederWithFiles extends IBreeder {
  files?: File[];
  images?: EditBreederImage[];
}
