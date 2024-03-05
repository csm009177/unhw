"use client";
import Link from "next/link";

export default function Lobby() {
  return (
    <div style={{display:"flex", flexDirection:"column", padding:""}}>
      <Link href="/login">login</Link>
      <Link href="/signup">signup</Link>
    </div>
  );
}
