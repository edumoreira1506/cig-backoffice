import { filterObject } from '../object'

describe('Object utils', () => {
  describe('filterObject', () => {
    const invalidValues = [null, undefined, false, '', 0, [], {}, { user: '' }]

    invalidValues.forEach((invalidValue) => {
      it(`removes the value when is ${invalidValue?.toString() ?? ''}`, () => {
        const object = { foo: 'bar', bar: invalidValue }
        const result = filterObject(object)

        expect(result).not.toMatchObject(object)
        expect(result.bar).toBeUndefined()
      })
    })
  })
})
