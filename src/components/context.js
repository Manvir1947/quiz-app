import React from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const Context = createContext();

const AppContextProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const [users, setUsers] = useState([]);
  const [isIntroPage, setIsIntroPage] = useState(true);
  const [isPopUpResults, setIsPopUpResults] = useState(false);
  const [answersResult, setAnswersResult] = useState({
    allCorrect: false,
    correctScore: 0,
    inCorrectScore: 0,
  });
  const [name, setName] = useState("");

  const [isComplete, setIsComplete] = useState(true);
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  function shuffle(array) {
    let randomIndex;
    for (let i = 0; i < array.length; i++) {
      randomIndex = Math.floor(Math.random() * array.length);

      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }

  function optionElementId(array) {
    let newObj = [];
    array.forEach((element) =>
      newObj.push({
        answer: element,
        id: nanoid(),
        istrue: false,
        value: "",
      })
    );
    return newObj;
  }

  function timer() {
    setTime((old) => old + 1);
  }

  React.useEffect(() => {
    let interval;
    if (apiData[0] && !isIntroPage && !isComplete) {
      interval = setInterval(() => {
        console.log("Inside Interval");
        timer();
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [apiData, isIntroPage, isComplete]);

  function fetchData() {
    if (isComplete) setIsComplete(!isComplete);

    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => {
        setApiData(() => {
          let newArray = [];
          let counter = 0;
          for (let i of data.results) {
            newArray.push({
              index: counter,
              question: i.question,
              answers: optionElementId(
                shuffle([...i.incorrect_answers, i.correct_answer])
              ),
              correct_answer: i.correct_answer,
            });
            counter = counter + 1;
          }
          return newArray;
        });
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  function handleOptionSelect(value, objIndex, id) {
    setApiData(
      apiData.map((obj) => {
        if (obj.index == objIndex) {
          let modifiedAnswers = obj.answers.map((answersObj) => {
            if (answersObj.istrue) {
              return { ...answersObj, value: "", istrue: !answersObj.istrue };
            } else if (answersObj.id == id) {
              return {
                ...answersObj,
                value: value,
                istrue: !answersObj.istrue,
              };
            } else {
              return answersObj;
            }
          });
          return {
            ...obj,
            answers: modifiedAnswers,
          };
        } else {
          return obj;
        }
      })
    );
  }

  const setBasicReset = () => {
    setIsComplete(true);
    setIsPopUpResults(false);
    fetchData();
    setApiData([]);
    setAnswersResult([]);
  };
  const handleSameUser = () => {
    setBasicReset();
  };

  const handleDifferentUser = () => {
    setBasicReset();
    setName("");
    setIsIntroPage(true);
  };
  const handleStartOver = () => {
    setBasicReset();
    setName("");
    setIsIntroPage(true);
    setUsers([]);
  };
  function handleCheckAnswer() {
    if (isComplete) {
      setIsPopUpResults(true);

      setUsers((prev) => {
        return [
          ...prev,
          {
            id: nanoid,
            name: name,
            correct: answersResult.correctScore,
            inCorrect: answersResult.inCorrectScore,
            time: totalTime,
          },
        ];
      });
    } else {
      let correct = 0;
      let lost = 0;

      apiData.forEach((obj) => {
        obj.answers.forEach((ansElement) => {
          if (ansElement.value) {
            if (ansElement.value === obj.correct_answer) {
              correct += 1;
            } else {
              lost += 1;
            }
          }
        });
      });

      if (correct + lost < apiData.length) {
        alert("Please Choose all the options!");
      } else {
        setIsComplete(true);
        setTotalTime(time);
        setTime(0);

        if (correct == apiData.length) {
          setAnswersResult((old) => {
            return {
              ...old,
              allCorrect: true,
            };
          });
        } else {
          setAnswersResult((old) => {
            return {
              ...old,
              correctScore: correct,
              inCorrectScore: lost,
            };
          });
        }
      }
    }
  }

  const seconds = (time) => Math.floor(time % 60);

  const minutes = (time) => Math.floor(time / 60);

  return (
    <Context.Provider
      value={{
        apiData,
        users,
        setUsers,
        isIntroPage,
        setIsIntroPage,
        isPopUpResults,
        answersResult,
        name,
        setName,
        isComplete,
        time,
        totalTime,
        handleOptionSelect,
        handleSameUser,
        handleDifferentUser,
        handleStartOver,
        handleCheckAnswer,
        seconds,
        minutes,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { AppContextProvider, Context };
