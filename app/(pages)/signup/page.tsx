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
  const [userphonnumber, setUserphonnumber] = useState("");
  const [useremail, setUseremail] = useState("");
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
        body: JSON.stringify({
          id: userId,
          pw: userPw,
          username: username,
          userphonnumber: userphonnumber,
          useremail: useremail,
          useraddress: useraddress,
        }),
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
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#373737",
      }}
    >
      <div
        style={{
          width: "50vw",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#434343",
        }}
      >
        <form onSubmit={handleSubmit}>
          <br />
          <input
            style={{
              width: "40vw",
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#373737",
              textAlign: "center",
              color: "white",
            }}
            type="text"
            id="userId"
            value={userId}
            placeholder="type Id"
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <br />
          <input
            style={{
              width: "40vw",
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#373737",
              textAlign: "center",
              color: "white",
            }}
            type="password"
            id="userPw"
            value={userPw}
            placeholder="type Pw"
            onChange={(e) => setUserPw(e.target.value)}
            required
          />
          <br />
          <input
            style={{
              width: "40vw",
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#373737",
              textAlign: "center",
              color: "white",
            }}
            type="password"
            id="userPwCheck"
            value={userPwCheck}
            placeholder="type Pw Check"
            onChange={(e) => setUserPwCheck(e.target.value)}
            required
          />
          <br />
          <input
            style={{
              width: "40vw",
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#373737",
              textAlign: "center",
              color: "white",
            }}
            type="text"
            id="username"
            value={username}
            placeholder="type user name"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <input
            style={{
              width: "40vw",
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#373737",
              textAlign: "center",
              color: "white",
            }}
            type="text"
            id="userphonnumber"
            value={userphonnumber}
            placeholder="type user phonnumber"
            onChange={(e) => setUserphonnumber(e.target.value)}
            required
          />
          <br />
          <input
            style={{
              width: "40vw",
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#373737",
              textAlign: "center",
              color: "white",
            }}
            type="text"
            id="useremail"
            value={useremail}
            placeholder="type user mail"
            onChange={(e) => setUseremail(e.target.value)}
            required
          />
          <br />
          <input
            style={{
              width: "40vw",
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#373737",
              textAlign: "center",
              color: "white",
            }}
            type="text"
            id="useraddress"
            value={useraddress}
            placeholder="type user address"
            onChange={(e) => setUseraddress(e.target.value)}
            required
          />
          <br />
          <button
            style={{
              width: "40vw",
              height: "20vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#373737",
              color: "white",
            }}
            type="submit"
          >
            {message ? (
              <p style={{ color: "white" }}>{message}</p>
            ) : (
              <p style={{ color: "green" }}>submit</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
