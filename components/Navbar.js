"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    return (
      <nav className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => router.push('/')} 
            className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer"
          >
            NoteMind
          </div>

          {/* User Section */}
          <div className='flex items-center gap-6 text-slate-200'>
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium">
                Hello, <span className="text-indigo-400">{session?.user?.name}</span>
              </p>
              {session?.user?.image && (
                <img 
                  src={session.user.image} 
                  alt="profile" 
                  className="w-8 h-8 rounded-full border border-slate-700"
                />
              )}
            </div>
            <button 
              onClick={() => {signOut({callbackUrl : '/'})}} 
              className='text-sm font-semibold bg-slate-800 hover:bg-red-500/10 hover:text-red-400 border border-slate-700 hover:border-red-500/50 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer'
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
    )
  }
  else {
    return (
      <nav className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => router.push('/')} 
            className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer"
          >
            NoteMind
          </div>

          {/* Auth Buttons */}
          <div className='flex gap-3'>
            <button 
              onClick={() => router.push("/login")} 
              className='text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition-colors cursor-pointer'
            >
              Login
            </button>
            <button 
              onClick={() => router.push("/signUp")} 
              className='text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-lg shadow-indigo-500/20 transition-all cursor-pointer'
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar