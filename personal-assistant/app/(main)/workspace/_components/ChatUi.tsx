"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import EmptyChatState from './EmptyChatState'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2Icon, Save, Send } from 'lucide-react'
import AiModelOptions from '@/services/AiModelOptions'
import { Assistant } from 'next/font/google'
import { AssistantContext } from '@/context/AssistantContext'
import axios from 'axios'
import Image from 'next/image'

type MESSAGE = {
    role: string,
    content: string
}

function ChatUi() {
    const [input, setInput] = useState<string>('');
    const { assistant, setAssistant } = useContext(AssistantContext);
    const [messages, setMessages] = useState<MESSAGE[]>([]);
    const [loading, setLoading] = useState(false);
    const chatRef = useRef<any>(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        setMessages([]);
    }, [assistant?.id])

    const onSendMessage = async () => {
        setMessages(prev => [...prev,
        {
            role: 'user',
            content: input
        },
        {
            role: 'assistant',
            content: 'Loading...'
        }
        ])
        setLoading(true);
        const userInput = input;
        setInput('');
        const AIModel = AiModelOptions.find(item => item.name == assistant?.aiModelId);
        const result = await axios.post("/api/eden-ai-model", {
            provider: AIModel?.edenAi,
            userInput: userInput + ":" + assistant?.instruction + ":" + assistant?.userInstruction,
            aiResp: messages[messages?.length - 1]?.content
        })
        setLoading(false);
        setMessages(prev => prev.slice(0, -1));
        setMessages(prev => [...prev, result.data]);
    }

    return (
        <div className='mt-20 p-6 relative h-[88vh]'>
            {messages.length == 0 && <EmptyChatState />}

            <div className='overflow-scroll h-[80%] scrollbar-hide'>
                {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-5 mb-2 ${msg.role == 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className='flex gap-3'>
                            {msg.role == "assistant" &&
                                <Image src={assistant?.image} alt={assistant?.name}
                                    width={60} height={60}
                                    className='rounded-full w-[60px] h-[60px] object-cover'
                                />
                            }
                            <div className={`p-3 rounded-lg ${msg.role == 'user' ? 'bg-gray-300 text-black' : 'bg-gray-100 text-black'}`}>
                                {loading && index == messages.length - 1 && <Loader2Icon className='animate-spin' />}
                                <h2>{msg.content}</h2>
                            </div>
                        </div>
                    </div>

                ))}
            </div>


            <div className='absolute bottom-5 w-[95%] p-5
            flex justify-between gap-5'>
                <Input placeholder='Type Here to Chat'
                    value={input}
                    disabled={loading}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyPress={(event) => event.key == 'Enter' && onSendMessage}
                />
                <Button disabled={loading} onClick={onSendMessage}>
                    <Send />
                </Button>
            </div>


        </div>
    )
}

export default ChatUi