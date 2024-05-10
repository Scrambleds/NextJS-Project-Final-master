import React from "react";
import HeaderStep2 from "../headerStep/HeaderStep2";
import { AddExcel } from "../../../../../function/import";
import { toast } from "react-toastify";

export default function Step2({
  importHeaderInDB,
  formSumGrade,
  setStep1,
  setStep2,
  setStep3,
  excelData,
  exitCheck,
  session
}) {

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
      await setStep2(false);
      await setStep3(true);
    } else {
      await toast.error("พบข้อผิดพลาดเกิดขึ้น");
      console.error("Error save data.");
    }
}

  return (
    <div className="mt-4">
      <HeaderStep2 importHeaderInDB={importHeaderInDB} />
      <div>
        {excelData ? (
          <div className="table-container table-responsive mt-8 border border-solid max-h-[650px] overflow-y-auto rounded-lg shadow">
            <table className="w-full">
              <thead className="border-b-2 border-gray-200 sticky top-0 bg-gray-50">
                <tr>
                  {Object.keys(excelData[0]).map((key) => (
                    <th
                      className="text-center w-10 p-3 text-lg font-semibold tracking-wide"
                      key={key}
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {excelData.map((individualExcelData, index) => (
                  <tr className="bg-white" key={index}>
                    {Object.keys(individualExcelData).map((key) => (
                      <td
                        className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                        key={key}
                      >
                        {key.toLowerCase().includes("date") &&
                        individualExcelData[key] instanceof Date
                          ? formatDateWithTimeZone(individualExcelData[key])
                          : individualExcelData[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}
        {!excelData && <div>ไม่มีข้อมูลจากอัปโหลดไฟล์</div>}
      </div>
      <div className="mt-10 text-xl flex items-center justify-end gap-2">
        <button
          className="btn bg-green-600 text-white text-lg"
          onClick={SaveData}
          >
         บันทึก
        </button>
        <button
          className="btn text-lg"
          onClick={() => {
            setStep1(true);
            setStep2(false);
          }}
        >
          ย้อนกลับ
        </button>
        <a
          className="px-3 py-2 cursor-pointer no-underline hover:underline"
          onClick={exitCheck}
        >
          ยกเลิก
        </a>
      </div>
    </div>
  );
}
