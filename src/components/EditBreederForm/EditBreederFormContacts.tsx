import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosRemoveCircle, IoIosAddCircle } from 'react-icons/io'
import { Input, Select } from '@cig-platform/ui'
import { BreederContactTypeEnum } from '@cig-platform/enums'

import { useEditBreederDispatch, useEditBreederSelector } from 'contexts/EditBreederContext/EditBreederContext'
import { selectContacts } from 'contexts/EditBreederContext/editBreederSelectors'

import {
  StyledContactValue,
  StyledContainer,
  StyledContact,
  StyledContactType,
  StyledActions,
} from './EditBreederFormContacts.styles'
import { setContacts } from 'contexts/EditBreederContext/editBreederActions'

const CONTACT_TYPES = Object.values(BreederContactTypeEnum)

export default function EditBreederFormContacts() {
  const contacts = useEditBreederSelector(selectContacts)

  const [newContactType, setNewContactType] = useState('')
  const [newContactValue, setNewContactValue] = useState('')

  const dispatch = useEditBreederDispatch()

  const { t } = useTranslation()

  const handleChangeContactType = (index: number, newType: string) => {
    const newContacts = contacts.map((contact, contactIndex) => contactIndex === index ? ({
      ...contact,
      type: newType
    }) : ({ ...contact }))

    dispatch(setContacts(newContacts))
  }

  const handleChangeContactValue = (index: number, newValue: string) => {
    const newContacts = contacts.map((contact, contactIndex) => contactIndex === index ? ({
      ...contact,
      value: newValue
    }) : ({ ...contact }))

    dispatch(setContacts(newContacts))
  }

  const handleDeleteContact = (index: number) => {
    const deleted = contacts[index]

    if (deleted.id) {
      const newContacts = contacts.map((contact, contactIndex) => contactIndex === index ? ({
        ...contact,
        isDeleted: true,
      }) : ({ ...contact }))

      dispatch(setContacts(newContacts))
    } else {
      const newContacts = contacts.filter((_, contactIndex) => contactIndex !== index)

      dispatch(setContacts(newContacts))
    }
  }

  const handleAddNumber = useCallback(() => {
    if (!newContactValue || !newContactType) return

    const newContacts = [...contacts, { value: newContactValue, type: newContactType, id: '', breederId: '' }]

    dispatch(setContacts(newContacts))

    setNewContactType('')
    setNewContactValue('')
  }, [newContactType, newContactValue, dispatch, contacts])

  return (
    <StyledContainer>
      {contacts.filter(contact => !contact.isDeleted).map((contact, index) => (
        <StyledContact key={contact.id}>
          <StyledContactType>
            <Select
              onChange={newContactType => handleChangeContactType(index, newContactType.toString())}
              required
              showEmptyOption
              options={CONTACT_TYPES.map(contactType => ({
                value: contactType,
                label: t(`breeder.fields.contacts.type.${contactType}`)
              }))}
              value={contact.type}
              emptyOptionText={t('breeder.fields.contacts.type')}
            />
          </StyledContactType>
          <StyledContactValue>
            <Input
              onChange={newContactValue => handleChangeContactValue(index, newContactValue.toString())}
              value={contact.value}
              type="number"
              mask="(##) #####-####"
              placeholder="(12) 34567-8970"
              required
            />
          </StyledContactValue>
          <StyledActions>
            <IoIosRemoveCircle data-testid="remove-contact" onClick={() => handleDeleteContact(index)} />
          </StyledActions>
        </StyledContact>
      ))}
      <StyledContact>
        <StyledContactType>
          <Select
            onChange={n => setNewContactType(n.toString())}
            required
            showEmptyOption
            options={CONTACT_TYPES.map(contactType => ({
              value: contactType,
              label: t(`breeder.fields.contacts.type.${contactType}`)
            }))}
            value={newContactType}
            emptyOptionText={t('breeder.fields.contacts.type')}
            inputTestId="contact-type"
          />
        </StyledContactType>
        <StyledContactValue>
          <Input
            onChange={n => setNewContactValue(n.toString())}
            value={newContactValue}
            type="number"
            mask="(##) #####-####"
            placeholder="(12) 34567-8970"
            required
          />
        </StyledContactValue>
        <StyledActions>
          <IoIosAddCircle data-testid="add-number" onClick={handleAddNumber} />
        </StyledActions>
      </StyledContact>
    </StyledContainer>
  )
}
