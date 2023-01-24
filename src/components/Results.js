import React from "react";

export default function Results(props) {
  const { totalTime, answersResult, minutes, seconds } = props;
  return (
    <h2 className="Results-info-h2">
      {answersResult.allCorrect
        ? "Congo, your all answers are correct"
        : `Your ${answersResult.correctScore} answer${
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
