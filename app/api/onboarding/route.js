import connectToDB from "@/utils/database";


export const POST = async (req) => {
  const { firstName, lastName, username, images, about } = await req.json();
  try {
    await connectToDB();
    await User.create({ firstName, lastName, username, images, about });
    return NextResponse.json({ message: `${title} boardgame created` }, { status: 201 });
  } catch (err) {
    return new NextResponse("Error in creating boardgame " + err, { status: 500 });
  }
};
