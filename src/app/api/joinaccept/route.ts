export async function POST(req: Request) {
  const body = await req.json();
  console.log("join accept");
  console.log(body);
  return Response.json({ message: "got information from joinaccept" });
}
