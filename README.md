# Social Media App

A simplified social media platform built with **Vite + React + TypeScript** <br>
on the frontend and **Supabase** for authentication,database, and storage. <br>
Deployed on **Netlify**.


🔗 [tushar-beginner.netlify.app/](https://tushar-beginner.netlify.app/)

- **Frontend**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **Backend-as-a-Service**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Netlify

---

## Features

- **User Authentication** (Signup / Login via Supabase Auth)
- **Global Feed** of Posts
- **Create Post** with text + optional image
- **Like System** (like Medium-style claps)
- **Supabase Storage** for post images

## Shortcomings
- Routing Logic needs to be modified.
- Various quality of life improvements needed.
- Styling needs to be heavily updated.


## Environment Variables

Create a `.env` file in the root and add:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
