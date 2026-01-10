import Community from "../db/models/Community";
import dbConnect from "../db/mongodb";

export async function GET(req, res) {
  await dbConnect();
  const url = new URL(req.url);
  const lat = url.searchParams.get("lat");
  const lng = url.searchParams.get("lng");

  const communities = await Community.find({});
  return new Response(
    JSON.stringify({
      communities,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}
