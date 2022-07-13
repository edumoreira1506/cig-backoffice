import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { INITIAL_STATE } from '../../../contexts/EditBreederContext/editBreederReducer'
import { createEditBreederContextRenderer } from '../../../utils/test'
import * as actions from '../../../contexts/EditBreederContext/editBreederActions'

import EditBreederFormContacts from '../EditBreederFormContacts'
import { BreederContactTypeEnum } from '@cig-platform/enums'

describe('EditBreederFormContacts', () => {
  it('renders contacts of store', () => {
    const contacts = [
      {
        id: '',
        breederId: '',
        value: '(15) 99644-2031',
        type: BreederContactTypeEnum.WHATS_APP
      },
      {
        id: '',
        breederId: '',
        value: '(15) 99798-6248',
        type: BreederContactTypeEnum.WHATS_APP
      }
    ]
    const render = createEditBreederContextRenderer({ ...INITIAL_STATE, contacts })

    render(<EditBreederFormContacts />)

    contacts.forEach(contact => {
      expect(screen.getByDisplayValue(contact.value)).toBeInTheDocument()
    })
  })

  it('adds news contacts', () => {
    const setContacts = jest.fn()

    jest.spyOn(actions, 'setContacts').mockImplementation(setContacts)
   
    const contacts = [
      {
        id: '',
        breederId: '',
        value: '(15) 99798-6248',
        type: BreederContactTypeEnum.WHATS_APP
      }
    ]
    const newContact = {
      id: '',
      breederId: '',
      value: '(15) 99644-2031',
      type: BreederContactTypeEnum.WHATS_APP
    }
    const render = createEditBreederContextRenderer({ ...INITIAL_STATE, contacts })

    render(<EditBreederFormContacts />)

    contacts.forEach(contact => {
      expect(screen.getByDisplayValue(contact.value)).toBeInTheDocument()
    })

    userEvent.type(screen.getByDisplayValue(''), newContact.value)
    userEvent.selectOptions(screen.getByTestId('contact-type'), [newContact.type])
    userEvent.click(screen.getByTestId('add-number'))

    expect(screen.getByDisplayValue('')).toBeInTheDocument()
    expect(setContacts).toHaveBeenCalledWith([
      ...contacts,
      expect.objectContaining({ value: newContact.value, type: newContact.type, id: '', breederId: '' })
    ])
  })

  it('delete contacts', () => {
    const setContacts = jest.fn()

    jest.spyOn(actions, 'setContacts').mockImplementation(setContacts)
   
    const contacts = [
      {
        id: '',
        breederId: '',
        value: '(15) 99798-6248',
        type: BreederContactTypeEnum.WHATS_APP
      }
    ]
    const render = createEditBreederContextRenderer({ ...INITIAL_STATE, contacts })

    render(<EditBreederFormContacts />)

    userEvent.click(screen.getByTestId('remove-contact'))

    expect(setContacts).toHaveBeenCalledWith([])
  })
})
