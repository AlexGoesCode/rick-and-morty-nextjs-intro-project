import ContinentInput from "@/components/ContinentInput"
import CountriesListCC from "@/components/CountriesListCC"
import CountriesListSC from "@/components/CountriesListSC"
import { Suspense } from "react"

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const page = async ({ searchParams }:Props) => {
  console.log(searchParams);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>This page will show a list of countries</h1>
      <ContinentInput />
      <div style={{ display: "flex", gap: "5rem" }}>
        <div>
          <h2>Client</h2>
          <CountriesListCC />
        </div>
        <div>
          <h2>Server</h2>
          <Suspense fallback={<h2>Loading...</h2>}>
            <CountriesListSC searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default page