"use client"
import { BlurFade } from '@/components/magicui/blur-fade';
import { SparklesText } from '@/components/magicui/sparkles-text'
import { Button } from '@/components/ui/button';
import { AssistantContext } from '@/context/AssistantContext';
import { ChevronRight } from 'lucide-react';
import React, { useContext } from 'react'

function EmptyChatState() {
    const { assistant, setAssistant } = useContext(AssistantContext);
    return (
        <div className='flex flex-col items-center'>
            <SparklesText className="text-4xl text-center" text="How Can I Assist You?" />
            <div className='mt-5'>
                {assistant?.sampleQuestions.map((suggestion: string, index: number) => (
                    <BlurFade delay={0.25 * index} key={suggestion}>
                        <div key={index}>
                            <h2 className='p-4 text-lg border rounded-xl mt-1
                        hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-10
                        '>{suggestion}
                                <ChevronRight />
                            </h2>
                        </div>
                    </BlurFade>
                ))}
            </div>
        </div>
    )
}

export default EmptyChatState