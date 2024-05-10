import React from "react";

export default function ModalDelete({deleteHeaderNumber,handleDeleteImportList}) {
  return (
    <dialog id="warningDeleteUser" className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-center gap-2">
          <h3 className="font-bold text-lg">คุณต้องการลบรายงาน</h3>
          <h3 className="font-bold text-lg text-red-500">
            {deleteHeaderNumber}
          </h3>
          <h3 className="font-bold text-lg">หรือไม่</h3>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button
              onClick={() => handleDeleteImportList(deleteHeaderNumber)}
              className="btn bg-red-500 px-6 py-3 text-white"
            >
              ลบ
            </button>
            <button className="btn ml-2">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
