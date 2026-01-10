import dbConnect from "../../db/mongodb";
import community from "../../db/models/community";

// need to add request in the params i believe
export async function GET() {
  await dbConnect();
  const communities = await community.find({}) //need to change this so it finds the specific id
  return Response.json({ communities })
}

export async function POST(req) {
  try {
    const body = await req.json()
    return new Response(null, { status: 204 })
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : 'Unexpected error'
    return new Response(message, { status: 500 })
  }
}