"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { ASSISTANT } from '../../ai-assistants/page';
import AiAssistantsList from '@/services/AiAssistantsList';
import { AssistantContext } from '@/context/AssistantContext';
import Image from 'next/image';
import { BlurFade } from '@/components/magicui/blur-fade';

function AssistantList() {
  const { user } = useContext(AuthContext);
  const convex = useConvex();
  const [assistantList, setAssistantList] = useState<ASSISTANT[]>([]);
  const { assistant, setAssistant } = useContext(AssistantContext);
  useEffect(() => {
    user && GetUserAssistants();
  }, [user && assistant == null])

  const GetUserAssistants = async () => {
    const result = await convex.query(api.userAiAssistants.GetAllUserAssistants, {
      uid: user._id
    });
    console.log(result);
    setAssistantList(result);
  }

  return (
    <div className='p-5 bg-secondary border-r-[1px] h-screen relative'>
      <h2 className='font-bold text-lg '>
        Your Personal Ai-Assistants
      </h2>

      <Button className='w-full mt-3'>+ Add New Assistant</Button>

      <Input className=' bg-white mt-4' placeholder='Search' />

      <div className='mt-5'>
        {assistantList.map((assistant_, index) => (
          <BlurFade key={assistant_.image} delay={0.25 + index * 0.05} inView>
            <div className={`p-2 flex-gap-3 items-center
            hover:bg-white hover:dark:bg-gray-800 rounded-xl cursor-pointer mt-2
            ${assistant_.id == assistant?.id && 'bg-gray-200'}
             `}
              key={index} onClick={() => setAssistant(assistant_)}>
              <Image src={assistant_.image} alt={assistant_.name}
                width={60} height={60}
                className='rounded-xl w-[60px] h-[60px] object-cover'
              />
              <div>
                <h2 className='font-bold'>{assistant_.name}</h2>
                <h2 className='text-sm text-gray-500 dark:text-grey-300'>{assistant_.title}</h2>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      <div className='absolute bottom-10 flex gap-3 items-center
       hover:bg-gray-200 w-[87%] p-2 rounded-xl cursor-pointer'>
        <Image src={user?.picture} alt='user' width={35} height={35} className='rounded-full' />
        <div>
          <h2 className='font-bold'>{user?.name}</h2>
          <h2 className='text-sm text-gray-400 '>{user?.orderId ? 'ProPlan' : 'FreePlan'}</h2>
        </div>
      </div>
    </div>
  )
}

export default AssistantList
