import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { useRouter } from 'next/navigation';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const convex = useConvex();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        CheckUserAuth();
    }, [])


    const CheckUserAuth = async () => {
        const token = localStorage.getItem('user_token');
        //Get New Access Token
        const user = token && await GetAuthUserData(token);
        if (!user.email) {
            // Redirect to Sign-in Page
            router.replace('/sign-in');
            return;
        }
        // Get User Info from database
        try {
            const result = await convex.query(api.users.GetUser, { email: user.email });
            if (!result) {
                router.replace('/sign-in');
                return;
            }
            setUser(result);


        } catch (e) {

        }

    }
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default Provider