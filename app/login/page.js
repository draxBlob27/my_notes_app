"use client"
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Login = () => {
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
            <div className="max-w-md w-full bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-400">Login to access your NoteMind</p>
                </div>

                <div className='flex flex-col gap-4'>
                    <button 
                        className='w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold p-3 rounded-xl transition-all duration-200 border border-slate-700 shadow-lg' 
                        onClick={() => signIn('github')}
                    >
                        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" className="w-6 h-6 invert" alt="Github" />
                        Login with Github
                    </button>

                    <button 
                        className='w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold p-3 rounded-xl transition-all duration-200 shadow-lg' 
                        onClick={() => signIn('google')}
                    >
                        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6" alt="Google" />
                        Login with Google
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-widest">
                        Secure Authentication via NextAuth
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login