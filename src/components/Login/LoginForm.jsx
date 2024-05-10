"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { login, logout } from "../../function/loginSystem";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [state, formAction] = useFormState(login, undefined);

  useEffect(() => {
    if (state?.error) {
      toast.error(state?.error);
    }
  }, [state]);

  return (
    <div>
      <form action={formAction} className="px-10 py-3 flex flex-col gap-5">
        <h1 className="text-3xl text-success font-bold text-center mb-3">
          ระบบจัดเก็บคะเเนนนิสิต
        </h1>
        <input
          type="text"
          name="username"
          placeholder="บัญชีผู้ใช้"
          className="input input-bordered w-full max-w-xs mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="รหัสผ่าน"
          className="input input-bordered w-full max-w-xs mb-4"
        />
        <button className="btn btn-success text-white w-full">
          เข้าสู่ระบบ
        </button>
        <p className="text-sm font-light">หากเข้าสู่ระบบไม่ได้ กรุณาติดต่อเจ้าหน้าที่</p>
      </form>
    </div>
  );
}
