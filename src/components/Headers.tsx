import { SignInButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Headers() {
  const { userId } = auth()
  return (
    <header className='flex items-center justify-between py-4 px-8 border-b mb-5'>
        <Link href={'/'}>
          <div className='flex items-center overflow-hidden cursor-pointer'>
            <Image src={'/logo/logo.svg'} alt='logo' className='object-contain overflow-hidden rounded-2xl' height={100} width={100} />
            <span className='text-2xl font-bold pl-4'>Translator APP</span>
          </div>
        </Link>
      { userId ? (
          <UserButton />
      ) : (
        <SignInButton mode='modal' fallbackRedirectUrl={'/translate'} />
      )}
    </header>
  )
}

export default Headers