"use client"

import React, { useContext } from 'react'
import Image from 'next/image'
import { AuthContext } from '@/context/AuthContext'

function header() {
    const { user } = useContext(AuthContext);
    return (
        <div className='p-3 shadow-sm'>

            <Image src={"/logo.svg"} alt='logo'
                width={40}
                height={40}
            />


            <Image src={user?.image} alt='user'
                width={40}
                height={40}
            />
        </div>
    )
}

export default header