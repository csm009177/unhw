'use client'

// TokkenCheck 컴포넌트
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TokkenCheck() {
  const router = useRouter();
  const pathname =  usePathname()
  useEffect(() => {
    // 페이지가 렌더링될 때마다 로컬 스토리지에서 토큰을 가져옵니다.
    const token = localStorage.getItem("jwtToken");

    // 토큰이 없으면 로그인 페이지로 이동합니다.
    if (!token && pathname !== "/lobby" && pathname !== "/login" && pathname !== "/signup"){
      router.push("/lobby");
    } else {
    }
  }, [pathname]); // 한 번만 실행되도록 설정

  return null; // 렌더링할 내용이 없으므로 null을 반환합니다.
}
