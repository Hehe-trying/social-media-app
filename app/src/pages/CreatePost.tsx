import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'

export default function CreatePost() {
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('You must be logged in')
      return
    }

    let imageUrl = ''

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}-${user.id}.${fileExt}`
      const { error } = await supabase.storage
        .from('post-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type,
        })

      if (error) {
        alert('Image upload failed')
        return
      }

      imageUrl = supabase.storage.from('post-images').getPublicUrl(fileName).data.publicUrl
    }

    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      content,
      image_url: imageUrl,
    })

    if (error) {
      alert(error.message)
    } else {
      navigate('/feed')
    }
  }

  return (
    <AppLayout>
    <div className="mt-10 glass-button">
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border p-2 rounded"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input 
          type="file"
          accept="image/*"
          id="image-upload"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="block w-full bg-green-500 text-white p-2 rounded mb-4 cursor-pointer hover:bg-green-600 transition-colors"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Post
        </button>
      </form>
    </div>
    </AppLayout>
  )
}
