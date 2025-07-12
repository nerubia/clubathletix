import { getSlackTrainingNotification } from "@/utils/http/slack";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const params = await request.json();
  console.log("Received request to /api/schedule/training/route.ts", params);
  // Here you would typically handle the training schedule creation logic
  // For example, saving the training data to a database or sending it to an external service
  // https://slack.com/api/chat.postEphemeral
  // channel - channel ID where the message will be posted
  // user - user ID of the user who will receive the message
  // blocks - an array of structured blocks to format the message

  
//   const blocks = getSlackTrainingNotification({
//     organization_name: params.organization_name,
//     parent_name: params.parent_name,
//     players: [],
//     time: params.time,
//   });

  return new Response(JSON.stringify({ message: "Training schedule created successfully", data: params }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}