import { getAthleteUrl } from "@/services/athletes";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return new Response('ID is required', { status: 400 });
  }

  const data = await getAthleteUrl(id);

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}