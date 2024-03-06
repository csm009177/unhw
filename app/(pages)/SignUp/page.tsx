"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

/**
 * Sign up page component.
 */
export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState(""); // Added state for password check
  const [username, setUsername] = useState("");
  const [useraddress, setUseraddress] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  /**
   * Handles form submission.
   * @param {React.FormEvent<HTMLFormElement>} e - Form event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (userPw !== userPwCheck) {
      setMessage("패스워드가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("/signupForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, pw: userPw, username, useraddress }),
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userId">Id:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="userPw">Pw:</label>
        <input
          type="password"
          id="userPw"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="userPwCheck">Pw check:</label>
        <input
          type="password"
          id="userPwCheck"
          value={userPwCheck}
          onChange={(e) => setUserPwCheck(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="username">name:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="useraddress">address:</label>
        <input
          type="text"
          id="useraddress"
          value={useraddress}
          onChange={(e) => setUseraddress(e.target.value)}
          required
        />
      </div>
      <button type="submit">submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}
