import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Context } from "./context";
const PopUpResults = () => {
  const totalRounds = 5;
  const value = useContext(Context);
  const {
    users,
    handleSameUser,
    handleDifferentUser,
    handleStartOver,
    minutes,
    seconds,
  } = value;

  const tableParentVarient = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.2,
      },
    },
  };
  const childrenVarient = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };
  const arrayLength = users.length;

  const currentUser = users[arrayLength - 1];

  const rowsFormat = (index, data, currentUser = false) => {
    return (
      <motion.tr
        variants={childrenVarient}
        className={`all-tr ${
          currentUser == true ? "current-user--tr-data" : "user--tr-data"
        }`}
      >
        <th className="pop-ups-results-name">{index}</th>
        <td className="pop-ups-results-name">{data.name}</td>
        <td className="pop-ups-results-correct">{data.correct}</td>
        <td className="pop-ups-results-incorrect">{data.inCorrect}</td>
        <td>{`${minutes(data.time) < 10 ? "0" : ""} ${minutes(data.time)} : ${
          seconds(data.time) < 10 ? "0" : ""
        } ${seconds(data.time)}`}</td>
      </motion.tr>
    );
  };
  const tableRows = users.map((user, index) =>
    index == arrayLength - 1 ? true : rowsFormat(index + 1, user)
  );

  return (
    <div className="hero-pop-ups-section">
      <div className="main-pop-ups-div">
        <div className="pop-ups-results-div">
          <table className="pop-ups-results-table">
            <thead>
              <tr className="pop-ups-results-headings">
                <th></th>
                <th>User Name</th>
                <th>Correct</th>
                <th>In correct</th>
                <th>Total Time</th>
              </tr>
            </thead>
            <motion.tbody
              whileInView="visible"
              variants={tableParentVarient}
              animate={"visible"}
              initial={"hidden"}
            >
              {tableRows}
              {rowsFormat("-", currentUser, true)}
            </motion.tbody>
          </table>

          <div className="pop-ups-results-buttons-div">
            {arrayLength < totalRounds && (
              <button onClick={handleSameUser}>Same user</button>
            )}
            {arrayLength < totalRounds && (
              <button onClick={handleDifferentUser}>Different user</button>
            )}
            <button onClick={handleStartOver}>Start over</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpResults;
