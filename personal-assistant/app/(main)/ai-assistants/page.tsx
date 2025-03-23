"use client"
import { Button } from '@/components/ui/button'
import AiAssistantsList from '@/services/AiAssistantsList'
import React, { use, useContext, useState } from 'react'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { BlurFade } from '@/components/magicui/blur-fade'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import { PulsatingButton } from '@/components/magicui/pulsating-button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { AuthContext } from '@/context/AuthContext'
import { Loader2Icon } from 'lucide-react'

export type ASSISTANT = {
    id: number,
    name: string,
    title: string,
    image: string,
    instruction: string,
    userInstruction: string,
    sampleQuestions: string[]
}


function AIAssistants() {
    const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT[]>([]);
    const insertAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const onSelect = (ai: ASSISTANT) => {
        const item = selectedAssistant.find((item) => item.id === ai.id);
        if (item) {
            return onDeselect(ai);
        }
        setSelectedAssistant([...selectedAssistant, ai]);
    }
    const onDeselect = (ai: ASSISTANT) => {
        setSelectedAssistant(selectedAssistant.filter((item) => item.id !== ai.id));
    }

    const isAssistantSelected = (ai: ASSISTANT) => {
        return selectedAssistant.some((item) => item.id === ai.id) ? true : false;
    }

    const onContinue = async () => {
        setLoading(true);
        const result = await insertAssistant({
            records: selectedAssistant,
            uid: user?._id
        });
        setLoading(false);
        console.log('result', result);
        // Save to Database
    }

    return (
        <div className='px-10 mt-20 md:px-28 lg:px-36 xl:px-48'>
            <div className='flex justify-between item-center'>
                <div>
                    <h2 className='text-4xl font-bold'>✨Welcome to the World of AI✨</h2>
                    <p className='text-xl mt-4'>Choose your AI companion 🤖 to fulfill your tasks</p>
                </div>
                <Button disabled={selectedAssistant?.length == 0 || loading}
                    onClick={onContinue}
                >{loading && <Loader2Icon className='animate-spin' />}Continue</Button>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
                {AiAssistantsList.map((ai, index) => (
                    <BlurFade key={ai.image} delay={0.25 + index * 0.05} inView>
                        <div key={index} className='hover-border rounded-xl shadow-md p-3 hover:scale-105
                             transition-all ease-in-out cursor-pointer' onClick={() => onSelect(ai)}>
                            <Checkbox className='absolute m-2' checked={isAssistantSelected(ai)} />
                            <Image src={ai.image} alt={ai.name}
                                width={600}
                                height={600}
                                className='h-[200px] w-full rounded-xl object-cover' />
                            <h2 className='text-center font-bold text-lg'>{ai.name}</h2>
                            <h2 className='text-center text-gray-600 dark:text-gray-300'>{ai.title}</h2>
                        </div>
                    </BlurFade>
                ))}
            </div>
        </div>
    )
}

export default AIAssistants