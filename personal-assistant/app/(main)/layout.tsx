"use client"
import React, { useEffect } from 'react'
import Provider from './provider';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useRouter } from 'next/navigation';

function WorkspaceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body>
                <div><Provider>{children}</Provider></div>
            </body>
        </html>
    )
}

export default WorkspaceLayout