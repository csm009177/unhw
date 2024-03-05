"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch("/signupForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, pw: password, username: username }),
      });
      const data = await response.json();
      setMessage(data.message);
      router.push("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      setMessage("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}> Sign up Page
      <div>
        <label htmlFor="userId">user Id:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">user Pw:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="username">user name:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <button type="submit">submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}
