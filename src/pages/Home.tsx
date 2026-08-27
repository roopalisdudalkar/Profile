import React, { useState } from 'react'
import { useUser } from '../context/UserContext'

export default function Home() {
  const { user, setUser } = useUser()
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState(user.bio || '')

  function save() {
    setUser({ ...user, bio })
    setEditing(false)
  }

  return (
    <section className="card">
      <img className="avatar" src={user.avatarUrl} alt="avatar" />
      <h2>{user.name || user.login}</h2>
      {!editing ? (
        <>
          <p className="description">{user.bio}</p>
          <button className="btn" onClick={() => setEditing(true)}>Edit profile</button>
        </>
      ) : (
        <div className="edit-form">
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
          <div style={{ marginTop: 8 }}>
            <button className="btn" onClick={save}>Save</button>
            <button className="btn btn-ghost" onClick={() => { setEditing(false); setBio(user.bio || ''); }}>Cancel</button>
          </div>
        </div>
      )}
    </section>
  )
}
