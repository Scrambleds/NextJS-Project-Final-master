"use client"
import Image from "next/image";
import React from "react";

export default function LoginImage({
  width,
  height
}) {
  return (
      <Image
        src="/logo/Logo.png"
        width={width || "auto"}
        height={height || "auto"}
        className="object-cover"
        alt="Logo"
        loading="eager"
        priority={true} 
        fill={false}
      />
  );
}
