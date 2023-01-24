import React from "react";

export default function Timer(props) {
  const { time, minutes, seconds } = props;
  return (
    <div className="timer">
      <input
        type="text"
        value={`${minutes(time) < 10 ? "0" : ""} ${minutes(time)} : ${
          seconds(time) < 10 ? "0" : ""
        } ${seconds(time)}`}
      />
    </div>
  );
}
