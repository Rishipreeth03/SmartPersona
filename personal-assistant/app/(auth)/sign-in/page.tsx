"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { GetAuthUserData } from '@/services/GlobalApi';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';
function signIn() {

  const { user, setUser } = useContext(AuthContext);
  const CreateUser = useMutation(api.users.CreateUser);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {

      if (typeof window !== undefined) {
        localStorage.setItem('user_token', tokenResponse.access_token);
      }
      const user = await GetAuthUserData(tokenResponse.access_token);

      //save user info 
      const result = await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture
      });

      setUser(result);


    },
    onError: errorResponse => console.log(errorResponse),
  });
  return (
    <div suppressHydrationWarning={true} className='flex items-center flex-col justify-center h-screen '>
      <div className='flex flex-col items-center gap-5 border rounded-2xl p-10 shadow-md'>
        <Image src={'/logo.svg'} alt='logo'
          width={100}
          height={100}
        />
        <h2 className='text-2xl'>Sign in to Ai personal Agent</h2>

        <Button onClick={() => googleLogin()}>Sign-in with Gmail</Button>
      </div>
    </div>
  )
}

export default signIn
