import { useState, useEffect } from "react";
import "./App.css";

function Lobby() {
  const [seconds, setSeconds] = useState(0);
  const [comments, setComments] = useState([
    "Welcome to the unhardware",
    "Hardware is not masic",
    "Hardware will distroy your life",
    "Hardware can be heavy burden",
    "5번 멘트"
  ]);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
      setCurrentCommentIndex(prevIndex => (prevIndex + 1) % comments.length);
    }, 500);

    return () => clearInterval(interval);
  }, [comments.length]);

  return (
    <div className="Lobby">
      <div className="Lobby-LeftCont">{comments[currentCommentIndex]}</div>
      <div className="Lobby-RightCont">
        <div>Log in</div>
        <br></br>
        <div>Sign in</div>
      </div>
    </div>
  );
}

export default Lobby;
