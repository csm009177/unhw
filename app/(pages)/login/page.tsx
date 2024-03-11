"use client";

// Login 컴포넌트
// import "/app/globals.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/loginForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, pw: userPw }),
      });
      const data = await response.json();
      setMessage(data.message);
      // 로그인 성공 시 토큰을 localStorage에 저장하거나 다른 곳으로 관리할 수 있습니다.
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        // 로그인 후 리다이렉션 또는 다른 작업을 수행할 수 있습니다.
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("로그인 중 오류가 발생했습니다.");
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
          <div>
            <input
              style={{
                width: "40vw",
                height: "20vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#373737",
                textAlign: "center",
                color:'white'
              }}
              type="text"
              id="userId"
              value={userId}
              placeholder="type Id:"
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <input
              style={{
                width: "40vw",
                height: "20vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#373737",
                textAlign: "center",
                color:'white'
              }}
              type="password"
              id="userPw"
              value={userPw}
              placeholder="type Pw:"
              onChange={(e) => setUserPw(e.target.value)}
              required
            />
          </div>
          <br />
          <button
            style={{
              width: "40vw",
              height: "20vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#373737",
              color:'white'
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
