"use client"
import { Icon } from "@iconify/react";
import React from "react";

export default function BtnDeleteUser() {
  return (
    <button
    className="btn bg-red-500 text-white w-[100px] max-x-lg "
  >
    <Icon icon="mdi:bin" className="text-white text-lg" />
    <>ลบ</>
  </button>
  );
}
