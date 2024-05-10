import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import { AddExcel } from "../../../function/import";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ModalConfirm({
  importHeaderInDB,
  setImportHeaderInDB,
  formSumGrade,
  setLoading,
  setCheckStep1,
  excelData,
  session
}) {
  const router = useRouter();

  const SaveData = async() => {
    const formattedExcelData = excelData.map((item, index) => ({
      no: item.NO,
      id: item.ID,
      name: item.NAME,
      grade: item.GRADE,
      createByUserId: session,
    }));

  const payload = {
    excelData: formattedExcelData,
    importHeader: {
      importHeaderNumber: importHeaderInDB
    },
    sumGrade:formSumGrade
  };
  
  const result = await AddExcel(payload);
  if (result === 1) {
    await toast.success("บันทึกข้อมูลสำเร็จ");
    await router.push("/import/importlist");
  } else {
    await toast.error("พบข้อผิดพลาดเกิดขึ้น");
    console.error("Error save data.");
  }
}


  return (
    <dialog id="confirm" className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-center">
          <Icon
            icon="mingcute:warning-fill"
            width={150}
            height={150}
            className="text-orange-500 text-xl text-center"
          />
        </div>
        <div className="flex items-center justify-center">
          <span className="font-bold text-md">ต้องการตรวจสอบข้อมูลเดิมก่อนหรือไม่</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <h3 className="ml-3.5 font-bold text-md">เนื่องจากข้อมูลตรงกับ</h3>
          <h3 className="font-bold text-lg text-yellow-600">
            {importHeaderInDB}
          </h3>
        </div>
       
        <div className="modal-action">
          <div className="flex items-center justify-center gap-2">
          <button className="btn bg-yellow-600  text-white" onClick={() => setCheckStep1(true)}>ตรวจสอบ</button>
          <button className="btn bg-blue-400  text-white" onClick={SaveData}>ใช้ไฟล์ใหม่</button>
          </div>
          <form method="dialog">
            <button
              onClick={() => setLoading(false) && setImportHeaderInDB("")}
              className="btn px-8 py-3 "
            >
              ปิด
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
