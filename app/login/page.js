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
        <>
            <div className='flex flex-col gap-4'>
                <button className='p-2 text-white cursor-pointer' onClick={() => signIn('github')}>Login with Github</button>
                <button className='p-2 text-white cursor-pointer' onClick={() => signIn('google')}>Login with Google</button>
            </div>
        </>
    )
}


export default Login
