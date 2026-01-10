import dbConnect from "../db/mongodb";

export async function GET(req, res) {
  await dbConnect();
  console.log(req, res);
  return new Response(
    JSON.stringify({
      message: "This is a placeholder response from the communities API route.",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}
