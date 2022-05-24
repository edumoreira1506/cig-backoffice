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

export const info = (
  message: string,
  t: TFunction,
  confirmedCallback?: () => void,
  notConfirmedCallback?: () => void,
) => Swal.fire({
  title: t('common.confirm'),
  text: message,
  icon: 'warning',
  showCancelButton: true,
}).then((result) => {
  if (result.value && confirmedCallback) {
    confirmedCallback()
  } else if (notConfirmedCallback) {
    notConfirmedCallback()
  }
})

export const withInput = async (
  message: string,
  callback: (word: string) => void
) => {
  const { value } = await Swal.fire({
    title: message,
    input: 'text',
    inputValue: '',
    showCancelButton: true,
  })

  if (!value) return

  return callback(value)
}
