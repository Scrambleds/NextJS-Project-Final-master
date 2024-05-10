"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const path = process.env.LocalhostDOTNET;

export const GetStudent = async (id, name, page, userId) => {
  const queryParams = new URLSearchParams();
  if (id) queryParams.append('id', id);
  if (name) queryParams.append('name', name);
  queryParams.append('page', page);

  const api = `${path}/api/List/GetAllStudentForPage?${queryParams.toString()}`;

  try {
    const HeaderStudent = await axios.get(
      api,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "userId": userId.toString(),
        },
      }
    );
    if (!HeaderStudent) {
      throw new Error("Cannot fetch data");
    }
    return HeaderStudent.data;
  } catch (error) {
    throw new Error("Error to fetch data");
  }
};

export const CountListStudent = async (id, name, userId) => {
  const queryParams = new URLSearchParams();
  if (id) queryParams.append('id', id);
  if (name) queryParams.append('name', name);

  const apiCount = `${path}/api/List/CountAllStudent?${queryParams.toString()}`;

  try {
    const countPage = await axios.get(apiCount, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "userId": userId.toString(),
      },
    });

    if (!countPage) {
      throw new Error("Cannot fetch data");
    }

    return countPage.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const GetGradeStudent = async (id, userId) => {
  try {
    const Student = await axios.get(
      `${path}/api/List/GetGradeStudentByUserId/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "userId": userId.toString(),
        },
      }
    );

    if (!Student) {
      throw new Error("Cannot fetch data");
    }
    return Student.data;
  } catch (error) {
    throw new Error("Error to fetch data");
  }
};

export const GetSumGradeStudent = async(id,userId) => {
  try {
    const SumGrade = await axios.get(`${path}/api/List/SumGradeStudentByUserId/${id}`,
    {
      headers:{
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "userId": userId.toString(),
      }
    }
    );

    if (!SumGrade) {
      throw new Error("Cannot fetch data");
    }
    return SumGrade.data;
  } catch (error) {
    throw new Error("Error to fetch data");
  }
}
