'use client'
import { TranslationLanguage } from '@/app/translate/page'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useFormState } from 'react-dom'
import { translate } from '@/actions/translate'

type props = {
  languages: TranslationLanguage
}

const initialState = { 
  inputLang: 'auto',
  input: '',
  outputLang: 'en',
  output: '',
}

export type FormState = typeof initialState;

function TranslatorForm({ languages }: props) {
  
  const [state, formAction] = useFormState(translate, initialState);

  console.log({ state })
  
  return (
    <div>
      <form action={formAction}>
        <div>
          <Select name='inputLang' defaultValue='auto'>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Want us to figure it out?</SelectLabel>
                <SelectItem value="auto">Auto-Detected</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {Object.entries(languages?.translation ?? {})?.map(([key, {name}])=>(
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Textarea 
            name='input'
            className='min-h-32 text-xl'
            placeholder="Type your message here." 
          />
        </div>

        <div>
          <Select name='outputLang' defaultValue='en'>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {Object.entries(languages?.translation ?? {})?.map(([key, {name}])=>(
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Textarea 
            name='output'
            className='min-h-32 text-xl'
            placeholder="Type your message here." 
          />
        </div>

        <div>
          <Button type='submit'> submit</Button>
        </div>
      </form>
    </div>
  )
}

export default TranslatorForm