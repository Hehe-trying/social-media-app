import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  return (
    <nav className="bg-white shadow px-4 py-2 mb-4 flex justify-between items-center">
      <div className="space-x-4">
        <button onClick={() => navigate('/feed')} className="text-blue-600 font-semibold hover:underline">Feed</button>
        <button onClick={() => navigate('/create-post')} className="text-blue-600 font-semibold hover:underline">Create</button>
        <button onClick={() => navigate('/profile')} className="text-blue-600 font-semibold hover:underline">Profile</button>
      </div>
      <button
        onClick={handleLogout}
        className="text-red-500 font-semibold hover:underline"
      >
        Logout
      </button>
    </nav>
  )
}
