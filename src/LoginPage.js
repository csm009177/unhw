import { useState, useEffect } from "react";
import "./App.css";

function LoginPage() {
  const [seconds, setSeconds] = useState(0);
  const [comments, setComments] = useState([
    "1번 멘트",
    "2번 멘트",
    "3번 멘트",
    "4번 멘트",
    "5번 멘트"
  ]);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
      setCurrentCommentIndex(prevIndex => (prevIndex + 1) % comments.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [comments.length]);

  return (
    <div className="LoginPage">
      <div className="LoginForm-LeftCont">{comments[currentCommentIndex]}</div>
      <div className="LoginForm-RightCont">right</div>
    </div>
  );
}

export default LoginPage;
