import TranslatorForm from '@/components/TranslatorForm'
import React from 'react'

const LanguagesEndpoint ='https://api.cognitive.microsofttranslator.com/languages?api-version=3.0'

export type TranslationLanguage = {
  translation: {
    [key: string]: {
      name: string,
      nativeName: string,
      dir: "ltr" | "rtl",
    },
  }
}

const TranslatePage = async () => {
  const languages = await ( 
    await fetch(LanguagesEndpoint, { next: { revalidate: 60 * 60 * 24 } })
  ).json() as TranslationLanguage;



  return (
    <div className='px-10 xl:px-0 mb-20'>
      {/* Translation Form */}
      <TranslatorForm languages={languages} />

      {/* Translation History */}
    </div>
  )
}

export default TranslatePage