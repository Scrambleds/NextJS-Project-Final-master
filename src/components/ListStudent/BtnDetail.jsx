"use client"
import { Icon } from "@iconify/react";
import React from "react";

export default function BtnDetail() {
  return (
    <button className="btn bg-green-600 text-white">
        <div className="flex items-center justify-center">
      <Icon
        icon="icon-park-outline:doc-detail"
        className="text-white text-lg mr-1"
      />
      รายละเอียด
      </div>
    </button>
  );
}
