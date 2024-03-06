"use client";
import Link from "next/link";
import LotationMent from "./LotationMent";

export default function Lobby() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "50%", height: "100%" }}>
        <LotationMent />
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link href="/login">login</Link>
        <Link href="/signup">signup</Link>
      </div>
    </div>
  );
}
