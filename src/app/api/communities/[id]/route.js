import Community from "../../db/models/Community";
import Confession from "../../db/models/Confession";
import dbConnect from "../../db/mongodb";

export async function GET(req, res) {
  await dbConnect();
  await res.params;
  const community = await Community.find({ _id: res.params.id });
  const confessions = await Confession.find({ community_id: res.params.id });
  return Response.json({ community, confessions }, { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const confession = await Confession.create(body);
    return new Response(JSON.stringify({ confession }), { status: 200 });
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : "Unexpected error";
    console.log(message);
    return new Response(null, { status: 500 });
  }
}
