"use client"
import { Icon } from "@iconify/react";
import React from "react";

export default function BtnAddUser() {
  return (
    <button className="btn bg-green-600 text-white">
      <Icon
        icon="ph:user-bold"
        className="text-white text-lg mr-1"
      />
      เพิ่มผู้ใช้งาน
    </button>
  );
}
