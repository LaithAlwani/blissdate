"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function UserPage() {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState();

  const getCurrentUser = async (userId) => {
    const res = await fetch(`/api/user/${userId}`);
    if (res.ok) {
      const data = await res.json();
      setCurrentUser(data.user);
      console.log(data);
    }
  };

  useEffect(() => {
    user && getCurrentUser(user.id);
  }, [user]);

  return (
    currentUser && (
      <div>
        <img src={currentUser.avatar} alt="" style={{ width: "64px" }} />
        <p>
          {currentUser.first_name} {currentUser.last_name}
        </p>
        <p>{currentUser.email}</p>
        <span>{currentUser.clerk_id}</span>
        <h3>images</h3>
        {currentUser.images.map((img, i) => (
          <img key={i} src={img} />
        ))}
        <button className="btn">Add more</button>
      </div>
    )
  );
}
