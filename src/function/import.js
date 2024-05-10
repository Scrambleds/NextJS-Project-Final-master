"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";

const path = process.env.LocalhostDOTNET;

export const CheckImportHeader = async(importHeaderForm) => {
  try{
    const importHeaderInDB = await axios.post(
      `${path}/api/Import/CheckImportHeader`,
      {
        courseID: importHeaderForm.courseID,
        courseName: importHeaderForm.courseName,
        semester: importHeaderForm.semester,
        yearEducation: importHeaderForm.yearEducation,
      },
       {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
      return importHeaderInDB.data;
  }
   catch (error) {
        console.error("Error adding user:", error);
        return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
    }
}

export const GetListFromImportHeader = async(importHeaderNumber) =>{
  try {
    const listFormDB = await axios.get(
      `${path}/api/Import/GetListExcelFromImportHeader/${importHeaderNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    )
    return listFormDB.data;
  } catch (error) {
    console.error("Error adding user:", error);
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
}

export const AddExcel = async(payload) => {
    try {
        const newExcel = await axios.post(
          `${path}/api/Import`,
           {
            ExcelData: payload.excelData,
            ImportHeader: payload.importHeader,
            SumGrade: payload.sumGrade,
           },
           {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
          }
        );
        revalidatePath("/import");
        return newExcel.data;
    } catch (error) {
        console.error("Error adding user:", error);
        return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
    }
}
