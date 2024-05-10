"use server";
import axios from "axios";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const path = process.env.LocalhostDOTNET;

export const SearchFilterYearEducation = async (value,userId) => {
  const api = `${path}/api/Home/FilterSearchYear`;
  try {
    const semesterInDB = await axios.get(api, {
      params: {
        yearEducation: value,
      },
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "userId": userId.toString(),
      },
    });
    if (!semesterInDB) {
      throw new Error("Cannot fetch data");
    }
    return semesterInDB.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const SearchFilterSemester = async (yearEducationSelect,value,userId) => {
  const api = `${path}/api/Home/FilterSearchSemester`;
  try {
    const idAndCourseNameInDB = await axios.get(api, {
      params: {
        yearEducation:yearEducationSelect,
        semester: value,
      },
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "userId": userId.toString(),
      },
    });
    if (!idAndCourseNameInDB) {
      throw new Error("Cannot fetch data");
    }
    return idAndCourseNameInDB.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

// export const SearchFilterYear = async (idSelect, nameSelect,userId) => {
//   const api = `${path}/api/Home/FilterSerchYear`;
//   try {
//     const courseNameFilter = await axios.get(api, {
//       params: {
//         idSelect: idSelect,
//         nameSelect: nameSelect,
//       },
//       headers: {
//         "Content-Type": "application/json",
//         "Cache-Control": "no-store",
//         "userId": userId.toString(),
//       },
//     });

//     if (!courseNameFilter) {
//       throw new Error("Cannot fetch data");
//     }
//     return courseNameFilter.data;
//   } catch (error) {
//     throw new Error("Error fetching data");
//   }
// };

