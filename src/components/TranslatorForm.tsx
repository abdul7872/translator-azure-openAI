'use client'
import { TranslationLanguage } from '@/app/translate/page'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type props = {
  languages: TranslationLanguage
}

function TranslatorForm({ languages }: props) {
  
  return (
    <div>
      <form action="">
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