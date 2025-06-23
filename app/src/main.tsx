import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Auth from './pages/Auth'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import AuthGuard from './components/AuthGuard'
import AppLayout from './components/AppLayout'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Auth/>
          } />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/feed"
          element={
            <AuthGuard>
              <Feed />
            </AuthGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          }
        />
        <Route
          path="/create-post"
          element={
            <AuthGuard>
              <CreatePost />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

