"use client";
import React, { useEffect, useState } from "react";
import { addOrder, deleteOrder, getOrder } from "../../function/order";
import Link from "next/link";

export default function OrderPage() {
  //get data from db
  const [orders, setOrders] = useState([]);
  //form
  const [vendorName, setVendorName] = useState("");
  const [errorMessage, setMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrder();
        setOrders(data);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addOrder(vendorName);
      if (result?.error) {
        setMessage(result.error);
      } else {
        setVendorName("");
        setMessage("");
        const updatedOrders = await getOrder();
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmDelete) {
      try {
        await deleteOrder(orderId);
        const updateOrders = await getOrder();
        setOrders(updateOrders);
      } catch (error) {
        console.error("Error delete order:", error);
      }
    }
  };

  return (
    <div>
      {/* // from กรอกข้อมูล */}
      <div className="border border-solid rounded-lg shadow max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-5">
            <h1 className="text-xl">vendorName</h1>
            <input
              type="text"
              name="vendorName"
              className="input input-bordered"
              placeholder=""
              onChange={(e) => setVendorName(e.target.value)}
              value={vendorName}
            />
          </div>
          <button
            type="submit"
            className="btn bg-green-600 text-white max-w-sm"
          >
            Add name
          </button>
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
        </form>
      </div>

      {/* ตารางเเสดงข้อมูล */}
      <div className="table-container table-responsive mt-5 border border-solid max-h-[700px] max-w-[700px] overflow-y-auto rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                No.
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide">
                Name
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide">
                Edit
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    <a>{index}</a>
                  </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {item.vendor_name}
                  </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    <Link href={`/order/${item.order_id}`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
                  </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    <button
                      className="btn bg-red-600 text-white"
                      onClick={() => handleDelete(item.order_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-3 text-lg text-gray-700 whitespace-nowrap bg-white"
                >
                  <div className="mx-4 my-2 mt-2 text-xl">
                    ไม่มีรายการของฉัน กรุณาอัปโหลด
                  </div>
                </td>
              </tr>
            )}
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
