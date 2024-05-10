"use client";
import Link from "next/link";
import React, { useState } from "react";
import { editUser } from "../../../function/admin";
import { toast } from "react-toastify";

export default function FormEditUser({ params, user }) {
  //form
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [checkPassword, setCheckPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  //action
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      userId: params,
      newUsername: username,
      newEmail: email,
      newPassword: checkPassword ? newPassword : "",
      newFirstname: firstname,
      newLastname: lastname,
      newIsAdmin: isAdmin,
      checkPassword: checkPassword,
    };
    const result = await editUser(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("บันทึกผู้ใช้งานสำเร็จ");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[80%] mt-4">
      <input type="hidden" value={params} name="userId" />
      <p className="text-md mb-1">ชื่อผู้ใช้งาน</p>
      <input
        type="text"
        name="username"
        placeholder={user.username}
        className="input input-bordered w-full mb-5"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <p className="text-md mb-1">email</p>
      <input
        type="email"
        name="email"
        placeholder={user.email}
        className="input input-bordered w-full mb-5"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <p className="text-md mb-1">ชื่อจริง</p>
      <input
        type="text"
        name="firstname"
        placeholder={user.firstname}
        className="input input-bordered w-full mb-5"
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
      />
      <p className="text-md mb-1">นามสกุล</p>
      <input
        type="text"
        name="lastname"
        placeholder={user.lastname}
        className="input input-bordered w-full mb-5"
        onChange={(e) => setLastname(e.target.value)}
        value={lastname}
      />
      <p className="text-md mb-1">รหัสผ่าน</p>
      <div className="flex w-full mb-7">
        <input
          type="password"
          name="newPassword"
          placeholder="รหัสผ่าน"
          disabled={!checkPassword}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input input-bordered w-full"
        />
        <label className="cursor-pointer label">
          <input
            name="checkPassword"
            type="checkbox"
            checked={checkPassword}
            className="checkbox checkbox-success"
            onChange={() => setCheckPassword(!checkPassword)}
          />
        </label>
      </div>
      <p className="text-md mb-1">สถานะ</p>
      <select
        className="select select-bordered w-[100%] mb-5"
        name="isAdmin"
        // defaultValue={user.isAdmin}
        onChange={(e) => setIsAdmin(e.target.value)}
        value={isAdmin}
      >
        <option value={"0"}>user</option>
        <option value={"1"}>admin</option>
      </select>
      <button type="submit" className="btn bg-primary text-white">
        เเก้ไข
      </button>
      <Link href={"/admin"}>
        <span className="btn w-full mt-2">ยกเลิก</span>
      </Link>
    </form>
  );
}
