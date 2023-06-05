import React, { useContext } from "react";
import { Context } from "./context";

export default function MainPage({ data }) {
  const { answers, question, index: objIndex } = data;
  const value = useContext(Context);

  const { handleOptionSelect, isComplete } = value;

  function specialCharRemover(inputString) {
    const htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
      "'": "&#039;",
      "``": "&lsquo;",
      "''": "&rsquo;",
      "#": "hash",
      $: "dollar",
      "%": "percent",
      ü: "&uuml;",
      ó: "&oacute;",
      "*": "asterisk",
    };

    var str = inputString;
    Object.entries(htmlEscapes).forEach(
      ([plain, hexCode]) => (str = str.replace(new RegExp(hexCode, "g"), plain))
    );
    return str;
  }

  function optionClasses(e) {
    if (e.istrue && !isComplete) {
      return "option-selected";
    } else if (isComplete) {
      if (e.answer === data.correct_answer) {
        return "correct";
      } else if (e.value && e.value != data.correct_answer) {
        return "wrong-answer";
      }
    }
  }

  const options = answers.map((e) => {
    return (
      <li
        onClick={() =>
          handleOptionSelect(specialCharRemover(e.answer), objIndex, e.id)
        }
        className={`main-page--option ${optionClasses(e)}`}
      >
        {specialCharRemover(e.answer)}
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
