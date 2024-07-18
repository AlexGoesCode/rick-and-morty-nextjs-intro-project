import { Country } from '@/@types/countries'
import { GETCOUNTRYBYCONTINENT } from '@/graphql/queries'
import { getClient } from '@/lib/client'
import React from 'react'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

type QueryRes = {
  countries: Country[]
}

const CountriesListSC = async({searchParams}: Props) => {

  const data = await getClient().query<QueryRes>({
    query: GETCOUNTRYBYCONTINENT,
    variables: { continentCode: searchParams.continent ? searchParams.continent : "" },
  });
  const countries = data.data.countries;
  // console.log("countries", countries);
  return (
    <div>
      <ul>
        { countries && countries.map((country) => {
          return <li key={country.code}>{country.name}</li>
        }) }
      </ul>
    </div>
  )
}

export default CountriesListSC