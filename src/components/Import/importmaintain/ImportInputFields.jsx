import { Icon } from "@iconify/react";
import React from "react";

export default function ImportInputFields({
  courseID,
  setCourseID,
  courseName,
  setCourseName,
  semester,
  setSemester,
  yearEducation,
  setYearEducation,
  checkYearEducationSelect,
  setYearEducationSelect,
  yearEducationSelect,
  setCheckYearEducationSelect,
}) {
  // Loop Select Year
  const generateYearOptions = () => {
    const startYear = new Date().getFullYear() + 541;
    const currentYear = new Date().getFullYear() + 542;
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
      years.push(year.toString());
    }

    return years;
  };

  return (
    <div className="mt-5 p-5">
      <div className="lg:flex lg:justify-center lg:items-center">
        <div className="lg:w-1/3">
          <div className="hidden lg:block lg:text-center">
            <div className="flex flex-col gap-2 items-center justify-center">
            <Icon icon="f7:doc-text" className="text-gray-700 text-6xl"/>

            <p className="text-xl font-semibold">กรอกรายระเอียดการอัปโหลด</p>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 border-b-1 bg-white rounded-md shadow p-5">
          <div className="flex flex-col lg:flex-row lg:justify-center">
            <div className="flex-col items-start mt-2 lg:flex-row gap-4 lg:ml-2 xl:ml-5 xl:w-[40%]">
              <label
                htmlFor="courseId"
                className="text-black text-lg flex-shrink-0"
              >
                รหัสวิชา
              </label>
              <div className="flex items-center">
                <input
                  name="courseId"
                  type="text"
                  placeholder="กรุณากรอกรหัสวิชา"
                  className="ml-2 input input-bordered w-full lg:max-w-sm xl:max-w-lg"
                  value={courseID || ""}
                  onChange={(e) => setCourseID(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-col items-start mt-2 lg:flex-row gap-4 lg:ml-2 xl:ml-5 xl:w-[40%]">
              <label
                htmlFor="courseName"
                className="text-black text-lg flex-shrink-0"
              >
                ชื่อวิชา
              </label>
              <div className="flex items-center">
                <input
                  name="courseName"
                  type="text"
                  placeholder="กรุณากรอกชื่อวิชา"
                  className="ml-2 input input-bordered w-full lg:max-w-sm xl:max-w-lg"
                  value={courseName || ""}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-4 lg:flex-row lg:justify-center">
            <div className="flex-col items-start mt-2 lg:flex-row gap-4 lg:ml-2 xl:ml-5 xl:w-[40%]">
              <label
                htmlFor="semester"
                className="text-black text-lg flex-shrink-0"
              >
                ภาคการศึกษา
              </label>
              <div className="flex items-center">
                <select
                  className="ml-2 mb-2 select select-bordered w-full lg:max-w-sm xl:max-w-lg"
                  name="semester"
                  value={semester || ""}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="ภาคฤดูร้อน">ภาคฤดูร้อน</option>
                  <option value="ภาคต้น">ภาคต้น</option>
                  <option value="ภาคปลาย">ภาคปลาย</option>
                </select>
              </div>
            </div>
            <div className="flex-col items-start mt-2 lg:flex-row gap-4 lg:ml-2 xl:ml-5 xl:w-[40%]">
              <label
                htmlFor="yearEducation"
                className="text-black text-lg flex-shrink-0"
              >
                ปีการศึกษา
              </label>
              <div className="flex items-center">
                <select
                  className="ml-2 select select-bordered w-full lg:max-w-sm"
                  name="yearEducationSelect"
                  value={yearEducationSelect || ""}
                  disabled={checkYearEducationSelect}
                  onChange={(e) => setYearEducationSelect(e.target.value)}
                >
                  {generateYearOptions().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <input
                  name="yearEducation"
                  type="text"
                  placeholder="กรุณากรอกปี"
                  disabled={!checkYearEducationSelect}
                  className="ml-2 input input-bordered w-full lg:max-w-sm"
                  value={yearEducation || ""}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const validatedValue =
                      Math.max(1, Math.floor(parseFloat(inputValue))) || "";
                    setYearEducation(validatedValue);
                  }}
                />
                <input
                  type="checkbox"
                  name="checkYearEducationSelect"
                  className="ml-2 checkbox checkbox-sm bg-white"
                  checked={checkYearEducationSelect}
                  onChange={() =>
                    setCheckYearEducationSelect(!checkYearEducationSelect)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
