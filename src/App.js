import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import IntroductionPage from "./components/IntroductionPage";
import QuizQuestionsPage from "./components/QuizQuestionsPage";
import { Context } from "./components/context";

function App() {
  const value = useContext(Context);
  const { isIntroPage, apiData } = value;

  return (
    <main className="App">
      {isIntroPage && <IntroductionPage />}
      {!isIntroPage && <QuizQuestionsPage />}
    </main>
  );
}
export default App;
