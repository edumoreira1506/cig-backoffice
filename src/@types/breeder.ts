import { IBreeder } from '@cig-platform/types'

import { EditBreederContact, EditBreederImage } from '../contexts/EditBreederContext/editBreederReducer'

export interface BreederWithFilesAndContacts extends Omit<IBreeder, 'foundationDate'> {
  files?: File[];
  images?: EditBreederImage[];
  contacts?: EditBreederContact[];
  foundationDate: string;
}
