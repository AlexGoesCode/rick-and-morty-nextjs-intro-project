import RnMList from "@/components/RnMList"
import { Metadata } from "next";
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Raccoons App",
  description: "Generated by create next app",
};

const charactersPage = () => {
  return (
    <>
      <h1>Here is characters page</h1>
      <Suspense fallback={<p>Characters are loading...</p>}>
        <RnMList />
      </Suspense>
    </>
  )
}

export default charactersPage