import React from "react";

export default function MainPage(props) {
  const answers = props.data.answers;
  const question = props.data.question;
  const objIndex = props.data.index;

  function specialCharRemover(inputString) {
    const htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
      "'": "&#039;",
    };

    var str = inputString;
    Object.entries(htmlEscapes).forEach(
      ([plain, hexCode]) => (str = str.replace(new RegExp(hexCode, "g"), plain))
    );
    return str;
  }
  function optionClasses(e) {
    if (e.istrue && !props.isComplete) {
      return "option-selected";
    } else if (props.isComplete) {
      if (e.answer === props.data.correct_answer) {
        return "correct";
      } else if (e.value && e.value != props.data.correct_answer) {
        return "wrong-answer";
      }
    }
  }

  const options = answers.map((e) => {
    return (
      <li
        onClick={() =>
          props.handleOptionSelect(specialCharRemover(e.answer), objIndex, e.id)
        }
        className={`main-page--option ${optionClasses(e)}`}
      >
        {e.answer}
      </li>
    );
  });

  return (
    <div className="main-page">
      <h2 className="main-page--question">{specialCharRemover(question)}</h2>
      <ul className="main-page--answers-ul">{options}</ul>
      <div className="main-divider"></div>
    </div>
  );
}
