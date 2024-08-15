import Users from "@/components/Users";
import User from "@/models/user";
import connectToDB from "@/utils/database";

export default async function dashboardPage() {
  await connectToDB();
  const users = await User.find();

  return (
    <div>
      <Users users={users} />
        
    </div>
  );
}
