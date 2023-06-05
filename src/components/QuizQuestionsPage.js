import React, { useContext, useEffect, useState } from "react";
import { Context } from "./context";
import Timer from "./Timer";
import Results from "./Results";
import MainPage from "./MainPage";
import PopUpResults from "./popUpResults";
import Spinner from "./spinner";
import OverFlowBackgroundHidden from "./overFlowBackgroundHidden";

const QuizQuestionsPage = () => {
  const value = useContext(Context);

  const [isMainElements, setIsMainElements] = useState(false);
  const {
    name,
    handleCheckAnswer,
    apiData,

    isPopUpResults,
    isComplete,
  } = value;

  const BackgroundOverFlow = OverFlowBackgroundHidden(isPopUpResults);
  let mainElements =
    apiData && apiData.map((api, index) => <MainPage key={index} data={api} />);
  BackgroundOverFlow();
  if (apiData[0]) {
    return (
      <div>
        {isPopUpResults && <PopUpResults />}
        <div className="main-page-container">
          <div className="name">Hi, {name}</div>
          <header className="header-title">
            <Timer />
            <h1 className="quiz-page-title">Quiz Questions</h1>
          </header>

          {mainElements}

          {isComplete && <Results />}

          <button onClick={handleCheckAnswer} className="main-page-button">
            {isComplete ? "Restart Quiz" : "Check answers"}
          </button>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default QuizQuestionsPage;
