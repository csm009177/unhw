// app\utils\token\tokenUserkeyImporter.ts
//! 로컬스토리지에서 토큰을 가져와서 디코딩하여 userkey를 가져오는 함수 

// 로컬에서 토큰만 가져오면 해석이 가능해서 위험할 수 있음
export default function tokenUserkeyImporter(): string | null {
  // 1. 로컬스토리지에서 토큰을 가져옵니다.
  const token = localStorage.getItem("token");
  console.log("token:", token);

  // 2. JWT를 해석합니다.
  if (!token) return null;
  //? 왜 spilit을 사용하는지 이해가 안됨
  // 디코딩하려면 먼저 토큰을 여러 부분으로 분할해야 합니다
  const tokenParts = token.split(".");
  //? 왜 length가 3이 아니면 에러를 출력하는지 이해가 안됨
  // JWT는 세 부분으로 구성되어 있습니다. 그렇지 않으면 잘못된 JWT라고 판단합니다.
  if (tokenParts.length !== 3) {
    console.error("Invalid JWT format");
    return null;
  }

  // 3. 토큰의 두 번째 부분에 있는 페이로드를 디코딩하여 userkey를 가져옵니다.
  //? atob이 뭔지 모른다
  // atob 함수는 Base64로 인코딩된 문자열을 디코딩합니다. 
  // 이 페이로드를 디코딩하려면 atob 함수를 사용합니다
  //? 왜 tokenParts[1]을 명시했는지 모르겠다
  // JWT의 두 번째 부분에는 인코딩된 페이로드가 있습니다
  const payload = JSON.parse(atob(tokenParts[1]));
  const userkey = payload.userkey;
  console.log("userkey:", userkey);

  return userkey;
}