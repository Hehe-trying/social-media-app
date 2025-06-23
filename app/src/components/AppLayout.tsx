import Navbar from './Navbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4">{children}</main>
    </div>
  )
}
