import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import connectToDB from "@/utils/database";
import User from "@/models/user";

export const GET = async () => {
  return NextResponse.json({ message: `Working` }, { status: 201 });
};

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  // console.log("Webhook body:", body);

  if (evt.type === "user.created") {
    createUser(evt.data);
  }

  return NextResponse.json("", { status: 200 });
}

const createUser = async (eventData) => {
  const { id, ...attributes } = eventData;
  const { email_addresses, first_name, last_name, profile_image_url } = attributes;
  const newUser = {
    clerk_id: id,
    email: email_addresses[0].email_address,
    first_name,
    last_name,
    images: [],
    avatar: profile_image_url,
    likes: [],
  };
  try {
    await connectToDB();
    const user = await User.findOne({ clerk_id: id });
    if (!user) {
      await User.create(newUser);
    }
    return NextResponse.json({ message: "user created", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json("Error occured", {
      status: 400,
    });
  }
};
