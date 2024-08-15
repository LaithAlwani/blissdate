"use client";
import { useState } from "react";
import { MdVerified } from "react-icons/md";

export default function Users({ users }) {
  const [idx, setIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const handleClick = () => {
    if (users.length - 1 === idx) {
      console.log("end of the line");
      return;
    }
    setIdx((prev) => prev + 1);
  };
  const handleImageClick = (value) => {
    if (imgIdx >= users[idx].images.length - 1 && value > 0) {
      setImgIdx((prev) => 0);
    } else if (imgIdx <= 0 && value < 0) {
      setImgIdx(users[idx].images.length - 1);
    } else {
      setImgIdx((prev) => prev + value);
    }
  };
  return (
    <div key={users[idx]._id}>
      {users[idx].images.length > 0 ? (
        <img src={users[idx].images[imgIdx]} alt={users[idx]?.username || "image"} />
      ) : (
        <img src="/user.png" alt={users[idx]?.username || "image"} />
      )}
      <div>
        <button onClick={() => handleImageClick(-1)}>prev</button>
        <button onClick={() => handleImageClick(+1)}>next</button>
      </div>
      <h2>
        {users[idx]?.username || users[idx]?.first_name}{" "}
        <span>{users[idx].verified && <MdVerified color="blue" />}</span>
      </h2>
      <button onClick={handleClick}>X</button>
      <button onClick={handleClick}>Like</button>
    </div>
  );
}
