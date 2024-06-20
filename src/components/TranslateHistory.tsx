import { UserType } from '@/mongodb/models/User';
import { auth } from '@clerk/nextjs/server'
import React from 'react';
import TimeAgoText from './TimeAgoText';
import DeleteTranslationBtn from './DeleteTranslate';

const getLanguage = (code: string) => {
  const language = new Intl.DisplayNames(['en'],{type: 'language'})
  return language.of(code)
}

async function TranslateHistory() {
  const { userId } = auth();
  const historyURL = `${process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.VERCEL_URL
    }/api/translation-history?userId=${userId}`

  const response = await fetch(historyURL, { next: { tags: ['translationHistory'] } })
  const { translations }: UserType = await response.json();

  return (
    <div>
      <h1 className='text-3xl my-5'>Translation History</h1>

      {translations?.length === 0 && (
        <p className='mb-5 text-gray-400'>No Translations yet.</p>
      )}

      <ul style={{maxHeight: 500}} className='overflow-y-auto divide-y border rounded-md'>
        { translations?.map((translation)=>(
          <li key={translation?._id} className="flex justify-between items-center p-5 hover:bg-gray-50 relative">
            <div>
              <p className='text-sm mb-5 text-gray-500'>
                {getLanguage(translation?.from)}
                {" -> "}
                {getLanguage(translation?.to)}
              </p>
              <div className='space-y-2 pr-5'>
                <p>{translation?.fromText}</p>
                <p className='text-gray-400'>{translation?.toText}</p>
              </div>
            </div>

            <p className="text-sm text-gray-300 absolute top-2 right-2">
              <TimeAgoText date={new Date(translation?.timestamp).toISOString()} />
            </p>

            <DeleteTranslationBtn id={translation._id} />

          </li>
        ))}
      </ul>

    </div>
  )
}

export default TranslateHistory