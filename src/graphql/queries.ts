import { gql } from "@apollo/client";

export const GETALLCOUNTRIES = gql`
  query getAllCountries {
    countries {
      name
      code
      continent {
        name
        code
      }
    }
  }
`

export const GETCOUNTRYBYCONTINENT = gql`
  query getCountryByContinent($continentCode: String) {
    countries (filter: { continent: { eq: $continentCode } }) {
      name
      code
      emoji
    }
  }
`