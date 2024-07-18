"use client"

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const ContinentInput = (props: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <select onChange={(e) => router.push(`${pathname}?continent=${e.target.value}`)}>
      <option value={""}>Select Continent</option>
      <option value={"OC"}>Oceania</option>
      <option value={"EU"}>Europe</option>
      <option value={"AF"}>Africa</option>
    </select>
  )
}

export default ContinentInput