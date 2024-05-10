"use client";
import Link from 'next/link'
import { addUser } from '../../../function/admin';
import { toast } from 'react-toastify';

export default function FormAddUser() {
    const clientAction = async(formData) =>{
        const result = await addUser(formData);
        if(result?.error){
          toast.error(result.error);
        }else{
          toast.success("บันทึกผู้ใช้งานสำเร็จ");
        }
      }
  return (
    <form action={(clientAction)} className="flex flex-wrap justify-between mt-4">
          <input
            type="text"
            name="username"
            placeholder="ชื่อผู้ใช้งาน"
            className="input input-bordered w-[45%] mb-7"
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered w-[45%] mb-7"
          />
          <input
            type="text"
            name="firstname"
            placeholder="ชื่อจริง"
            className="input input-bordered w-[45%] mb-7"
          />
          <input
            type="text"
            name="lastname"
            placeholder="นามสกุล"
            className="input input-bordered w-[45%] mb-7"
          />
          <input
            type="password"
            name="password"
            placeholder="รหัสผ่าน"
            className="input input-bordered w-[45%] mb-7"
          />
          <input
            type="password"
            name="passwordRepeat"
            placeholder="ยืนยันรหัสผ่าน"
            className="input input-bordered w-[45%] mb-7"
          />
          <select
            className="select select-bordered w-[100%] mb-7"
            name="isAdmin"
            defaultValue={"0"}
          >
            <option value={"0"}>user</option>
            <option value={"1"}>admin</option>
          </select>
          <button type="submit" className="btn bg-green-600 text-white w-full">
            เพิ่มผู้ใช้งาน
          </button>
          <Link href={"/admin"} className="w-full">
            <span className="btn w-full mt-2">ยกเลิก</span>
          </Link>
        </form>
  )
}
