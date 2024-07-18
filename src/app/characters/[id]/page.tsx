import Image from "next/image";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const page = async({ params }: Props) => {
  const { id } = params;
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const result = await response.json();
  if (!response.ok) {
    return <p>Something went wrong 😭</p>
  }
  return (
    <div>
      <h5>{result.name}</h5>
      <Image src={result.image} alt={result.name} width={300} height={300}/>
    </div>
  )
}

export default page