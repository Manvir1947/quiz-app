import React, { useContext } from "react";
import { Context } from "./context";

export default function Results() {
  const value = useContext(Context);
  const { totalTime, answersResult, minutes, seconds, name } = value;

  return (
    <h2 className="Results-info-h2">
      {answersResult.allCorrect
        ? `Congo, ${name ? `Hi, ${name} y` : "Y"}our all answers are correct`
        : `${name ? `Hi, ${name} y` : "y"}our ${
            answersResult.correctScore
          } answer${
            answersResult.correctScore > 1 ? "s are" : " is"
          } correct and 
          ${answersResult.inCorrectScore} ${
            answersResult.inCorrectScore > 1 ? "are" : " is"
          } incorrect in ${minutes(totalTime)} mins and ${seconds(
            totalTime
          )} seconds.`}
    </h2>
  );
}
