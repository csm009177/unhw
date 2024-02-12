"use client";

import React, { useState, useEffect } from "react";
import "../globals.css";

export default function LotationMent() {
  const [seconds, setSeconds] = useState(0);
  const [comments, setComments] = useState([
    "1번 멘트",
    "2번 멘트",
    "3번 멘트",
    "4번 멘트",
    "5번 멘트",
  ]);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
      setCurrentCommentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 500);

    return () => clearInterval(interval);
  }, [comments.length]);

  return <div className="flex text-wrap">{comments[currentCommentIndex]}</div>;
}
