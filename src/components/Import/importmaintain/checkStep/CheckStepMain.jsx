import React, { useState } from "react";
import Step1 from "./step/Step1";
import Step2 from "./step/Step2";
import Step3 from "./step/Step3";
import BreadCrumbsImMain from "../../../BreadCrumbs/BreadCrumbsImMain";
export default function CheckStepMain({
  checkStep1,
  setCheckStep1,
  excelData,
  setLoading,
  handleResetFile,
  importHeaderInDB,
  setImportHeaderInDB,
  formSumGrade,
  setFormSumGrade,
  session,
}) {
  const [step1, setStep1] = useState({ checkStep1 });
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const exitCheck = () => {
    setCheckStep1(false);
    setStep1(false);
    setStep2(false);
    setStep3(false);
    setImportHeaderInDB("");
    setLoading(false);
    handleResetFile();
    setFormSumGrade(null)
  };

  return (
    <div className="min-h-screen">
      <BreadCrumbsImMain />
      {step1 && !step2 && !step3 && (
        <Step1
          importHeaderInDB={importHeaderInDB}
          setStep1={setStep1}
          setStep2={setStep2}
          excelData={excelData}
          exitCheck={exitCheck}
        />
      )}
      {step2 && !step1 && !step3 && (
        <Step2
          importHeaderInDB={importHeaderInDB}
          formSumGrade={formSumGrade}
          setStep1={setStep1}
          setStep2={setStep2}
          setStep3={setStep3}
          excelData={excelData}
          exitCheck={exitCheck}
          session={session}
        />
      )}
      {step3 && !step1 && !step2 && (
        <Step3 importHeaderInDB={importHeaderInDB} setStep3={setStep3} exitCheck={exitCheck} />
      )}
    </div>
  );
}
