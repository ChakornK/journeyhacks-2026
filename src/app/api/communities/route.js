export async function GET(req, res) {
  console.log(req, res);
  return new Response(
    JSON.stringify({
      message: "This is a placeholder response from the communities API route.",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}
