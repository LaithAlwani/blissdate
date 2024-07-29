"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "@/styles/profile.css";
import { RiImageAddLine } from "react-icons/ri";
import { MdVerified, MdClose  } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

export default function UserPage() {
  const { user } = useUser();
  const inputRef = useRef();
  const [currentUser, setCurrentUser] = useState();
  const [toggleEditModle, setToggleEditModle] = useState(false);

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
      <section className="profile">
        <button className="btn  btn-trasparent fixed right" onClick={() => setToggleEditModle(!toggleEditModle)}>
          <FaUserEdit size={24} color="#f14a4f"/>
        </button>
        <img src={currentUser.avatar} alt="" className="avatar" />
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
        {toggleEditModle && <EditUser user={currentUser} setToggleEditModle={setToggleEditModle} />}
      </section>
    )
  );
}

const EditUser = ({ user, setToggleEditModle }) => {
  const { first_name, last_name, email, avatar } = user;
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submit")
    setToggleEditModle(false);
  }
  return (
    <section className="modle">
      <button onClick={() => setToggleEditModle(false)} className="btn btn-trasparent fixed right">
        <MdClose size={32} color="#f14a4f"/>
      </button>
      <form onSubmit={handleSubmit}>
        <input type="text" value={first_name} />
        <input type="text" value={last_name} />
        <input type="email" value={email} />
        <button className="btn">Save</button>
      </form>
    </section>
  );
};
