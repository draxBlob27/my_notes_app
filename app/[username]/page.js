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
import RagInterface from '@/components/RagInterface';

const profile = () => {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({});
  const [mode, setMode] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [query, setQuery] = useState("")
  const [userId, setUserId] = useState(null)
  const [note_semantic, setNote_semantic] = useState([]);
  const [raw_notes, setRaw_notes] = useState([]);
  const [ragQuery, setRagQuery] = useState("");
  const [llmResponse, setLlmResponse] = useState("");
  const [sendReqtoLLm, setSendReqtoLLm] = useState(false);
  const [deleteAllNotes, setDeleteAllNotes] = useState(false);
  const [topK, setTopK] = useState(3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = await fetchUser(session.user?.email);
    setUserId(user._id);

    const finalTags =
      form.tags.length
        ? [...tags, form.tags.trim()]
        : [...tags];
    
    const res = await axios.post(`/api/note?userId=${user._id}`, { ...form, tags: finalTags })
    const note_id = res.data.message;

    axios.post(`https://8000-01kckj2z67dwp8dmhn353jxmwj.cloudspaces.litng.ai/save_embeddings`, { note_id: note_id, user_id: userId, topic: form.topic, tags: finalTags.toString(), content: form.content });
    
    fetchNotes(user._id);
    setForm({});
    setTags([]);
  }

  const fetchData = async () => {
    let user = await fetchUser(session.user?.email);
    setUserId(user._id);
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
  }

  useEffect(() => {
    if (!session)
      return

    fetchData();
  }, [session])


  const embedding_results = async (query, user_id, notes, topK) => {
    let res;
    try {
      res = await axios.get(`https://8000-01kckj2z67dwp8dmhn353jxmwj.cloudspaces.litng.ai/search?query=${query}&user_id=${user_id}&topK=${topK}`);
    } catch (error) {
      res = {data:"Backend off"}
    }
    const semanticIds = res.data;
    return notes.filter(note =>
      semanticIds.includes(note.id)
    );
  }

  const raw_results = (query, notes) => {
    query = query.toLowerCase();
    const results = [];

    const got = (tags, query) => {
      if (tags.filter(tag => tag.toLowerCase().includes(query)).length)
        return true;

      return false;
    }

    for (const note of notes) {
      if (query.length == 0)
        return []

      if (got(note.tags, query) || note.topic.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)) {
        results.push(note);
      }
    }

    return results;
  }

  useEffect(() => {
    if (query.length > 3) {
      setMode(3);
      const raw = raw_results(query, notes);
      setRaw_notes(raw);

      embedding_results(query, userId, notes, topK)
        .then(setNote_semantic)
        .catch(console.error);
    }
    else {
      if (mode === 3) setMode(0);
      setRaw_notes([]);
      setNote_semantic([]);
      return;
    }
  }, [query, notes, userId, topK])

  const preProcess = async (ragQuery) => {
    const semantic = await embedding_results(ragQuery, userId, notes);
    let text = "Query: ";
    text += ragQuery.toString();
    text += "\n\n--- NOTES ---\n";
    for (const note of semantic) {
        text += note.content;
        text += "\n";
    }

    const final_message = [
      {
        "role": "system",
        "content": `You are an assistant that answers ONLY using the provided notes.If the answer is not present in the notes, say "I don't know".`
      },
      {
        "role": "user",
        "content": text
      }
    ]
    return final_message
  }

  const getResponseLLM = async (messages) => {
    try {
      const response = await axios.post(
        'https://8000-01kch0gg4kkf20zn0pd82f62wc.cloudspaces.litng.ai/v1/chat/completions',
        {
          model: "meta-llama/Llama-3.1-8B-Instruct",
          messages: messages
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      const res = response.data.choices[0].message.content
      return res

    } catch (error) {
      return "Turn on backend"
    }
  }

  useEffect(() => {
    if (!sendReqtoLLm)
      return

    const run = async () => {
      const messages = await preProcess(ragQuery);
      const res = await getResponseLLM(messages)
      setLlmResponse(res);
      setRagQuery("");
      setSendReqtoLLm(false);
    }

    run();
  }, [sendReqtoLLm])

  useEffect(() => {
    const run = async () => {
        if (deleteAllNotes === true) {
          if (confirm("Do you want to delete all notes")) {
            await axios.delete(`/api/user?userId=${userId}`);
            await fetchData();
            setMode(0);
          }
        }

        setDeleteAllNotes(false);
    }

    run();
  }, [deleteAllNotes, userId])
  

  return (
    <div className='min-h-screen bg-[#0f172a] text-slate-200 font-sans'>
      <Navbar />
      
      {/* Search Container */}
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <SearchBar query={query} setQuery={setQuery} setMode={setMode} topK={topK} setTopK={setTopK}/>
      </div>

      <main className='max-w-7xl mx-auto grid grid-cols-5 gap-6 px-4 pb-10'>
        
        {/* Sidebar */}
        <div className='col-span-1 flex flex-col gap-6 border-r border-slate-800 pr-6 min-h-[70vh]'>
          <div className='flex flex-col gap-2'>
            <button 
              className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20' 
              type='button' 
              onClick={() => { setMode(0); setForm({}); setTags([]); }}
            >
              <span className='text-xl'>+</span> New Note
            </button>
            <button 
              onClick={() => {setDeleteAllNotes(true);}} 
              className='w-full border border-slate-700 hover:border-red-500/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 py-2 px-4 rounded-xl transition-all duration-200 text-sm' 
              type='button'
            >
              Clear All
            </button>
          </div>
          
          <div className='overflow-y-auto custom-scrollbar'>
            <h3 className='text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-2'>Your Topics</h3>
            <ShowTopics notes={notes} setSelectedNoteId={setSelectedNoteId} setMode={setMode} fetchData={fetchData} />
          </div>
        </div>

        {/* Content Area */}
        <div className='col-span-4 bg-slate-900/50 rounded-2xl border border-slate-800 p-6 backdrop-blur-sm shadow-xl'>
          {mode === 0 && <AddNoteWindow form={form} setForm={setForm} tags={tags} setTags={setTags} handleSubmit={handleSubmit} />}
          {mode === 1 && <ShowNote notes={notes} noteId={selectedNoteId} />}
          {mode === 2 && <EditingWindow notes={notes} noteId={selectedNoteId} form={form} setForm={setForm} tags={tags} setTags={setTags} setMode={setMode} refreshData={fetchData} />}
          {mode === 3 && <SearchResult rawNotes={raw_notes} semanticNotes={note_semantic} setSelectedNoteId={setSelectedNoteId} setMode={setMode}/>}
          {mode === 4 && <RagInterface ragQuery={ragQuery} setRagQuery={setRagQuery} setSendReqtoLLm={setSendReqtoLLm} llmResponse={llmResponse}/>}
        </div>
      </main>
    </div>
  )
}

export default profile