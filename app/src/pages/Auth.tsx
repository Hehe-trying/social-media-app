// src/pages/Auth.tsx
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import logoImg from '../assets/Snaply.png'
export default function Auth() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (isLogin) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return alert(error.message)
  } else {
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      if (error.message.toLowerCase().includes('already registered')) {
        alert('This email is already registered. Please log in instead.')
      } else {
        alert(error.message)
      }
      return
    }

    

    alert('Signup successful! Please check your email for confirmation.')
  }
  navigate('/profile')
}


  return (
    <div className="mt-20 glass-button">
      <img src = {logoImg} alt="" className='w-40' />
      <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors' type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className="text-sm text-center">
          {isLogin ? 'New user?' : 'Already have an account?'}{' '}
          <button type="button" className="text-blue-600 underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  )
}
