"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const path = process.env.LocalhostDOTNET;

export const GetHomePageList = async (query_CourseName,query_CourseID,query_YearEducation,query_Semester,userId) => {
    const queryParams = new URLSearchParams();
    if (query_CourseName) queryParams.append("CourseName", query_CourseName);
    if (query_CourseID) queryParams.append("CourseID", query_CourseID);
    if (query_YearEducation)queryParams.append("YearEducation", query_YearEducation);
    if (query_Semester) queryParams.append("Semester", query_Semester);
  
    const api = `${path}/api/Home/GetDataTableByUserId?${queryParams.toString()}`;
  
    try {
      const HeaderHomePage = await axios.get(
        api,
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            "userId": userId.toString(),
          },
        }
      );
      if (!HeaderHomePage) {
        throw new Error("Cannot fetch data");
      }
      return HeaderHomePage.data;
    } catch (error) {
      throw new Error("Error to fetch data");
    }
  };