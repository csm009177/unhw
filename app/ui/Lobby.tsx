"use client";
import Link from "next/link";
import LotationMent from "./LotationMent";

export default function Lobby() {
  return (
    <>
      <div>
        <LotationMent />
      </div>
      <div style={{ display: "flex", flexDirection: "column", padding: "" }}>
        <Link href="/login">login</Link>
        <Link href="/signup">signup</Link>
      </div>
    </>
  );
}
