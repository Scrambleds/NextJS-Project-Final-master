"use client"
import React, { useState } from 'react'

export default function Pagination({ totalPages, currentPage, handlePageChange }) {
   
  return (
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
  )
}
