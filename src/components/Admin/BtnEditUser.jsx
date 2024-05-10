"use client"
import { Icon } from "@iconify/react";
import React from "react";

export default function BtnEditUser() {
  return (
    <button className="btn bg-orange-500 text-white">
      <Icon
        icon="bxs:edit"
        className="text-white text-lg mr-1"
      />
      เเก้ไข
    </button>
  );
}
