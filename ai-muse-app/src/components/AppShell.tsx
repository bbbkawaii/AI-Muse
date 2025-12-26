"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";

const ShaderBackground = dynamic(() => import("@/components/ShaderBackground"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-void" />,
});

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShaderBackground />
      <div className="relative z-10">
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
}

