"use client";
import { Fuzzy_Bubbles } from "next/font/google";
import * as XLSX from "xlsx";
import React, { use, useEffect, useState } from "react";
import { AddExcel, CheckImportHeader } from "../../../function/import";
import { toast } from "react-toastify";
import ImportInputFields from "./ImportInputFields";
import FileUploadSection from "./FileUploadSection";
import ExcelDataViewer from "./ExcelDataViewer";
import FileUploadButton from "./FileUploadButton";
import ModalConfirm from "./ModalConfirm";
import CheckStepMain from "./checkStep/CheckStepMain";
import TableCountGrade from "./TableCountGrade";
import { useRouter } from "next/navigation";
import BreadCrumbsImMain from "../../BreadCrumbs/BreadCrumbsImMain";
import Loading from "../../Loading/Loading";
import { Icon } from "@iconify/react";

export default function ImportMain({ session }) {
  // Redirect to another page
  const router = useRouter();

  // HeaderForm
  const currentYear = new Date().getFullYear();
  const userId = session;
  const [courseID, setCourseID] = useState("");
  const [courseName, setCourseName] = useState("");
  const [semester, setSemester] = useState("ภาคฤดูร้อน");
  const [yearEducation, setYearEducation] = useState(0);
  const [yearEducationSelect, setYearEducationSelect] = useState(
    (new Date().getFullYear() + 542).toString()
  );
  const [checkYearEducationSelect, setCheckYearEducationSelect] =
    useState(false);

  // chckImportHeader
  const [importHeaderInDB, setImportHeaderInDB] = useState("");
  const [checkImportHeaderInDB, setCheckImportHeaderInDB] = useState(false);
  const [checkStep1, setCheckStep1] = useState(false);

  // Onchange
  const [excelfile, setExcelfile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // Upload
  const [uploadExcel, setUploadExcel] = useState(false);
   
  // ExcelSubmit
  const [excelData, setExcelData] = useState(null);
  const [dataExcelFile, setDataExcelFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Drag file Excel
  const [dragging, setDragging] = useState(false);
  const [excelName, setExcelName] = useState("");

  //SUM Grade
  const [sumGrade, setSumGrade] = useState({});
  const [formSumGrade, setFormSumGrade] = useState(null);
  const expectedColumnPattern = ["NO", "ID", "NAME", "GRADE"];

  //Fake Loading
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setInitialLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (uploadExcel) {
      // Scroll down by 400px
      window.scrollTo({
        top: window.scrollY + 470,
        behavior: "smooth",
      });
    }
  }, [uploadExcel]);

  const validateColumnNames = (worksheet) => {
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    const columnNames = [];

    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = { r: range.s.r, c: C }; // Assuming the column names are in the first row
      const cellRef = XLSX.utils.encode_cell(cellAddress);
      const columnName = worksheet[cellRef]?.v;
      columnNames.push(columnName);
    }

    const uppercaseColumnNames = columnNames.map((name) =>
      name ? name.toUpperCase() : null
    );

    return expectedColumnPattern.every(
      (expectedColumnName, index) =>
        uppercaseColumnNames[index] === expectedColumnName.toUpperCase()
    );
  };

  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    setExcelName(selectedFile.name);
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelfile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file");
        setExcelfile(null);
      }
    } else {
      console.log("Please Select your file");
    }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();

    if (excelfile !== null) {
      setUploadExcel(true);
    }

    if (excelfile === null) {
      toast.error("กรุณาอัปโหลดไฟล์ Excel");
      return;
    }
    // else if(!excelfile){
    //   toast.error("กรุณาอัปโหลดไฟล์ Excel");
    //   return;
    // }

    if (excelfile !== null) {
      const workbook = XLSX.read(excelfile, {
        type: "buffer",
        cellDates: true,
      });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      // Validate column names
      if (!validateColumnNames(worksheet)) {
        toast.error("ไฟล์ไม่ถูกต้อง กรุณาลองอีกครั้ง");
        console.error("Invalid column names in the Excel file.");
        // Handle the validation error (e.g., show a message to the user)
        return;
      }

      const data = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        dateNF: "mm/dd/yyyy",
      });

      // Map the data to include formatted dates and handle specific columns
      // const formattedData = data.map((rowData) => ({
      //   NO: rowData["NO"],
      //   ID: rowData["ID"],
      //   NAME: rowData["NAME"],
      //   GRADE: rowData["GRADE"]
      // }));

      const formattedData = data.map((rowData) => {
        const formattedRow = {};
        for (const key in rowData) {
          const formattedKey = key.toUpperCase();
          formattedRow[formattedKey] = rowData[key];
        }
        return formattedRow;
      });

      setDataExcelFile(formattedData);
      setExcelData(formattedData);
    }
  };
  const saveExcel = async () => {
    if (!excelfile) {
      toast.error("กรุณาอัปโหลดไฟล์ Excel");
      return;
    }

    if (
      !courseID.trim() ||
      !courseName.trim() ||
      (yearEducation == 0 && !yearEducationSelect.trim())
    ) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (checkYearEducationSelect) {
      if (!courseID.trim() || !courseName.trim() || yearEducation == 0) {
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      } else if (!checkYearEducationSelect) {
        if (!courseID.trim() || !courseName.trim()) {
          toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
          return;
        }
      }
    }

    let formData = {
      courseID: courseID.trim(),
      courseName: courseName.trim(),
      semester: semester.trim(),
      yearEducation: checkYearEducationSelect
        ? yearEducation
        : yearEducationSelect.trim(),
      createByUserId: session,
    };

    if (dataExcelFile == null) {
      toast.error("กรุณาอัปโหลดไฟล์ Excel");
      return;
    } else if (dataExcelFile && dataExcelFile.length > 0) {
      const formattedExcelData = dataExcelFile.map((item, index) => ({
        no: item.NO,
        id: item.ID,
        name: item.NAME,
        grade: item.GRADE,
        createByUserId: session,
      }));

      const importHeaderForm = {
        courseID: formData.courseID,
        courseName: formData.courseName,
        semester: formData.semester,
        yearEducation: formData.yearEducation.toString(),
      };

      const newGrade = {
        ...sumGrade,
        total: excelData.length,
        createByUserId: session,
      };
      setFormSumGrade(newGrade);

      const importHeader = {
        courseID: formData.courseID,
        courseName: formData.courseName,
        semester: formData.semester,
        yearEducation: formData.yearEducation.toString(),
        createByUserId: session,
      };

      const payload = {
        excelData: formattedExcelData,
        importHeader: importHeader,
        sumGrade: newGrade,
      };

      try {
        await setLoading(true);

        const checkImportHeader = await CheckImportHeader(importHeaderForm);

        if (
          checkImportHeader.status == 1 &&
          checkImportHeader.importHeaderNumber != null
        ) {
          setCheckImportHeaderInDB(true);
          document.getElementById("confirm").showModal();
          setImportHeaderInDB(checkImportHeader.importHeaderNumber);
        } else {
          const result = await AddExcel(payload);
          if (result === 1) {
            await router.push("/import/importlist");
            await toast.success("บันทึกข้อมูลสำเร็จ");
            await setLoading(false);
          } else {
            await setLoading(false);
            await toast.error("พบข้อผิดพลาดเกิดขึ้น");
            console.error("Error deleting user.");
          }
        }
      } catch (error) {
        await setLoading(false);
        console.error("Error saving Excel data:", error);
      }
    }
  };

  //ResetExcel
  const handleResetFile = () => {
    setExcelfile(null);
    setExcelName("");
    setExcelData(null);
    setUploadExcel(false);
    setDataExcelFile(null);
    setSumGrade({});
  };

  return (
    <div>
      {initialLoading ? (
        <Loading />
      ) : (
        <div className="h-full mx-auto p-3">
          {checkStep1 ? (
            <CheckStepMain
              checkStep1={checkStep1}
              setCheckStep1={setCheckStep1}
              excelData={excelData}
              setLoading={setLoading}
              handleResetFile={handleResetFile}
              importHeaderInDB={importHeaderInDB}
              setImportHeaderInDB={setCheckImportHeaderInDB}
              formSumGrade={formSumGrade}
              setFormSumGrade={setFormSumGrade}
              session={session}
            />
          ) : (
            <>
              {/*Breadcrumb Section*/}
              <div className="">
                <BreadCrumbsImMain />
              </div>
  
              {/*Page Title*/}
              <div className="mt-2">
                <p className="text-2xl font-bold">อัปโหลดรายการคะแนนนิสิต</p>
              </div>
  
              {/*Header Section*/}
              <div className="mt-2">
                <ImportInputFields
                  courseID={courseID}
                  setCourseID={setCourseID}
                  courseName={courseName}
                  setCourseName={setCourseName}
                  semester={semester}
                  setSemester={setSemester}
                  yearEducation={yearEducation}
                  setYearEducation={setYearEducation}
                  checkYearEducationSelect={checkYearEducationSelect}
                  yearEducationSelect={yearEducationSelect}
                  setYearEducationSelect={setYearEducationSelect}
                  setCheckYearEducationSelect={setCheckYearEducationSelect}
                />
              </div>
  
              {/*Excel File Upload Section*/}
              <div className="mt-3">
                <FileUploadButton
                  handleFileSubmit={handleFileSubmit}
                  saveExcel={saveExcel}
                />
              </div>
  
              {/*File Upload Section*/}
              <FileUploadSection
                handleFileSubmit={handleFileSubmit}
                handleFile={handleFile}
                excelName={excelName}
                setExcelName={setExcelName}
                uploadExcel={uploadExcel}
                setUploadExcel={setUploadExcel}
                excelfile={excelfile}
                setExcelfile={setExcelfile}
                typeError={typeError}
                setTypeError={setTypeError}
                dragging={dragging}
                setDragging={setDragging}
                excelData={excelData}
                setExcelData={setExcelData}
                setDataExcelFile={setDataExcelFile}
                loading={loading}
                handleResetFile={handleResetFile}
              />
  
              {/*Excel Data Viewer Section*/}
              <div className="mt-10">
                <ExcelDataViewer
                  handleResetFile={handleResetFile}
                  excelData={excelData}
                  loading={loading}
                  setSumGrade={setSumGrade}
                />
              </div>
  
              {/*Modal Confirm for Duplicate Files*/}
              <ModalConfirm
                importHeaderInDB={importHeaderInDB}
                excelData={excelData}
                formSumGrade={formSumGrade}
                setImportHeaderInDB={setImportHeaderInDB}
                setLoading={setLoading}
                setCheckStep1={setCheckStep1}
                session={session}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}  
