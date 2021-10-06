import { IBreeder } from '@cig-platform/types'

export interface BreederWithFiles extends IBreeder {
  files?: File[]
}
