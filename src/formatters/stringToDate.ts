export default function stringToDate(string = '') {
  const nowDate = new Date()

  if (!string) return nowDate

  const [dateWithoutTime] = string.split('T')
  const numbers = dateWithoutTime.split('-')

  if (numbers.length !== 3) return nowDate

  const [year, month, day] = numbers
  const monthDayYearFormat = `${month}-${day}-${year}`
  const normalizedDate = new Date(monthDayYearFormat)

  return normalizedDate
}
