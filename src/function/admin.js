"use server";
import axios from "axios";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const path = process.env.LocalhostDOTNET;

export const getAllUser = async (username, email, page) => {
  const queryParams = new URLSearchParams();
  if (username) queryParams.append('username', username);
  if (email) queryParams.append('email', email);
  queryParams.append('page', page);

  const api = `${path}/api/User/GetAllUser?${queryParams.toString()}`;

  try {
    const user = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });

    if (!user) {
      throw new Error("Cannot fetch data");
    }
    return user.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};


export const CountUser = async (username, email, page) => {
  const queryParams = new URLSearchParams();
  if (username) queryParams.append('username', username);
  if (email) queryParams.append('email', email);

  const apiCount = `${path}/api/User/CountUser?${queryParams.toString()}`;

  try {
    const countPage = await axios.get(apiCount, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });

    if (!countPage) {
      throw new Error("Cannot fetch data");
    }

    return countPage.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};


export const checkUserInDB = async (id) => {
  try {
    const userId = id;
    const UserInDB = await axios.get(`${path}/api/User/GetUser/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });

    if (UserInDB == null) {
      return { message: "ไม่พบผู้ใช้งานนี้ในระบบ" };
    }

    return UserInDB.data;
  } catch (error) {
    console.log(error);
    return { error: "พบข้อผิดพลาดบางอย่าง" };
  }
};

export const addUser = async (formData) => {
  try {
    const {
      username,
      email,
      firstname,
      lastname,
      password,
      passwordRepeat,
      isAdmin,
    } = Object.fromEntries(formData);
    const Admin = parseInt(isAdmin);

    if (
      username == "" ||
      email == "" ||
      firstname == "" ||
      lastname == "" ||
      password == ""
    ) {
      return { error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
    } else if (password !== passwordRepeat) {
      return { error: "รหัสผ่านไม่ถูกต้อง" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await axios.post(
      `${path}/api/User/AddUser`,
      {
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
        isAdmin: Admin,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error adding user:", error);
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
  revalidatePath("/admin");
  redirect("/admin");
};

export const editUser = async (formData) => {
  try {
    const {
      userId,
      newUsername,
      newEmail,
      newFirstname,
      newLastname,
      newPassword,
      newIsAdmin,
      checkPassword,
    } = formData;
    const isAdmin = parseInt(newIsAdmin);

    if (!userId || !newUsername || !newEmail || !newFirstname || !newLastname) {
      return { error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
    }else if (checkPassword && newPassword === "") {
      return { error: "กรุณากรอกรหัสผ่าน" };
    }

    let hashedPassword = null;
    if (!checkPassword) {
      hashedPassword = " ";
    }

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newPassword, salt);
    }

    const checkUser = await checkUserInDB(userId);

    if (checkUser != null) {
      const updateUser = await axios.post(
        `${path}/api/User/UpdateUser`,
        {
          userId: userId,
          username: newUsername,
          firstname: newFirstname,
          lastname: newLastname,
          email: newEmail,
          password: hashedPassword,
          isAdmin: isAdmin,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        }
      );
      // return updateUser.data;
    }
  } catch (error) {
    console.error("Error editing user:", error);
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
  revalidatePath("/admin");
  redirect("/admin");
};

export const deleteUser = async (formData) => {
  const {userId} = formData;
  try {
    const deleteUser = await axios.post(
      `${path}/api/User/DeleteUser/${userId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
    // return deleteUser.status;
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
  revalidatePath("/admin");
  redirect("/admin");
};
