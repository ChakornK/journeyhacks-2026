import Community from "../db/models/Community";
import dbConnect from "../db/mongodb";

export async function GET(req, res) {
  await dbConnect();
  const url = new URL(req.url);
  const lat = url.searchParams.get("lat");
  const lng = url.searchParams.get("lng");

  const communities = await Community.find({});
  // TODO: filter communities based on lat/lng if provided
  return new Response(
    JSON.stringify({
      communities,
    }),
    { status: 200 },
  );
}

export async function POST(req) {
  try {
    const body = await req.json();
    const community = await Community.create(body);
    return new Response(JSON.stringify({ community }), { status: 200 });
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : "Unexpected error";
    console.log(message);
    return new Response(null, { status: 500 });
  }
}
