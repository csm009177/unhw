"use client";

import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { openContext, selectContext } from "../context/styleContext";
import { useContext, useEffect } from "react";
import ItemPage from '../(pages)/[id]/page';


export default function MainSelectShow() {
  const router = useRouter();
  // const { id } = router.query;
  const { selectedItemIndex } = useContext(selectContext);
  const { isOpen, setIsOpen } = useContext(openContext);





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
          <p>Selected Item : {selectedItemIndex + 1}</p>
          <form action={{ }}>
            <input type="text" />
          </form>
        </div>
      )}
    </div>
  );
}
