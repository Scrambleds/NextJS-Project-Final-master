import React from 'react'

export default function HeaderStep3({
    importHeaderInDB
}) {
    const importHeaderNumber = importHeaderInDB;
    
  return (
    <div className="text-center text-xl font-semibold">
    <ul className="steps">
      <li className="step step-secondary text-neutral">
        {importHeaderNumber} ข้อมูลเก่า
      </li>
      <li className="step step-secondary">ตรวจสอบข้อมูลใหม่</li>
      <li className="step step-secondary">เสร็จสิ้น</li>
    </ul>
  </div>
  )
}
