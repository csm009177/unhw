'use client'
// item/[id].tsx

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ItemPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // 페이지가 렌더링될 때마다 id를 출력하여 확인합니다.
    console.log("Item ID:", id);
  }, [id]);

  return (
    <div>
      <h1>Item Page</h1>
      <p>Item ID: {id}</p>
    </div>
  );
}
