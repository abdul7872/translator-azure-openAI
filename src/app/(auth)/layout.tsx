
export default function Layout({ children, }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center justify-center mt-10'>
      {children}
    </div>
  )
}