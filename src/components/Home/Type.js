"use client";
import React from "react";
import Typewriter from "typewriter-effect";
import { identity } from "../../data/identity";

function Type() {
  return (
    <Typewriter
      options={{
        strings: identity.basics.typewriter_strings,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
