
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import './globals.css'
import Headers from '@/components/Headers'
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    {/* <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn> */}
                    {/* headers */}
                    <Headers />
                    <div className='max-w-6xl mx-auto'>
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}