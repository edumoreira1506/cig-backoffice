import React from 'react'

import useBreeder from 'hooks/useBreeder'

export default function EditBreederPage() {
  const breeder = useBreeder()
  console.log({ breeder })
  return (
    <h1>EditBreederPage</h1>
  )
}
