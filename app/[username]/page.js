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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = await fetchUser(session.user?.email);
    setUserId(user._id);
    // if (form.tags.length)
    //   tags.push(form.tags.trim());

    const finalTags =
      form.tags.length
        ? [...tags, form.tags.trim()]
        : [...tags];

    const res = await axios.post(`/api/note?userId=${user._id}`, { ...form, tags: finalTags })
    const note_id = res.data.message;
    // console.log(note_id)

    axios.post(`http://127.0.0.1:8000/save_embeddings`, { note_id: note_id, user_id: userId, topic: form.topic, tags: finalTags.toString(), content: form.content });
    // console.log(embed)
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
    // console.log(notes);
  }

  useEffect(() => {
    if (!session)
      return

    fetchData();
  }, [session])


  const embedding_results = async (query, user_id, notes) => {
    const res = await axios.get(`http://127.0.0.1:8000/search?query=${query}&user_id=${user_id}`);
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

      embedding_results(query, userId, notes)
        .then(setNote_semantic)
        .catch(console.error);
    }
    else {
      if (mode === 3) setMode(0);
      setRaw_notes([]);
      setNote_semantic([]);
      return;
    }
  }, [query, notes, userId])

  const preProcess = async (ragQuery) => {
    const semantic = await embedding_results(ragQuery, userId, notes);
    // console.log("Semnatic response: ", semantic)
    let text = "Query: ";
    text += ragQuery.toString();
    // console.log("RagQuery: ",ragQuery.toString())
    text += "\n\n--- NOTES ---\n";
    for (const note of semantic) {
        // console.log("Noteid: ",note.id)
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

    console.log(final_message)
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
      // console.log(res)
      return res

    } catch (error) {
      return "Turn on backend"
    }

    // return response.data ?? "LLM response";
  }

  useEffect(() => {
    if (!sendReqtoLLm)
      return

    const run = async () => {
      const messages = await preProcess(ragQuery);
      // console.log(messages)
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
    <>
      <Navbar />
      <SearchBar query={query} setQuery={setQuery} setMode={setMode} />

      <div className='grid grid-cols-5 p-2 text-white'>
        <div className='col-span-1 flex flex-col gap-4'>
          <div className='grid grid-cols-4 gap-2'>
            <button className='border border-white col-span-3' type='button' onClick={() => { setMode(0); setForm({}); setTags([]); }}>Plus sign</button>
            <button onClick={() => {setDeleteAllNotes(true);}} className='border border-white col-span-1' type='button'>Delete all</button>
          </div>
          <ShowTopics notes={notes} setSelectedNoteId={setSelectedNoteId} setMode={setMode} fetchData={fetchData} />
        </div>
        <div className='col-span-4 p-4'>
          {mode === 0 && <AddNoteWindow form={form} setForm={setForm} tags={tags} setTags={setTags} handleSubmit={handleSubmit} />}
          {mode === 1 && <ShowNote notes={notes} noteId={selectedNoteId} />}
          {mode === 2 && <EditingWindow notes={notes} noteId={selectedNoteId} form={form} setForm={setForm} tags={tags} setTags={setTags} setMode={setMode} refreshData={fetchData} />}
          {mode === 3 && <SearchResult rawNotes={raw_notes} semanticNotes={note_semantic} />}
          {mode === 4 && <RagInterface ragQuery={ragQuery} setRagQuery={setRagQuery} setSendReqtoLLm={setSendReqtoLLm} llmResponse={llmResponse} />}
        </div>
      </div>
    </>
  )
}

export default profile
