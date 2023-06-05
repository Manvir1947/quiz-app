import React, { useContext } from "react";
import { Context } from "./context";

export default function IntroductionPage() {
  const value = useContext(Context);
  const { setName, name, setIsIntroPage, users } = value;
  return (
    <div className="intro-page">
      <div className="intro-container">
        <h1 className="intro--title">Quizzical</h1>
        <p className="intro--description">Powered by Manvir Singh</p>
        <input
          type="text"
          className="name-input"
          placeholder="Enter your name..."
          name="name-data"
          id="name-data"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          required
        />
        <button
          onClick={() => {
            if (name == "") {
              alert("Please fill the name first!");
            } else {
              setIsIntroPage(false);
            }
          }}
          className="intro--button"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
