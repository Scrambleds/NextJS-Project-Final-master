import { Icon } from "@iconify/react";
import React from "react";

export default function FileUploadSection({
  handleFileSubmit,
  handleFile,
  excelName,
  setExcelName,
  uploadExcel,
  typeError,
  setTypeError,
  dragging,
  setDragging,
  excelfile,
  setExcelfile,
  excelData,
  setExcelData,
  setUploadExcel,
  setDataExcelFile,
  loading,
  handleResetFile,
}) {
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const selectedFile = files[0];

      if (
        selectedFile &&
        [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "text/csv",
        ].includes(selectedFile.type)
      ) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelfile(e.target.result);
        };
        setExcelName(selectedFile.name);
      } else {
        setTypeError("Please select only excel file");
        setExcelfile(null);
      }
    } else {
      console.log("Please Select your file");
    }
  };

  return (
    <div>
      {loading && (
        <div className="w-full mt-5 h-[350px] lg:h-[400px] flex items-center justify-center">
          <div className="items-center justify-center flex gap-2 text-slate-600 ">
            <p className="text-lg font-semibold">กำลังตรวจสอบข้อมูล</p>
            <span className="loading loading-dots loading-md"></span>
          </div>
        </div>
      )}
      {excelData != null ? (
        <></>
      ) : (
        <div
          className={`w-full mt-5 h-[350px] lg:h-[400px] border-dashed border-3 border-[#2F3337] flex items-ceter justify-center ${
            dragging || uploadExcel ? "opacity-50" : "opacity-100"
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex items-center justify-center gap-2">
            <p className="text-gray-600"></p>
            {excelName ? (
              <>
                {excelName && uploadExcel ? (
                  <p className="text-gray-500">ตรวจเช็คข้อมูลก่อนบันทึก</p>
                ) : excelName && !uploadExcel ? (
                  <p className="text-gray-500 lg:text-xl">
                    ไฟล์ {excelName} กรุณากดอัปโหลด
                  </p>
                ) : (
                  <></>
                )}

                <button
                  className="btn bg-red-500 lg:text-xl"
                  onClick={handleResetFile}
                >
                  <Icon
                    icon="solar:trash-bin-2-bold"
                    className="text-white text-lg"
                  />
                  <p className="text-white">ยกเลิกไฟล์</p>
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-center">
                    <Icon
                      icon="teenyicons:ms-excel-outline"
                      className=" text-[#5f6468] text-7xl lg:text-8xl"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-gray-500 lg:text-lg">
                      วางไฟล์ เพื่อ อัปโหลดที่นี่ หรือ
                    </p>
                    <form
                      className="form-group costom-from"
                      onSubmit={handleFileSubmit}
                    >
                      <div className="flex items-center justify-center ">
                        <label
                          htmlFor="dropzone-file"
                          className="btn text-lg lg:text-xl font-normal text-white bg-[#5f6468]"
                        >
                          เลือกไฟล์
                          <Icon
                            icon="flowbite:arrow-up-solid"
                            className=" text-white text-xl lg:text-xl"
                          />
                          <input
                            id="dropzone-file"
                            onChange={handleFile}
                            type="file"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
