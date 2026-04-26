"use client";
import dynamic from "next/dynamic";

const ResumeNew = dynamic(() => import("../../src/components/Resume/ResumeNew"), {
  ssr: false,
});

export default function Page() {
  return <ResumeNew />;
}
