"use client";

import { useRouter } from "next/navigation";
import { openContext, selectContext } from "../context/styleContext";
import { useContext, useEffect } from "react";

export default function MainSelectShow() {
  const router = useRouter();
  const { selectedItemIndex } = useContext(selectContext);
  const { isOpen, setIsOpen } = useContext(openContext);
  // selectedItemIndex가 변경될 때마다 라우팅 처리
  useEffect(() => {
    if (selectedItemIndex !== null) {
      // 선택된 아이템이 있을 경우 해당 인덱스를 기반으로 라우팅 처리
      router.push(`/item/${selectedItemIndex}`);
    }
  }, [selectedItemIndex]);

// 동적으로 생성된 페이지: pages/item/[id].js

  return (
    <div
    className="Main-RightCont"
    style={{
      width: isOpen ? "80%" : "98%",
      height: "100%",
      backgroundColor: "#373737",
      overflow: "hidden",
    }}
  >
      {/* 선택된 아이템이 있을 경우 메시지 표시 */}
      {selectedItemIndex !== null && (
        <div>
          <p>Selected Item : {selectedItemIndex+1}</p>
        </div>
      )}
    </div>
  );
}
