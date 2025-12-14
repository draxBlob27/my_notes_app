'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ShowTopics from '@/components/ShowTopics';
import AddNoteWindow from '@/components/AddNoteWindow';
import ShowNote from '@/components/ShowNote';

const profile = () => {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({});
  const [newNote, setNewNote] = useState(true);
  const [tags, setTags] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleSubmit = async (e) => {
    let user = await fetchUser(session.user?.email);
    if (form.tags.length != 0)
      tags.push(form.tags)

    await axios.post(`/api/note?userId=${user._id}`, {...form, tags})
    fetchNotes(user._id);
    setForm({});
    setTags([]);
  }

  const fetchData = async () => {
    let user = await fetchUser(session.user?.email);
    await fetchNotes(user._id);
  }

  const fetchUser = async (email) => {
    const userRes = await axios.get(`/api/user?email=${email}`)
    const user = userRes.data;
    return user;
  }

  const fetchNotes = async (userId) => {
    const noteRes = await axios.get(`/api/note?userId=${userId}`);
    setNotes(noteRes.data);
    console.log(notes);
    
  }

  useEffect(() => {
    if (!session)
      return

    fetchData();
  }, [session])


  return (
    <>
      <Navbar/>
      <div className='grid grid-cols-5 p-2 text-white'>
        <div className='col-span-1 flex flex-col gap-4'>
          <button type='button' onClick={() => setNewNote(true)}>Plus sign</button>
          <ShowTopics notes={notes} setSelectedNoteId={setSelectedNoteId} setNewNote={setNewNote}/>
        </div>
        <div className='col-span-4'>
            {newNote && <AddNoteWindow form={form} setForm={setForm} tags={tags} setTags={setTags} handleSubmit={handleSubmit}/>}
            {!newNote && <ShowNote notes={notes} noteId = {selectedNoteId}/>}
        </div>
      </div>
    </>
  )
}

export default profile
