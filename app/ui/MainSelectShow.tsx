"use client";

import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { openContext, selectContext } from "../context/styleContext";

export default function MainSelectShow() {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedItemIndex } = useContext(selectContext);
  const { isOpen, setIsOpen } = useContext(openContext);

  useEffect(() => {
    if (selectedItemIndex !== null) {
      const href = `/item${selectedItemIndex}`; // 동적 URL 생성
      router.push(href); // 해당 동적 URL로 페이지를 라우팅합니다.
    }
  }, [selectedItemIndex, router]);

  return (
    <div
      className="Main-RightCont"
      style={{
        width: isOpen ? "80%" : "98%",
        height: "100%",
        backgroundColor: "#373737",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 선택된 아이템이 있을 경우 메시지 표시 */}
      {selectedItemIndex !== null && (
        <div>
          <p>Selected Item : {selectedItemIndex}</p>
          <form action={{}}>
            <input type="text" />
          </form>
        </div>
      )}
    </div>
  );
}
