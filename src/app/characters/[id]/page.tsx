type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = (props) => {
  console.log(props);
  return <p>Test</p>;
};
export default page;
