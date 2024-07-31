import User from "@/models/user";
import connectToDB from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  const { params } = context;
  const userId = params.id;
  
  try {
    await connectToDB();
    const user = await User.findOne({ clerk_id: userId });
    return NextResponse.json({ message: "user fetched", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error in fetchin user" }, { status: 500 });
  }
};
