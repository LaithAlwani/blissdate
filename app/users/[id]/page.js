"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "@/styles/profile.css";
import { RiImageAddLine } from "react-icons/ri";
import { MdVerified, MdClose } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import toast from "react-hot-toast";

export default function UserPage() {
  const { user } = useUser();
  const inputRef = useRef();
  const [currentUser, setCurrentUser] = useState();
  const [toggleEditModle, setToggleEditModle] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCurrentUser = async (userId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        console.log(data);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getCurrentUser(user.id);
  }, [user]);

  return !loading ? (
    currentUser && (
      <section className="profile">
        <button
          className="btn btn-trasparent fixed right"
          onClick={() => setToggleEditModle(!toggleEditModle)}>
          <FaUserEdit size={24} color="#f14a4f" />
        </button>
        <img src={currentUser.avatar} alt="" className="avatar" />
        <h3>{currentUser.username || ""}</h3>
        <h3>
          {currentUser.first_name} {currentUser.last_name}{" "}
          {currentUser.verified && <MdVerified color="blue" />}
        </h3>
        <h4>{currentUser.email}</h4>
        <div className="img-list">
          {currentUser.images.map((img, i) => (
            <div key={i} className="img-wrapper">
              <img src={img} />
            </div>
          ))}
          <input type="file" hidden ref={inputRef} />
          <button className="btn btn-gray" onClick={() => inputRef.current.click()}>
            <RiImageAddLine size={64} />
          </button>
        </div>
        {toggleEditModle && (
          <EditUser
            user={currentUser}
            setCurrentUser={setCurrentUser}
            setToggleEditModle={setToggleEditModle}
          />
        )}
      </section>
    )
  ) : (
    <h3>Loading...</h3>
  );
}

const EditUser = ({ user, setToggleEditModle, setCurrentUser }) => {
  const { username, first_name, last_name, email } = user;
  const [changedUsername, setChangedUsername] = useState(username || "");
  const [changedFirstName, setChangedFirstName] = useState(first_name || "");
  const [changedLastName, setChangedLastName] = useState(last_name || "");
  const [changedEmail, setChangedEmail] = useState(email || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/user/${user.clerk_id}/update`, {
      method: "POST",
      body: JSON.stringify({
        clerk_id: user.clerk_id,
        username: changedUsername,
        first_name: changedFirstName,
        last_name: changedLastName,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data.user)
      setCurrentUser(data.user);
      toast.success(data.message);
      setToggleEditModle(false);
    }
  };
  return (
    <section className="modle">
      <button onClick={() => setToggleEditModle(false)} className="btn btn-trasparent fixed right">
        <MdClose size={32} color="#f14a4f" />
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={changedUsername}
          placeholder="username"
          onChange={(e) => setChangedUsername(e.target.value)}
        />
        <input
          type="text"
          value={changedFirstName}
          placeholder="First Name"
          onChange={(e) => setChangedFirstName(e.target.value)}
        />
        <input
          type="text"
          value={changedLastName}
          placeholder="Last Name"
          onChange={(e) => setChangedLastName(e.target.value)}
        />
        <input
          type="email"
          value={changedEmail}
          placeholder="Email"
          onChange={(e) => setChangedEmail(e.target.value)}
        />
        <button className="btn">Save</button>
      </form>
    </section>
  );
};
