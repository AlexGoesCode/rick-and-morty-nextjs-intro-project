export default function characterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      children
      <div>this is a footer for characters routes</div>
    </>
  );
}
