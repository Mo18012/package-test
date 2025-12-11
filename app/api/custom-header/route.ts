import { headers } from "next/headers";

export async function GET() {
  const reqHeaders = await headers();
  const allHeaders = Object.fromEntries(reqHeaders.entries());

  console.log("HEADERS →", allHeaders);

  return Response.json({
    message: "All request headers",
    headers: allHeaders,
  });
}
