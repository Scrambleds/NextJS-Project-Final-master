"use client";
import React, { useState } from "react";
import ModalImportListDelete from "../../components/Modal/ModalImportListDelete";
import { deleteImportList } from "../../function/listSubject";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

export default function FromDeleteListSubject({ importNo }) {
  const showCustomAlert = async () => {
    const result = await Swal.fire({
      title: "คุณยืนยันที่จะลบ",
      html: `<div>
                การอัปโหลดหมายเลข 
                <span style="color: red; font-size: 16px; font-weight: bold;">
                  ${importNo}
                </span>
                หรือไม่?
              </div>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน!",
      cancelButtonText: "ยกเลิก",
    });
    if (result.isConfirmed) {
      try {
        const deleteResult = await deleteImportList(importNo);
        Swal.fire({
          title: "ดำเนินการลบข้อมูลเสร็จสิ้น!",
          text: "ข้อมูลของคุณถูกลบสำเร็จแล้ว!",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "พบข้อผิดพลาด!",
          text: "ไม่สามารถลบข้อมูลนี้ได้เนื่องจากมีข้อผิดพลาด",
          icon: "error",
        });
      }
    }
  };
  
  return (
    <>
      <button
        className="btn bg-red-500 text-white w-[100px] max-x-lg "
        onClick={showCustomAlert}
      >
        <Icon icon="mdi:bin" className="text-white text-lg" />
        <>ลบ</>
      </button>
    </>
  );
}
