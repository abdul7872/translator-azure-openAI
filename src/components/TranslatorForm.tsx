'use client'
import { TranslationLanguage } from '@/app/translate/page'
import React, { ChangeEventHandler, useCallback, useRef } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useFormState } from 'react-dom'
import { debounce } from 'lodash'
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
  const submitBtnRef = useRef<HTMLButtonElement>(null)

  const [state, formAction] = useFormState(translate, initialState);

  const debounceSearch = useCallback(debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(!e.target.value.trim()) return;
    submitBtnRef.current?.click();
  }, 500), []);

  return (
    <div>
      <form action={formAction}>
        <div className="flex flex-col space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
          <div className='flex-1 space-y-2'>
            <Select name='inputLang' defaultValue='auto'>
              <SelectTrigger className="w-[280px] border-none text-blue-500 font-bold">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Want us to figure it out?</SelectLabel>
                  <SelectItem value="auto">Auto-Detected</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  {Object.entries(languages?.translation ?? {})?.map(([key, { name }]) => (
                    <SelectItem key={key} value={key}>{name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Textarea
              name='input'
              onChange={debounceSearch}
              className='min-h-32 text-xl'
              placeholder="Type your message here."
            />
          </div>

          <div className='flex-1 space-y-2'>
            <Select name='outputLang' defaultValue='en'>
              <SelectTrigger className="w-[280px] border-none text-blue-500 font-bold">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  {Object.entries(languages?.translation ?? {})?.map(([key, { name }]) => (
                    <SelectItem key={key} value={key}>{name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Textarea
              name='output'
              value={state?.output}
              className='min-h-32 text-xl'
              placeholder="Type your message here."
              disabled
            />
          </div>
        </div>

        <div>
          <Button ref={submitBtnRef} type='submit'> submit</Button>
        </div>
      </form>
    </div>
  )
}

export default TranslatorForm