"use client"
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ count,rows,pageNow,amountPage }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = rows;

  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

  const handleChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };
  
  return (
    <div className="flex justify-between px-5 py-2">
      <div className="flex justify-center items-center">
        { amountPage != 0 && 
        <span className="badge py-5 px-3 text-md">หน้า {pageNow} / {amountPage}</span>
        }
      </div>
      <div className="flex gap-2">
      <button
        className={`my-2 btn rounded-md bg-gray-400 text-white`}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        {!hasNext && page == 1 ?  (
          <>ถัดไป</>
        ) : (
          <>ย้อนกลับ</>
        )}
      </button>
      {hasNext && (
        <button
          className={`my-2 btn rounded-md bg-primary text-white`}
          onClick={() => handleChangePage("next")}
        >
          ถัดไป
        </button>
      )}
      </div>
    </div>
  );
}

