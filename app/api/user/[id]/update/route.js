import User from "@/models/user";
import connectToDB from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req, context) => {
  const { params } = context
  const id = params.id;
  const { username, first_name, last_name } = await req.json();
  
  try {
    await connectToDB();
    const user = await User.findOneAndUpdate(
      { _id: id },
      { username, first_name, last_name },
      { new: true }
    );
    return NextResponse.json({ message: "Profile updated successfully", user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error in updating profile" }, { status: 500 });
  }
};
