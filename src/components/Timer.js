import React, { useContext } from "react";
import { Context } from "./context";
export default function Timer() {
  const value = useContext(Context);
  const { time, minutes, seconds } = value;
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
