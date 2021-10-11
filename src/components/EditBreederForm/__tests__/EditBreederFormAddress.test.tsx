import React from 'react'
import { screen } from '@testing-library/react'

import { createEditBreederContextRenderer } from '../../../utils/test'
import { INITIAL_STATE } from '../../../contexts/EditBreederContext/editBreederReducer'
import * as actions from '../../../contexts/EditBreederContext/editBreederActions'

import EditBreederFormAddress from '../EditBreederFormAddress'
import userEvent from '@testing-library/user-event'

jest.mock('@cig-platform/ui', () => {
  const original = jest.requireActual('@cig-platform/ui')

  return {
    ...original,
    Input: ({ label, onChange, placeholder, value }: {
      label: string;
      onChange: (newValue: string) => void;
      placeholder: string;
      value: string;
    }) => (
      <>
        <label>{label}</label>
        <input value={value} type="text" onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      </>
    )
  }
})

jest.useFakeTimers()

describe('EditBreederFormAddress', () => {
  it('renders correctly', () => {
    const mockStore = {
      ...INITIAL_STATE,
      address: {
        city: 'Itapeva',
        province: 'SP',
        street: 'Rua bacana',
        zipcode: '4545',
        number: 139,
        latitude: 10,
        longitude: 10,
      }
    }
    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormAddress />)

    expect(screen.getByDisplayValue(mockStore.address.city)).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockStore.address.province)).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockStore.address.street)).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockStore.address.zipcode)).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockStore.address.number)).toBeInTheDocument()
  })

  it('calls setAddressField when changes the street', () => {
    const mockSetAddressField = jest.fn()

    const street = 'a'
    const newStreet = 'ab'
    const mockStore = {
      ...INITIAL_STATE,
      address: {
        ...INITIAL_STATE.address,
        street,
      }
    }

    jest.spyOn(actions, 'setAddressField').mockImplementation(mockSetAddressField)

    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormAddress />)

    userEvent.type(screen.getByDisplayValue(street), newStreet)

    expect(mockSetAddressField).toHaveBeenCalledWith('street', newStreet)
  })

  it('calls setAddressField when changes the number', () => {
    const mockSetAddressField = jest.fn()

    const number = '1'
    const newNumber = '12'
    const mockStore = {
      ...INITIAL_STATE,
      address: {
        ...INITIAL_STATE.address,
        number: Number(number),
      }
    }

    jest.spyOn(actions, 'setAddressField').mockImplementation(mockSetAddressField)

    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormAddress />)

    userEvent.type(screen.getByDisplayValue(number), newNumber)

    expect(mockSetAddressField).toHaveBeenCalledWith('number', newNumber)
  })

  it('calls setAddressField when changes the province', () => {
    const mockSetAddressField = jest.fn()

    const province = ''
    const newProvince = 'SP'
    const mockStore = {
      ...INITIAL_STATE,
      address: {
        ...INITIAL_STATE.address,
        province
      }
    }

    jest.spyOn(actions, 'setAddressField').mockImplementation(mockSetAddressField)

    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormAddress />)

    userEvent.selectOptions(screen.getByTestId('province-select'), [newProvince])

    expect(mockSetAddressField).toHaveBeenCalledWith('province', newProvince)
  })

  it('calls setAddressField when changes the zipcode', () => {
    const mockSetAddressField = jest.fn()

    const zipcode = '1'
    const newZipcode = '12'
    const mockStore = {
      ...INITIAL_STATE,
      address: {
        ...INITIAL_STATE.address,
        zipcode
      }
    }

    jest.spyOn(actions, 'setAddressField').mockImplementation(mockSetAddressField)

    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormAddress />)

    userEvent.type(screen.getByDisplayValue(zipcode), newZipcode)

    expect(mockSetAddressField).toHaveBeenCalledWith('zipcode', newZipcode)
  })

  it('calls setAddressField when changes the city', () => {
    const mockSetAddressField = jest.fn()

    const city = 'a'
    const newCity = 'ab'
    const mockStore = {
      ...INITIAL_STATE,
      address: {
        ...INITIAL_STATE.address,
        city
      }
    }

    jest.spyOn(actions, 'setAddressField').mockImplementation(mockSetAddressField)

    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormAddress />)

    userEvent.type(screen.getByDisplayValue(city), newCity)

    expect(mockSetAddressField).toHaveBeenCalledWith('city', newCity)
  })

  it('does not render the map', () => {
    const mockStore = {
      ...INITIAL_STATE,
      address: {
        city: 'Itapeva',
        province: 'SP',
        street: 'Rua bacana',
        zipcode: '4545',
        number: 139,
        latitude: 0,
        longitude: 0,
      }
    }
    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormAddress />)

    expect(screen.queryByTestId('map')).not.toBeInTheDocument()
  })

  it('renders the map', () => {
    const mockStore = {
      ...INITIAL_STATE,
      address: {
        city: 'Itapeva',
        province: 'SP',
        street: 'Rua bacana',
        zipcode: '4545',
        number: 139,
        latitude: 10,
        longitude: 10,
      }
    }
    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormAddress />)

    expect(screen.getByTestId('map')).toBeInTheDocument()
  })
})
