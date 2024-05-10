import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

export default function FileUploadButton({ handleFileSubmit, saveExcel }) {
  return (
    <div className="flex items-center justify-end gap-2 h-full">
      <Link href={"/import/importlist"}>
      <button
        className="btn btn-active bg-red-500 text-white w-[120px] max-x-lg"
      >
        <Icon icon="material-symbols:cancel-outline" className="text-white text-lg"/>
        ยกเลิก
      </button>
      </Link>
      <button
        className="btn btn-active bg-blue-400 w-[120px] max-x-lg text-white"
        onClick={handleFileSubmit}
      >
        <Icon icon="material-symbols:upload" className="text-white text-lg"/>
        อัปโหลด
      </button>
      <button
        className="btn btn-active bg-green-600 text-white w-[120px] max-x-lg mr-5"
        onClick={saveExcel}
      >
        <Icon icon="mingcute:save-line" className="text-white text-lg"/>
        บันทึก
      </button>
    </div>
  );
}
