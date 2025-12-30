"use client"
import Link from 'next/link'

import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const signUp = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(`/${session.user.name}`)
    }
  }, [session, router])

  if (session)
    return null;

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400 text-sm">Join NoteMind to supercharge your notes with AI</p>
        </div>

        <div className='flex flex-col gap-4'>
          <button
            className='w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold p-3.5 rounded-xl transition-all duration-200 border border-slate-700 shadow-lg cursor-pointer group'
            onClick={() => signIn('github')}
          >
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" className="w-6 h-6 invert group-hover:scale-110 transition-transform" alt="Github" />
            Continue with Github
          </button>

          <button
            className='w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold p-3.5 rounded-xl transition-all duration-200 shadow-lg cursor-pointer group'
            onClick={() => signIn('google')}
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6 group-hover:scale-110 transition-transform" alt="Google" />
            Continue with Google
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Log In
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium">
            Secure One-Tap Registration
          </p>
        </div>
      </div>
    </div>
  )
}

export default signUp