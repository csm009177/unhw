'use client'

import Link from "next/link";

export default function UrlButton({ url, title }: { url: string; title: string }) {
    console.log(`url : ${url}` )
  return (
    <Link href={url}>{title}</Link>
  );
}