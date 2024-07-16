export async function GET() {
  const data = {
    message: 'This message is coming from a route handler function',
  };
  return Response.json({ data });
}
