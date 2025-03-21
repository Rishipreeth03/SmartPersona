"use client"
import React from 'react'
import Image from 'next/image' 
import { Button } from '@/components/ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { GetAuthUserData } from '@/services/GlobalApi';
function signIn() {
    

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
          console.log(tokenResponse);
          if(typeof window !== undefined){
            localStorage.setItem('user_token',tokenResponse.access_token);
          }
          const user=GetAuthUserData(tokenResponse.access_token);
          console.log(user);
          //save user info 
          
        },
        onError: errorResponse => console.log(errorResponse),
      });
  return (
    <div className='flex items-center flex-col justify-center h-screen '>
        <div className='flex flex-col items-center gap-5 border rounded-2xl p-10 shadow-md'>
            <Image src={'/logo.svg'} alt='logo'
                width={100}
                height={100}
            />
            <h2 className='text-2xl'>Sign in to Ai personal Agent</h2>

            <Button onClick={()=>googleLogin()}>Sign-in with Gmail</Button>
        </div>
    </div>
  )
}

export default signIn
