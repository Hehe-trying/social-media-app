import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'
import AppLayout from '../components/AppLayout'

type Post = {
  id: string
  content: string
  image_url?: string
  created_at: string
  like_count: number
  profiles: {
    name: string
  }
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([])
  const navigate = useNavigate()

  useEffect(() => {
  const fetchPosts = async () => {
    const { data, error }: PostgrestSingleResponse<any[]> = await supabase
      .from('posts')
      .select('id, content, created_at, like_count, image_url, profiles(name)')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error.message)
    } else {
      setPosts(data || [])  // Fallback in case `data` is null
    }
  }

  fetchPosts()
}, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/auth')
  }

const handleLike = async (postId: string, currentCount: number) => {
  const { error } = await supabase
    .from('posts')
    .update({ like_count: currentCount + 1 })
    .eq('id', postId)

  if (error) console.error('Like failed:', error.message)
  else {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, like_count: p.like_count + 1 } : p
      )
    )
  }
}



  return (
    <AppLayout>
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Global Feed</h1>
        <div className="space-x-2">
          <button onClick={() => navigate('/create-post')} className="bg-green-500 text-white px-4 py-1 rounded">
            + New Post
          </button>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded">
            Logout
          </button>
        </div>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow p-4 rounded mb-4">
          <p className="text-sm text-gray-500 mb-1">
            {post.profiles?.name || 'Unknown User'} • {new Date(post.created_at).toLocaleString()}
          </p>
          {post.image_url && (
            <img
              src={post.image_url}
              alt="Post"
              className="my-2 rounded max-h-64 object-cover"
            />
          )}
          <p className="text-lg mb-2">{post.content}</p>
          <p className="text-sm text-gray-600">
            ❤️ {post.like_count} likes
            <button
              onClick={() => handleLike(post.id, post.like_count)}
              className="ml-2 text-sm text-blue-500 underline"
            >
              Like
            </button>
          </p>
        </div>
      ))}
    </div>
    </AppLayout>
  )
}
