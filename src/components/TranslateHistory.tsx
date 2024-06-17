import { UserType } from '@/mongodb/models/User';
import { auth } from '@clerk/nextjs/server'
import React from 'react'

async function TranslateHistory() {
  const { userId } = auth();
  const historyURL = `${process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.VERCEL_URL
    }/api/translation-history?userId=${userId}`

    console.log({historyURL})

  const response = await fetch(historyURL, { next: { tags: ['translationHistory'] } })
  const { translations }: UserType = await response.json();

  console.log({translations});

  return (
    <div>
      <h1 className='text-3xl my-5'>History</h1>

      {translations?.length !== 0 && (
        <p className='mb-5 text-gray-400'>No Translations yet.</p>
      )}

      <ul className='divide-y border rounded-md'>
        { translations?.map((translation)=>(
          <li key={translation?._id}>
            <div>
              
            </div>
          </li>
        ))

        }
      </ul>

    </div>
  )
}

export default TranslateHistory