"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className='flex gap-3 p-2 justify-end text-white'>
          <p>Hello {session?.user?.name}</p>
          <button onClick={() => {signOut({callbackUrl : '/'})}} className='cursor-pointer '>Sign Out</button>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <div className='flex gap-3 p-2 justify-end'>
          <button onClick={() => router.push("/login")} className='cursor-pointer text-white'>Login</button>
          <button onClick={() => router.push("/signUp")} className='cursor-pointer text-white'>Sign Up</button>
        </div>
      </>
    )
  }
}

export default Navbar
