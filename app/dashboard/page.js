import User from "@/models/user";
import connectToDB from "@/utils/database";
import { revalidatePath } from "next/cache";

export default async function dashboardPage() {
  await connectToDB();
  const users = await User.find();

  return (
    <div>
      {users?.map((user) => (
        <div key={user._id}>
          <h2>{user?.username}</h2>
          <img src={user.images[0]} alt="" />
          <p>{user.email}</p>
          <p>verified: {user.verified ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}
