"use client";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function Notfound({ error, reset }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-[90.5vh] xl:h-[89vh] bg-base-200 mt-2">
      <div>
      <Icon
      icon="mingcute:warning-line"
      className="text-orange-500 text-9xl"
    />
      </div>
      <div className="text-center">
        <p className="text-4xl font-semibold text-orange-500 dark:text-red-400 mt-5">
          404 - PAGE NOT FOUND
        </p>
        <p className="text-3xl font-semibold text-orange-500 dark:text-red-400 mt-5">
          ไม่พบหน้าที่คุณต้องการ
        </p>
        <div className="flex justify-center items-center mt-8 ">
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
}
