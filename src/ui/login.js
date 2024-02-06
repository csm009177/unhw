import "../App.css";
import React, {useState} from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [message, setMessage] = useState("");
  
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await fetch("/loginFrom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, pw }),
        });
    
        if (response.ok) {
          const { token } = await response.json(); // 토큰 및 사용자 정보 받기
          localStorage.setItem("token", JSON.stringify(token));
    
          const parsedToken = JSON.parse(localStorage.getItem("token") || ''); // 저장된 토큰 가져오기
          if (parsedToken) {
            const idFromToken = parsedToken.id; // 토큰에서 username 추출
            console.log(idFromToken); // username 출력 (디버깅용)
          }
    
          alert("로그인이 완료되었습니다.");
          window.location.href = '/';
        } else {
          setMessage("로그인에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("로그인 중 오류가 발생했습니다.");
      }
    }
  
  return (
    <form className="Login" onSubmit={handleLogin}>
      <input 
        placeholder="type ID here" 
        style={{marginTop:"auto"}} 
        value={id} 
        onChange={(e) => setId(e.target.value)}
        >
      </input>
      <input 
        placeholder="type PW here" 
        value={pw} onChange={(e) => setPw(e.target.value)}
        >
      </input>
      <button style={{color:"green"}}>submit</button>
      {message && <p className="mt-4">{message}</p>}
    </form>
  );
}


