import React, { createContext, useContext, useState, ReactNode } from 'react'

type User = {
  login: string
  name?: string
  avatarUrl?: string
  bio?: string
}

type UserContextType = {
  user: User
  setUser: (u: User) => void
}

const defaultUser: User = {
  login: 'roopalisdudalkar',
  name: 'roopalisdudalkar',
  avatarUrl: 'https://avatars.githubusercontent.com/u/36775904?v=4',
  bio: 'This is a starter profile application scaffolded with Vite + React + TypeScript.'
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser)
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
