export const filterObject = (object: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(Object.entries(object).filter(([ , value ]) => {
    const isEmpty = !value

    if (isEmpty) return false

    const isObject = typeof value === 'object'

    if (!isObject) isEmpty

    const isArray = Array.isArray(value)

    if (isArray) return Boolean(value.length)

    const isFile = value instanceof File

    if (isFile) return true
    if (value instanceof Date) return true

    const isValidObject = Object.values(value).some((v) => Boolean(v)) && Boolean(Object.entries(value).length)

    return isValidObject
  }))
}
