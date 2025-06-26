import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import logoImg from '../assets/Snaply.png'
export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  return (
    <nav className="navbar flex items-center justify-between p-4 bg-white shadow-md">
      <div>
        <img src = {logoImg} alt="" className='w-20' />
      </div>
      <div className="space-x-4">
        <button onClick={() => navigate('/feed')} className="text-black-600 font-semibold hover:underline">Feed</button>
        <button onClick={() => navigate('/create-post')} className="text-black-600 font-semibold hover:underline">Create</button>
        <button onClick={() => navigate('/profile')} className="text-black-600 font-semibold hover:underline">Profile</button>
      </div>
      
      <button
        onClick={handleLogout}
        className="text-red-600 font-semibold hover:underline"
      >
        Logout
      </button>
    </nav>
  )
}
