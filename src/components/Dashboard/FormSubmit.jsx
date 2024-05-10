"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import CustomSelect from "../../components/Select.jsx";
import DateCalrendar from "../../components/DateCalrendar";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import {SearchFilterSemester ,SearchFilterYearEducation} from "../../function/FormSubmitHome.js"
import { auth } from "../../lib/auth.js";

export default function FormSubmit({ data, listYearEducation,userId }) {
  const [searchCourse, setSearchCourse] = useState({
    courseName: '',
    courseID: '',
    yearEducation: '',
    semester: ''
  });
  const serchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //ตัวแปรในการ fill select => select ตามหลังเก็บค่าที่เลือก
  const [yearEducation,setYearEducation] = useState(listYearEducation);
  const [yearEducationSelect,setYearEducationSelect] = useState("");
  const [semesterCourse, setSemesterCourse] = useState([]);
  const [semesterCourseSelect, setSemesterCourseSelect] = useState("");
  const [courseIdAndCourseName,setCourseIdAndCourseName] = useState([]);
  const [courseIdAndCourseNameSelect,setCourseIdAndCourseNameSelect] = useState("");

  //filter เทอม ด้วย ปี
  const handleFilterYearEducation  = async(value) => {
   await setYearEducationSelect(value);
   await setSemesterCourseSelect("");
   try {
      const SemesterInDB = await SearchFilterYearEducation(value,userId);
      await setSemesterCourse(SemesterInDB);
   } catch (error) {
     throw new Error("Error fetching data");
   }
  }

  //filter รหัสวิชา-ชื่อวิชา ด้วย ปีเเละเทอม
  const handleFilterSemester = async(value) => {
    await setSemesterCourseSelect(value);
    await setCourseIdAndCourseNameSelect("");
    try {
      const CourseIdAndCourseNameInDB = await SearchFilterSemester(yearEducationSelect,value,userId);
      await setCourseIdAndCourseName(CourseIdAndCourseNameInDB)
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }

  //filter ข้อมูลในรายวิชา ด้วย ปี,เทอม,รหัสวิชา-ชื่อวิชา
  const handleOnChangeCourseIDAndCourseName = async(value) =>{
    await setCourseIdAndCourseNameSelect(value);
  }

  const handleFormSubmit = (formData) => {
    setIsLoading(true);

    // Simulate an asynchronous operation with a timeout
    setTimeout(() => {
      // Hide loading spinner after the timeout
      setIsLoading(false);
    }, 2000);

    setSearchCourse("");
    const { yearEducation,semester,courseIdAndCourseName,} = Object.fromEntries(formData);

    let courseIdSplite = '';
    let courseNameSplite = '';
    let separatorIndex = '';
    
    if(courseIdAndCourseName != null){
      separatorIndex = courseIdAndCourseName.indexOf("-");
      courseIdSplite = courseIdAndCourseName.substring(0, separatorIndex);
      courseNameSplite = courseIdAndCourseName.substring(separatorIndex + 1);
    }

    setSearchCourse(prevState =>({
      ...prevState,
      yearEducation: yearEducation,
      semester: semester,
      courseName: courseNameSplite,
      courseID: courseIdSplite,
    }));
  };

  useEffect(() => {
    handleSearch();
  }, [searchCourse]);

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(serchParams);

    if (searchCourse.courseName) {
      params.set("courseName", searchCourse.courseName);
    } else {
      params.delete("courseName");
    }

    if (searchCourse.courseID) {
      params.set("courseID", searchCourse.courseID);
    } else {
      params.delete("courseID");
    }

    if (searchCourse.yearEducation) {
      params.set("YearEducation", searchCourse.yearEducation);
    } else {
      params.delete("YearEducation");
    }

    if (searchCourse.semester) {
      params.set("Semester", searchCourse.semester);
    } else {
      params.delete("Semester");
    }
    replace(`${pathname}?${params}`);
  }, 400);

  return (
    <div className="p-3 h-auto w-full border border-gray-200 border-opacity-50 rounded-lg bg-base-100 shadow-sm">
      <form action={handleFormSubmit}>
        <div className="flex flex-col gap-2 mt-2 2xl:flex-row 2xl:justify-between mx-3">
          <div className="2xl:flex 2xl:gap-5 flex-row">
            <div className="flex items-center mb-2 gap-10 2xl:gap-4">
              <label
                htmlFor="yearEducation"
                className="text-black text-lg flex-shrink-0 ml-5"
              >
                ปีการศึกษา
              </label>
              {listYearEducation.length >= 1 ? (
                <select
                id="yearEducation"
                value={yearEducationSelect ?? ""}
                onChange={(e) => handleFilterYearEducation(e.target.value)}
                className="select select-secondary w-full ml-6 2xl:ml-0 2xl:max-w-xs "
                name="yearEducation"
              >
                <option value="" >กรุณาเลือกปีการศึกษา</option>
                {listYearEducation.map((course, index) => (
                  <option key={index} value={course.yearEducation}>
                    {course.yearEducation}
                  </option>
                ))}
              </select>
              ) : (
                <select
                id="yearEducation"
                className="select select-secondary w-full ml-6 2xl:ml-0 2xl:max-w-xs"
                name="yearEducation"
                disabled
              >
                <option value="" >กรุณาเลือกปีการศึกษา</option>
              </select>
              )}
            </div>
            <div className="flex items-center mb-2 gap-12 2xl:gap-4">
              <label
                htmlFor="semesterCourse"
                className="text-black text-lg flex-shrink-0 ml-5"
              >
                เทอม
              </label>
              {(yearEducation.length >= 1 && semesterCourse.length >=1) && ( yearEducationSelect != "") ? (
                <select
                  id="semester"
                  value={semesterCourseSelect}
                  onChange={(e) => handleFilterSemester(e.target.value)}
                  className="select select-secondary w-full ml-14 2xl:ml-0 2xl:max-w-xs"
                  name="semester"
                >
                  <option value="" selected>กรุณาเลือกเทอม</option>
                  {semesterCourse.map((option, index) => (
                    <option key={index} value={option.semester}>
                      {option.semester}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  id="semester"
                  className="select w-full  ml-14 2xl:ml-0 2xl:max-w-xs"
                  disabled
                >
                  <option value="">กรุณาเลือกเทอม</option>
                </select>
              )}
            </div>
            <div className="flex items-center mb-2 gap-8 2xl:gap-4">
              <label
                htmlFor="courseIdAndCourseName"
                className="text-black text-lg flex-shrink-0 ml-5"
              >
                รหัสวิชา-ชื่อวิชา
              </label>
              {courseIdAndCourseName.length >= 1 ? (
                <select
                  id="courseIdAndCourseName"
                  value={courseIdAndCourseNameSelect}
                  onChange={(e) => handleOnChangeCourseIDAndCourseName(e.target.value)}
                  className="select select-secondary w-full 2xl:max-w-xs"
                  name="courseIdAndCourseName"
                >
                  <option value="">กรุณาเลือกรหัสวิชาเเละวิชา</option>
                  {courseIdAndCourseName.map((option, index) => (
                    <option key={index} value={option.courseIdAndCourseName}>
                      {option.courseIdAndCourseName}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  id="courseIdAndCourseName"
                  className="select w-full 2xl:max-w-xs"
                  disabled
                >
                  <option value="">กรุณาเลือกรหัสวิชาเเละวิชา</option>
                </select>
              )}
            </div>
          </div> 
          <div className="2xl:flex 2xl:gap-5 flex-row">
            {data.length >=1 ? (
                <button
                className="btn btn-primary w-full text-white px-4 py-2 rounded-lg 2xl:w-32 2xl:max-w-md"
                type="submit"
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner text-sm bg-black"></span>
                    <p className="text-black text-sm">รอสักครู่..</p>
                  </>
                ) : (
                  "ค้นหา"
                )}
              </button>
            ) : (
              <button
              className="btn btn-primary w-full text-white px-4 py-2 rounded-lg 2xl:w-32 2xl:max-w-md"
              type="submit"
              disabled={true} // Disable the button while loading
            >
              ค้นหา
            </button>
            )}
          
          </div>
        </div>
      </form>
    </div>
  );
}
