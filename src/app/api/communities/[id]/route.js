import Community from "../../db/models/Community";
import Confession from "../../db/models/Confession";
import dbConnect from "../../db/mongodb";

export async function GET(req, res) {
  await dbConnect();

  const now = new Date()
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000)

  const community = await Community.findOne({ _id: (await res.params).id });
  const confessions = await Confession.find({
    community_id: (await res.params).id,
  });

  const validConfessions = confessions.filter(confession => {
    const secondsToLive = 10 + (confession.likes * 2)
    const expiresAt = new Date(confession.created_at.getTime() + secondsToLive * 1000)
    return now < expiresAt
  })
  return Response.json({ community, confessions: validConfessions }, { status: 200 });
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    const confession = await Confession.create({
      ...body,
      community_id: (await res.params).id,
    });
    return new Response(JSON.stringify({ confession }), { status: 200 });
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : "Unexpected error";
    console.log(message);
    return new Response(null, { status: 500 });
  }
}
