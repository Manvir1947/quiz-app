import React from "react";

export default function IntroductionPage(props) {
  return (
    <div className="intro-page">
      <div className="intro-container">
        <h1 className="intro--title">Quizzical</h1>
        <p className="intro--description">powered by Manvir Singh</p>
        <button onClick={props.fetchData} className="intro--button">
          Start Quiz
        </button>
      </div>
    </div>
  );
}
