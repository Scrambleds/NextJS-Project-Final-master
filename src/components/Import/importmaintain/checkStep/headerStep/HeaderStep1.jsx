import React from 'react'

export default function HeaderStep1({
    importHeaderInDB
}) {
    const importHeaderNumber = importHeaderInDB;
    
  return (
    <div className="text-center text-xl font-semibold">
    <ul className="steps">
      <li className="step step-secondary text-neutral">
        {importHeaderNumber} ข้อมูลเก่า
      </li>
      <li className="step">ตรวจสอบข้อมูลใหม่</li>
      <li className="step">เสร็จสิ้น</li>
    </ul>
  </div>
  )
}
