import React, { useEffect, useState } from "react";
import ExcelDataViewer from "../../ExcelDataViewer";
import HeaderStep1 from "../headerStep/HeaderStep1";
import { GetListFromImportHeader } from "../../../../../function/import";
import Loading from "../../../../Loading/Loading";

export default function Step({
  importHeaderInDB,
  setStep1,
  setStep2,
  excelData,
  exitCheck,
}) {
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { excel } = await GetListFromImportHeader(importHeaderInDB);
      setItemList(excel);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {excelData ? (
            <div className="mt-4">
            <HeaderStep1 importHeaderInDB={importHeaderInDB} />
            <div className="table-container table-responsive mt-8 border border-solid max-h-[650px] overflow-y-auto rounded-lg shadow">
              <table className="w-full">
                <thead className="border-b-2 border-gray-200 sticky top-0 bg-gray-50 ">
                  <tr>
                    <th className="text-center w-30 p-3 text-lg font-semibold tracking-wide">
                      NO
                    </th>
                    <th className="text-center w-30 p-3 text-lg font-semibold tracking-wide">
                      ID
                    </th>
                    <th className="text-center w-20 p-3 text-lg font-semibold tracking-wide">
                      NAME
                    </th>
                    <th className="text-center w-30 p-3 text-lg font-semibold tracking-wide">
                      GRADE
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {itemList.map((item, index) => (
                    <tr className="bg-white" key={index}>
                      <td className="text-center w-30 p-3 text-lg text-gray-700 whitespace-nowrap">
                        {item.no}
                      </td>
                      <td className="text-center w-30 p-3 text-lg text-gray-700 whitespace-nowrap">
                        {item.id}
                      </td>
                      <td className="text-left w-20 p-3 text-lg text-gray-700 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="text-center w-30 p-3 text-lg text-gray-700 whitespace-nowrap">
                        {item.grade}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          ) : (
            <p>ไม่มีข้อมูลในระบบ</p>
          )}
        </div>
      )}

      <div className="mt-10 text-xl flex items-center justify-end gap-2">
        <button
          className="btn bg-green-600 text-white text-lg"
          onClick={() => {
            setStep1(false);
            setStep2(true);
          }}
        >
          ถัดไป
        </button>
        <button className="btn text-lg" onClick={exitCheck}>
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
