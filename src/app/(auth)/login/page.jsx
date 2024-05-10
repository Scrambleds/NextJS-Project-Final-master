import React from 'react'
import LoginForm from '../../../components/Login/LoginForm'
import LoginImage from "../../../components/Login/LoginImage"
import { auth } from '../../../lib/auth'

export default async function LoginPage() {
  return (
    <div className="flex flex-col bg-white space-y-5 items-center justify-center h-screen">
      <div className='mx-auto mb-5'>
        <LoginImage width={300} height={40} />
      </div>
      <div className="w-[500px] bg-gray-300 p-[50px] flex flex-col text-center gap-[30px] rounded-md">
        <LoginForm />
      </div>
    </div>
  )
}
