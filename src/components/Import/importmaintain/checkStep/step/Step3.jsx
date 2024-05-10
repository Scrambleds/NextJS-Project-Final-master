import Link from "next/link";
import React, { useState, useEffect } from "react";
import Loading from "../../../../Loading/Loading";
import { useRouter } from "next/navigation";
import { GetListFromImportHeader } from "../../../../../function/import";
import HeaderStep3 from "../headerStep/HeaderStep3";
import { toast } from "react-toastify";

export default function Step3({ importHeaderInDB, setStep3, exitCheck }) {
  const router = useRouter();
  const [showCompletion, setShowCompletion] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);

  const RedirectToImportListPage = async () => {
    await router.push("/import/importlist");
  };

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCompletion(true);
      toast.success("บันทึกข้อมูลสำเร็จ");
    }, 2000);
  
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {!showCompletion ? (
        <div className="items-center justify-center flex gap-2 text-neutral ">
          <p className="text-[50px] font-semibold">กำลังบันทึกข้อมูล</p>
          <span className="loading loading-dots w-[100px] h-[200px]"></span>
        </div>
      ) : (
        <div>
          {loading ? (
            <Loading />
          ) : (
            <div>
              {itemList ? (
                <div>
                  <HeaderStep3 importHeaderInDB={importHeaderInDB} />
                  <div className="table-container table-responsive mt-8 border border-solid max-h-[650px] overflow-y-auto rounded-lg shadow">
                    <table className="w-full">
                      <thead className="border-b-2 border-gray-200 sticky top-0 bg-gray-50">
                        <tr>
                          <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                            NO
                          </th>
                          <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                            ID
                          </th>
                          <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                            NAME
                          </th>
                          <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                            GRADE
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {itemList.map((item, index) => (
                          <tr className="bg-white" key={index}>
                            <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                              {item.no}
                            </td>
                            <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                              {item.id}
                            </td>
                            <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                              {item.name}
                            </td>
                            <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                              {item.grade}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-10 text-xl flex items-center justify-end gap-2">
                    <button
                      className="btn bg-blue-500 text-white text-lg"
                      onClick={RedirectToImportListPage}
                    >
                      หน้าเเรก
                    </button>
                  </div>
                </div>
              ) : (
                <p>ไม่มีข้อมูลในระบบ</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
