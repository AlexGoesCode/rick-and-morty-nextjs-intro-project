"use client"
import { Country } from '@/@types/countries'
import { GETALLCOUNTRIES, GETCOUNTRYBYCONTINENT } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {}

type QueryRes = {
  countries: Country[];
}

function CountriesListCC({}: Props) {
  const searchParams = useSearchParams()
  const continent = searchParams.get("continent");

  const { data, error, loading } = useQuery<QueryRes>(GETCOUNTRYBYCONTINENT, {
    variables: {
      continentCode: continent ? continent : ""
    }
  });
  console.log(data);

  return (
    <div>
      { loading && <h2>Loading.....</h2> }
      { error && <p style={{ color: "red" }}>{ error.message }</p> }
      <ul>
        { data && data.countries.map((country) => {
          return <li key={country.code}>{country.name}</li>
        }) }
      </ul>
    </div>
  )
}

export default CountriesListCC