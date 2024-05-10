"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import React from "react";

const ErrorComponent = ({ error, reset }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-[90.5vh] xl:h-[89vh] bg-base-200 mt-2">
      <Icon icon="mingcute:warning-line" className="text-orange-500 text-9xl" />
      <div className="text-center">
        <p className="text-3xl font-semibold text-orange-500 dark:text-red-400 mt-3">
          มีข้อผิดพลาดเกิดขึ้น
        </p>
        <p className="mt-10 text-2xl font-semibold text-emerald-700 dark:text-emerald-500">
          กรุณาลองใหม่อีกครั้ง หรือ ติดต่อผู้ดูแลระบบ
        </p>
        <div className="flex justify-center items-center gap-8 mt-10 ">
          <div>
            <button className="btn bg-warning-500 text-white" onClick={reset}>
              ลองอีกครั้ง
            </button>
          </div>
          <div>
            <button
              className="btn bg-emerald-600 text-white"
              onClick={() => router.push("/")}
            >
              กลับสู่หน้าหลัก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
