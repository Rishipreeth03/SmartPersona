"use client"
import { AssistantContext } from '@/context/AssistantContext';
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AiModelOptions from '@/services/AiModelOptions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Ghost, Loader2Icon, Save, Trash } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import ConfirmationAlert from './ConfirmationAlert';
import { BlurFade } from '@/components/magicui/blur-fade';




function AssistantSettings() {
  const { assistant, setAssistant } = useContext(AssistantContext);
  const UpdateAssistant = useMutation(api.userAiAssistants.UpdateUserAssistant);
  const DeleteAssistant = useMutation(api.userAiAssistants.DeleteAssistant);
  const [loading, setLoading] = useState(false);
  const onHandleInputChange = (field: string, value: string) => {
    setAssistant((prev: any) => ({
      ...prev,
      [field]: value
    }))
  }

  const onSave = async () => {
    setLoading(true);
    const result = await UpdateAssistant({
      id: assistant?._id,
      aiModelId: assistant?.aiModelId,
      userInstruction: assistant?.userInstruction
    })
    toast('Saved Successfully');
    setLoading(false);

  }

  const onDelete = async () => {
    setLoading(true);
    const result = await DeleteAssistant({
      id: assistant?._id,
    })
    toast('Deleted Successfully');
    setAssistant(null);
    setLoading(false);
  }


  return assistant && (
    <div className='p-5 bg-secondary border-l-[1px] h-screen'>
      <h2 className='text-xl font-bold'>Settings</h2>
      <BlurFade delay={0.35}>
        <div className='mt-4 flex gap-3'>
          <Image src={assistant?.image} alt={assistant.name}
            width={100}
            height={100}
            className='rounded-xl h-[80px] w-[80px]' />
          <div>
            <h3 className='font-bold'>{assistant?.name}</h3>
            <p className='text-gray-700 dark:text-gray-300'>{assistant?.title}</p>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.35 * 2}>
        <div className='mt-4'>
          <h2 className='text-gray-500'>Model:</h2>
          <Select defaultValue={assistant?.aiModelId} onValueChange={(value) => onHandleInputChange('aiModelId', value)}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {AiModelOptions.map((model, index) => (
                <SelectItem key={index} value={model.name}>
                  <div key={index} className='flex gap-3 items-center'>
                    <Image src={model?.logo} alt={model.name}
                      width={20}
                      height={20}
                      className='rounded-md' />
                    <h2>{model.name}</h2>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </BlurFade>

      <BlurFade delay={0.35 * 3}>
        <div className='mt-4'>
          <h2 className='text-gray-500'>Instruction</h2>
          <Textarea className='h-[180px] bg-white'
            placeholder='Add Instruction'
            value={assistant?.userInstruction}
            onChange={(e) => onHandleInputChange('userInstruction', e.target.value)} />
        </div>
      </BlurFade>

      <div className='absolute bottom-10 right-5 flex gap-5'>
        <ConfirmationAlert onDelete={onDelete}>
          <Button variant="ghost" disabled={loading}><Trash />Delete</Button>
        </ConfirmationAlert>
        <Button onClick={onSave} disabled={loading}>{loading ? <Loader2Icon className='animate-spin' /> : <Save />}Save</Button>
      </div>


    </div>
  )
}

export default AssistantSettings