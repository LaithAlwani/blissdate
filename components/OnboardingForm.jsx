import React from "react";

export default function OnboardingForm() {
  return (
    <>
      <h2>Please complete your profile</h2>
      <form>
        <input type="file" />
        <input type="text" placeholder="Location" />
        <textarea
          name=""
          id=""
          placeholder="Tell us about yourself make it intresting for others to read.."></textarea>
        <div>
          <label htmlFor="">You are?</label>
          <select name="" id="">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Intrested in?</label>
          <select name="" id="">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="female">Both</option>
          </select>
        </div>
        <button className="btn">Submit</button>
      </form>
    </>
  );
}
