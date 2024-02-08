'use client'

// 'useRouter' 훅을 사용하여 Next.js의 라우터를 가져옵니다.
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function RouterPush() {
  const router = useRouter();

  useEffect(() => {
    // 동적으로 생성되는 페이지의 id 값을 변수로 받아옵니다.
    const { id } = router.query;
    
    // 예를 들어, '/items/[id]'로 동적 라우팅하고 싶다면 다음과 같이 사용할 수 있습니다.
    router.push(`/items/${id}`);
  }, [router.query]); // 라우터의 쿼리가 변경될 때마다 실행되도록 설정합니다.

  // 라우팅 기능은 useEffect 내에서 작성되었으므로 JSX 반환은 필요하지 않습니다.
  return (
    <div>
      {`/items/${router.query}`}
    </div>
  );
}