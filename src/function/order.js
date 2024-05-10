"use server";

import axios from "axios";

const path = process.env.LocalhostDOTNET;

export const getOrder = async() => {
    try {
        const result = await axios.get(`${path}/api/Order/GetOrderList`,{
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store",
              },
        })

        if(!result){
            throw new Error("Cannot fetch data!");
        }
        return result.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const getOrderById = async(id) => {
  try {
    const result = await axios.get(`${path}/api/Order/GetOrder/${id}`,{
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
    })
   
    if(!result){
        throw new Error("Cannot fetch data!");
    }
    return result.data;
} catch (error) {
    throw new Error(error);
}
}

export const addOrder = async (vendorName) => {
  if (vendorName == "") {
    return { error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
  }

  try {
    const result = await axios.post(
        `${path}/api/Order/SaveOrder`,
        {
          vendor_name: vendorName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        }
      );
  } catch (error) {
    console.error("Error create order:", error);
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
};

export const updateOrder = async(id,vendorName) => {
  if (id == null) {
    return { error: "ไม่มี id เข้ามาให้ตรวจสอบ" };
  }

  if (vendorName == "") {
    return { error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
  }

  try {
    const result = await axios.post(
        `${path}/api/Order/UpdateOrder`,
        {
          order_id: id,
          vendor_name: vendorName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        }
      );
  } catch (error) {
    console.error("Error update order:", error);
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
}

export const deleteOrder = async(orderId) => {
    if (orderId == null){
        throw new Error("Don't have id in db");
    }
    const id = orderId
    try{
        const result = await axios.delete(
            `${path}/api/Order/DeleteOrder/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store",
              },
            }
          );
    }catch(error){
        console.error("Error create order:", error);
        return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
    }
}


