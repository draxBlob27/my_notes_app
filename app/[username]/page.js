'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ShowTopics from '@/components/ShowTopics';
import AddNoteWindow from '@/components/AddNoteWindow';
import ShowNote from '@/components/ShowNote';
import EditingWindow from '@/components/EditingWindow';
import SearchBar from '@/components/SearchBar';
import SearchResult from '@/components/SearchResult';

const profile = () => {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({});
  const [mode, setMode] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [query, setQuery] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = await fetchUser(session.user?.email);
    // if (form.tags.length)
    //   tags.push(form.tags.trim());

    const finalTags =
      form.tags.length
        ? [...tags, form.tags.trim()]
        : [...tags];

    const res = await axios.post(`/api/note?userId=${user._id}`, { ...form, tags: finalTags })
    const note_id = res.data.message;
    // console.log(note_id)

    axios.post(`http://127.0.0.1:8000/save_embeddings`, {note_id: note_id, user_id: user._id, topic: form.topic, tags: form.tags, content: form.content});
    // console.log(embed)
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
    // console.log(notes);
  }

  useEffect(() => {
    if (!session)
      return

    fetchData();
  }, [session])

  useEffect(() => {
    if (query.length > 3)
      setMode(3);
    else {
      if (mode === 3) setMode(0);
    }

  }, [query])


  return (
    <>
      <Navbar />
      <SearchBar query={query} setQuery={setQuery} setMode={setMode} />

      <div className='grid grid-cols-5 p-2 text-white'>
        <div className='col-span-1 flex flex-col gap-4'>
          <button type='button' onClick={() => { setMode(0); setForm({}); setTags([]); }}>Plus sign</button>
          <ShowTopics notes={notes} setSelectedNoteId={setSelectedNoteId} setMode={setMode} fetchData={fetchData} />
        </div>
        <div className='col-span-4 p-4'>
          {mode === 0 && <AddNoteWindow form={form} setForm={setForm} tags={tags} setTags={setTags} handleSubmit={handleSubmit} />}
          {mode === 1 && <ShowNote notes={notes} noteId={selectedNoteId} />}
          {mode === 2 && <EditingWindow notes={notes} noteId={selectedNoteId} form={form} setForm={setForm} tags={tags} setTags={setTags} setMode={setMode} refreshData={fetchData} />}
          {mode === 3 && <SearchResult query={query.toLowerCase()} notes={notes} />}
        </div>
      </div>
    </>
  )
}

export default profile
