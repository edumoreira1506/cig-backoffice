import Swal from 'sweetalert2'
import { TFunction } from 'i18next'

export const error = (message: string, t: TFunction) => Swal.fire(
  t('common.ops'),
  message,
  'error'
)

export const success = (message: string, t: TFunction, callback?: () => void) => Swal.fire(
  t('common.success'),
  message,
  'success'
).then(() => {
  if (callback) {
    callback()
  }
})
