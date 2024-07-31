import User from "@/models/user";
import connectToDB from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { clerk_id, username, first_name, last_name } = await req.json();
  console.log(clerk_id, username, first_name, last_name);
  try {
    await connectToDB();
    const user = await User.findOneAndUpdate(
      { clerk_id: clerk_id },
      { username, first_name, last_name },
      { new: true }
    );
    return NextResponse.json({ message: "Profile updated successfully", user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error in updating profile" }, { status: 500 });
  }
};
