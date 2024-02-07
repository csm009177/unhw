"use client";

import { useRouter, } from "next/navigation";
import { openContext, selectContext } from "../context/styleContext";
import { useContext } from "react";

export default function MainSelectShow() {
  const router = useRouter();
  const { selectedItemIndex } = useContext(selectContext);

  return (
    <div>
      {selectedItemIndex !== null && (
        <div>
          <p>Selected Item : {selectedItemIndex+1}</p>
        </div>
      )}
    </div>
  );
}
