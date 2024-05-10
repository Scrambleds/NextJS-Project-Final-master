"use client";
import React from "react";
import { deleteUser } from "../../../function/admin";
import Swal from 'sweetalert2';
import { Icon } from "@iconify/react";

export default function FormDeleteUser({ userId,userName }) {
  
  const showCustomAlert = async () => {
    const result = await Swal.fire({
      title: "คุณยืนยันที่จะลบ",
      html: `<div>
                ผู้ใช้งาน
                <span style="color: red; font-size: 16px; font-weight: bold;">
                  ${userName}
                </span>
                หรือไม่?
              </div>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน!",
      cancelButtonText: "ยกเลิก"
    });
    if (result.isConfirmed) {
      try {
        const deleteResult = await deleteUser({userId});
        Swal.fire({
          title: "ดำเนินการลบข้อมูลเสร็จสิ้น!",
          text: "ผู้ใช้งานถูกลบสำเร็จแล้ว!",
          icon: "success"
        });
      } catch (error) {
        Swal.fire({
          title: "พบข้อผิดพลาด!",
          text: "ไม่สามารถลบผู้ใช้งานนี้ได้เนื่องจากมีข้อผิดพลาด",
          icon: "error"
        });
      }
    }
  };

  return (
    <>
      <button className="btn bg-red-500 text-white" onClick={showCustomAlert}>
      <Icon icon="mdi:bin" className="text-white text-lg" />
      ลบ
      </button>
    </>
  );
}

