export type Country = {
  awsRegion: string
  capital: string
  code: string
  continent: Continent
  currencies: string[]
  currency: string
  emoji: string
  emojiU: string
  languages: Language[]
  name: string
  native: string
  phone: string
  phones: string[]
  states: string[]
  subdivisions: Subdivision[] 
}

export type Continent = {
  code: string
  countries: Country[]
  name: string
}

export type Language = {
  code: string
  name: string
  native: string
  rtl: boolean
}

export type Subdivision = {
  code: string
  emoji: string
  name: string
}