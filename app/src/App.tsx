import { useEffect } from 'react'
import { supabase } from './lib/supabaseClient'

function App() {
  useEffect(() => {
    supabase.auth.getSession().then(console.log)
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Social Media App</h1>
    </div>
  )
}

export default App
