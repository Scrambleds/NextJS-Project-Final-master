'use client'
import React, { useEffect, useState } from 'react'
import { getOrder, getOrderById, updateOrder } from '../../../function/order';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderDetailPage({params}) {
  const router = useRouter();
  const {id} = params
  const [vendorName,setVendorName] = useState("");
  const [errorMessage,setMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async() =>{
      try {
        const data = await getOrderById(id)
        setVendorName(data.vendor_name);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    }

    fetchOrders();
  },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const result = await updateOrder(id,vendorName);
      if(result?.error){
        setMessage(result.error);
      }else{
        router.push('/order')
      }
    } catch (error) {
      console.error("Error update order:", error);
    }
  }

  return (
    <div>
        <h1 className='text-2xl'>Edit Order {id}</h1>
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
          <button type="submit" className="btn bg-green-600 text-white w-full">
                Edit name
          </button>
          <Link href={`/order`}>
          <span className="btn btn-warning w-full text-white">ยกเลิก</span>
          </Link>
          {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
        </form>
      </div> 
    </div>
  )
}
