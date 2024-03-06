"use client";

interface ChildrenProps {
  children: React.ReactNode;
}

export default function IdLayout({ children }: ChildrenProps) {
  return <>{children}</>;
}
