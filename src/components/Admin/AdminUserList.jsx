"use client";
import React, { useEffect, useState } from "react";
import {
  addUser,
  checkUserInDB,
  comparePassword,
  deleteUser,
  editUser,
  getAllUser,
} from "../../function/admin";
import { useFormState } from "react-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

export default function AdminUserList() {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [state, formAction] = useFormState(addUser, undefined);
  const [editState, editUserFormAction] = useFormState(editUser, undefined);
  const [usernameSearchTerm, setUsernameSearchTerm] = useState("");
  const [emailSearchTerm, setEmailSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  //form AddUser
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPaswordRepeat] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  //form EditUser
  const [userId, setUserId] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newIsAdmin, setNewIsAdmin] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  //form DeleteUser
  const [deleteUserId, setDeleteUserId] = useState(0);
  const [deleteUsername, setDeleteUsername] = useState("");

  const closeModal = () => {
    const modal = document.getElementById("addUser");
    modal.close();
  };

  const editCloseModal = () => {
    const modal = document.getElementById("editUser");
    modal.close();
    resetInputPassword();
  };

  const edit2CloseMode = () => {
    if (editState) {
      if (!editState.error) {
        toast.error('กรุณากรอกรหัสผ่าน')
       return ;
      }
      else{
        const modal = document.getElementById("editUser");
        modal.close();
      }
    }
  }

  const resetInputPassword = () => {
    setCheckPassword(false);
    setNewPassword("");
    document.querySelector("input[name='newPassword']").disabled = true;
  };

  const resetFormAddUserFields = () => {
    setUsername("");
    setEmail("");
    setFirstname("");
    setLastname("");
    setPassword("");
    setPaswordRepeat("");
    setIsAdmin("");
  };

  const fetchData = async () => {
    try {
      const result = await getAllUser();
      setUser(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    if (state) {
      if (!state.error) {
        closeModal();
        toast.success("บันทึกผู้ใช้งานสำเร็จ");
        resetFormAddUserFields();
        fetchData();
      }else{
        toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      }
    } else if (editState) {
      if (!editState.error) {
        editCloseModal();
        toast.success("บันทึกผู้ใช้งานสำเร็จ");
        fetchData();
      }else{
        toast.error('กรุณากรอกรหัสผ่าน')
      }
    } else if (state || editState) {
      if (!state.error || !editState.error) {
        closeModal();
        editCloseModal();
        toast.success("บันทึกผู้ใช้งานสำเร็จ");
        resetFormAddUserFields();
        fetchData();
      }
    }
  }, [state, editState]);

  const filteredUsers = user.filter((item) => {
    const usernameSearchTermLower = usernameSearchTerm.toLowerCase();
    const emailSearchTermLower = emailSearchTerm.toLowerCase();

    return (
      item.username.toLowerCase().includes(usernameSearchTermLower) &&
      item.email.toLowerCase().includes(emailSearchTermLower)
    );
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Get the current page's range of items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const editUserClickHandler = async (selectedUser) => {
    const checkUser = await checkUserInDB(selectedUser.userId);
    setSelectedUser(checkUser);
    setUserId(checkUser?.userId || null);
    setNewUsername(checkUser?.username || "");
    setNewEmail(checkUser?.email || "");
    setNewFirstname(checkUser?.firstname || "");
    setNewLastname(checkUser?.lastname || "");
    setNewPassword("");
    setNewIsAdmin(String(checkUser?.isAdmin) || "0");
    setCheckPassword(false);
    document.getElementById("editUser").showModal();
  };

  const deleteUserClickHandler = async (username, userId) => {
    setDeleteUsername(username);
    setDeleteUserId(userId);
    document.getElementById("warningDeleteUser").showModal();
  };

  const handleDeleteUser = async (userId) => {
    try {
      const result = await deleteUser(userId);
      if (result === 200) {
        toast.success("ลบผู้ใช้งานสำเร็จ");
        fetchData();
      } else {
        toast.error("พบข้อผิดพลาดเกิดขึ้น");
        console.error("Error deleting user.");
      }
    } catch (error) {
      toast.error("พบข้อผิดพลาดเกิดขึ้น");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <div className="flex-col">
          <div className="flex-1">
            <div className="my-4 flex items-center justify-between">
              <div className="flex gap-5">
                <div className="relative ml-2">
                  <Icon
                    icon="material-symbols:search"
                    width={25}
                    height={25}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="ค้นหาตาม username"
                    value={usernameSearchTerm}
                    onChange={(e) => setUsernameSearchTerm(e.target.value)}
                    className="input input-bordered rounded-lg pr-10 py-2 w-full max-w-sm"
                  />
                </div>

                <div className="relative ml-2">
                  <Icon
                    icon="material-symbols:search"
                    width={25}
                    height={25}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="ค้นหาตาม email"
                    value={emailSearchTerm}
                    onChange={(e) => setEmailSearchTerm(e.target.value)}
                    className="input input-bordered rounded-lg pr-10 py-2 w-full max-w-sm"
                  />
                </div>
              </div>
              <div className="flex mr-2">
                <div>
                  <button
                    className="btn bg-green-600 text-white"
                    onClick={() =>
                      document.getElementById("addUser").showModal()
                    }
                  >
                    เพิ่มผู้ใช้งาน
                  </button>
                  <dialog id="addUser" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg text-center text-green-600">
                        รายระเอียดผู้ใช้งาน
                      </h3>
                      <section className="py-4">
                        <form action={formAction}>
                          <div className="flex flex-col">
                            <div className="flex items-center mb-2">
                              <div className="flex flex-col mr-2">
                                <p className="text-md mb-1">ชื่อผู้ใช้งาน</p>
                                <input
                                  type="text"
                                  name="username"
                                  placeholder="ชื่อผู้ใช้งาน"
                                  className="input input-bordered w-full max-w-xs"
                                  onChange={(e) => setUsername(e.target.value)}
                                  value={username}
                                />
                              </div>
                              <div className="flex flex-col">
                                <p className="text-md mb-1">email</p>
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="email"
                                  className="input input-bordered w-full max-w-xs"
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email}
                                />
                              </div>
                            </div>
                            <div className="flex items-center mb-2">
                              <div className="flex flex-col mr-3">
                                <p className="text-md mb-1">ชื่อจริง</p>
                                <input
                                  type="text"
                                  name="firstname"
                                  placeholder="ชื่อจริง"
                                  className="input input-bordered w-full max-w-xs"
                                  onChange={(e) => setFirstname(e.target.value)}
                                  value={firstname}
                                />
                              </div>
                              <div className="flex flex-col">
                                <p className="text-md mb-1">นามสกุล</p>
                                <input
                                  type="text"
                                  name="lastname"
                                  placeholder="นามสกุล"
                                  className="input input-bordered w-full max-w-xs"
                                  onChange={(e) => setLastname(e.target.value)}
                                  value={lastname}
                                />
                              </div>
                            </div>
                            <div className="flex items-center mb-2">
                              <div className="flex flex-col mr-3">
                                <p className="text-md mb-1">รหัสผ่าน</p>
                                <input
                                  type="password"
                                  name="password"
                                  placeholder="รหัสผ่าน"
                                  className="input input-bordered w-full max-w-xs"
                                  onChange={(e) => setPassword(e.target.value)}
                                  value={password}
                                />
                              </div>
                              <div className="flex flex-col">
                                <p className="text-md mb-1">ยืนยันรหัสผ่าน</p>
                                <input
                                  type="password"
                                  name="passwordRepeat"
                                  placeholder="ยืนยันรหัสผ่าน"
                                  className="input input-bordered w-full max-w-xs"
                                  onChange={(e) =>
                                    setPaswordRepeat(e.target.value)
                                  }
                                  value={passwordRepeat}
                                />
                              </div>
                            </div>

                            <div className="flex flex-col">
                              <p className="text-md mb-1">สถานะ</p>
                              <select
                                className="select select-bordered w-full max-w-lg"
                                name="isAdmin"
                                defaultValue={"0"}
                                onChange={(e) => setIsAdmin(e.target.value)}
                                value={isAdmin}
                              >
                                <option value={"0"}>user</option>
                                <option value={"1"}>admin</option>
                              </select>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-end">
                            <button
                              type="submit"
                              className="btn bg-green-600 text-white"
                            >
                              เพิ่มผู้ใช้งาน
                            </button>
                            <button
                              type="button"
                              className="btn"
                              onClick={closeModal}
                            >
                              ยกเลิก
                            </button>
                          </div>
                        </form>
                      </section>
                      <p className="text-center text-[16px]">{state?.error}</p>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                    No.
                  </th>
                  <th className="text-left p-3 text-lg font-semibold tracking-wide">
                    username
                  </th>
                  {/* <th className="text-left w-15 p-3 text-lg font-semibold tracking-wide">
                    password
                  </th> */}
                  <th className="text-left w-15 p-3 text-lg font-semibold tracking-wide">
                    ชื่อผู้ใช้งาน
                  </th>
                  <th className="text-left w-15 p-3 text-lg font-semibold tracking-wide">
                    นามสกุล
                  </th>
                  <th className="text-center tw-15 p-3 text-lg font-semibold tracking-wide">
                    email
                  </th>
                  <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide">
                    สถานะ
                  </th>               
                  <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide flex justify-center items-center">
                    <Icon
                      icon="fluent:options-24-regular"
                      className="text-orange-500 text-xl"
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((item, index) => (
                  <tr className="bg-white" key={`${item.accountId}-${index}`}>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      <a className="font-bold text-blue-500">
                        {startIndex + index + 1}
                      </a>
                    </td>
                    <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item.username}
                    </td>
                    <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item.firstname}
                    </td>
                    <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item.lastname}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item.isAdmin === 1 ? (
                        <span className="p-1.5 text-xs font-medium tracking-wider uppercase text-white bg-blue-600 rounded-lg bg-opacity-50">
                          Admin
                        </span>
                      ) : (
                        <span className="p-1.5 text-xs font-medium tracking-wider uppercase text-black bg-green-600 rounded-lg bg-opacity-50">
                          User
                        </span>
                      )}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      <button
                        className="btn bg-orange-500 text-white"
                        onClick={() => editUserClickHandler(item)}
                      >
                        เเก้ไข
                      </button>
                      <dialog id="editUser" className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg text-center text-orange-500">
                            รายระเอียดผู้ใช้งาน {selectedUser?.username}
                          </h3>
                          <section className="py-4 text-start">
                            <form action={editUserFormAction}>
                              <div className="flex flex-col">
                                <div className="flex items-center mb-2">
                                  <div className="flex flex-col mr-2">
                                    <input
                                      type="hidden"
                                      value={userId}
                                      name="userId"
                                    />
                                    <p className="text-md mb-1">
                                      ชื่อผู้ใช้งาน
                                    </p>
                                    <input
                                      type="text"
                                      name="newUsername"
                                      placeholder="ชื่อผู้ใช้งาน"
                                      value={newUsername}
                                      onChange={(e) =>
                                        setNewUsername(e.target.value)
                                      }
                                      className="input input-bordered w-full max-w-xs"
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-md mb-1">email</p>
                                    <input
                                      type="email"
                                      name="newEmail"
                                      placeholder="email"
                                      value={newEmail}
                                      onChange={(e) =>
                                        setNewEmail(e.target.value)
                                      }
                                      className="input input-bordered w-full max-w-xs"
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center mb-2">
                                  <div className="flex flex-col mr-3">
                                    <p className="text-md mb-1">ชื่อจริง</p>
                                    <input
                                      type="text"
                                      name="newFirstname"
                                      placeholder="ชื่อจริง"
                                      value={newFirstname}
                                      onChange={(e) =>
                                        setNewFirstname(e.target.value)
                                      }
                                      className="input input-bordered w-full max-w-xs"
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-md mb-1">นามสกุล</p>
                                    <input
                                      type="text"
                                      name="newLastname"
                                      placeholder="นามสกุล"
                                      value={newLastname}
                                      onChange={(e) =>
                                        setNewLastname(e.target.value)
                                      }
                                      className="input input-bordered w-full max-w-xs"
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col  mb-2">
                                  <div className="flex items-center gap-2">
                                    <p className="text-md mb-1">รหัสผ่าน</p>
                                    <div className="form-control">
                                      <label className="cursor-pointer label">
                                        <input
                                          name="checkPassword"
                                          type="checkbox"
                                          checked={checkPassword}
                                          value={checkPassword}
                                          className="checkbox checkbox-success"
                                          onChange={() =>
                                            setCheckPassword(!checkPassword)
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                  <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="รหัสผ่าน"
                                    disabled={!checkPassword}
                                    value={newPassword}
                                    onChange={(e) =>
                                      setNewPassword(e.target.value)
                                    }
                                    className="input input-bordered w-full max-w-lg"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-md mb-1">สถานะ</p>
                                  <select
                                    className="select select-bordered w-full max-w-lg"
                                    name="newIsAdmin"
                                    value={String(newIsAdmin)}
                                  >
                                    <option value={"0"}>user</option>
                                    <option value={"1"}>admin</option>
                                  </select>
                                </div>
                              </div>
                              <div className="mt-2 flex justify-end">
                                <button
                                  type="submit"
                                  className="btn bg-orange-500 text-white"
                                  onClick={() => {
                                    if (
                                      !editState ||
                                      (editState && !editState.error)
                                    ) {
                                      edit2CloseMode();
                                    }
                                  }}
                                >
                                  เเก้ไข
                                </button>
                                <button
                                  type="button"
                                  className="btn"
                                  onClick={(e) => editCloseModal(e)}
                                >
                                  ยกเลิก
                                </button>
                              </div>
                            </form>
                          </section>
                          <p className="text-center text-[16px]">
                            {editState?.error}
                          </p>
                        </div>
                      </dialog>
                      <button
                        className="btn bg-red-500 text-white"
                        onClick={() =>
                          deleteUserClickHandler(item.username, item.userId)
                        }
                      >
                        ลบ
                      </button>
                      <dialog id="warningDeleteUser" className="modal">
                        <div className="modal-box">
                          <div className="flex items-center justify-center gap-2">
                            <h3 className="font-bold text-lg">
                              คุณต้องการลบผู้ใช้งาน
                            </h3>
                            <h3 className="font-bold text-lg text-red-500">
                              {deleteUsername}
                            </h3>
                            <h3 className="font-bold text-lg">หรือไม่</h3>
                          </div>
                          <div className="modal-action">
                            <form method="dialog">
                              <button
                                onClick={() => handleDeleteUser(deleteUserId)}
                                className="btn bg-red-500 px-6 py-3 text-white"
                              >
                                ลบ
                              </button>
                              <button className="btn ml-2">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mr-3">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`my-2 px-4 py-2 rounded-md ${
                    currentPage === index + 1 ? "bg-primary text-white" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:hidden">
        <div className="relative">
          <Icon
            icon="material-symbols:search"
            width={25}
            height={25}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="username หรือ email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered rounded-lg  pr-3 py-2 w-full max-w-sm"
          />
        </div>
        <div className="flex justify-start mr-3 gap-1">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`my-2 px-4 py-2 rounded-md ${
                currentPage === index + 1 ? "bg-primary text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {currentItems.map((item, index) => (
          <div key={index} className="card w-70 bg-white shadow-xl">
            <div className="card-body">
              <h2 className="card-title">username : {item.username}</h2>
              <p className="text-lg text-gray-700">
                ชื่อจริง: {item.firstname}
              </p>
              <p className="text-lg text-gray-700">นามสกุล: {item.lastname}</p>
              <p className="text-lg text-gray-700">email: {item.email}</p>
              <div className="card-actions">
                {parseInt(item.isAdmin) === 1 ? (
                  <span className="p-1.5 text-xs font-medium tracking-wider uppercase text-white bg-blue-600 rounded-lg bg-opacity-50">
                    Admin
                  </span>
                ) : (
                  <span className="p-1.5 text-xs font-medium tracking-wider uppercase text-black bg-green-600 rounded-lg bg-opacity-50">
                    User
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
