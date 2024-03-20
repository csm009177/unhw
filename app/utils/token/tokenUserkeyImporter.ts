
export default function tokenUserkeyImporter() {   
  // 1.로컬스토리지에서 암호키를 가져오자
  const userKey = localStorage.getItem("userKey");
  // 2.암호키가 없으면 null을 반환하자
    if (!userKey) return null;  
  //4. 암호키에서 userkey를 추출하자
  const userkey = userKey.split(" ")[1];
  //5. 추출된 userkey를 console.log로 출력하자
  console.log("userkey:", userkey);
  //6. userkey를 반환하자
  return userkey;
}  