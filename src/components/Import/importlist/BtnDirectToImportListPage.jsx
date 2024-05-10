"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

export default function BtnDirectToImportListPage() {
  return (
    <Link href={"/import/importmaintain"}>
      <div className="flex items-center justify-center gap-2">
        <button className="btn btn-success text-white mt-2">
          <Icon icon="material-symbols:upload" className="text-white text-lg" />
          อัปโหลด
        </button>
      </div>
    </Link>
  );
}
