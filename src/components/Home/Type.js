import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Co-Founder @ nOps Labs",
          "Co-Founder @ Bep Ink",
          "AI Automation Builder",
          "Award-winning Fintech Researcher",
          "Virtual KOL (Dương Quá)",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
