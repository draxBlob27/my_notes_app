import axios from 'axios';
import React, { useEffect } from 'react'


const EditingWindow = ({ notes, noteId, form, setForm, tags, setTags, setMode, refreshData}) => {
    // console.log("HI:", noteId)
    let note = notes.find(o => o.id === noteId);
    const addTags = (e) => {
        setTags(prev => [...prev, form.tags]);
        setForm({ ...form, tags: "" });
        return
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        const finalTags =
            form.tags.length
                ? [...tags, form.tags.trim()]
                : [...tags];

        await axios.put(`/api/note?noteId=${noteId}`, { ...form, tags: finalTags });
        await refreshData();
        setForm({})
        setTags([])
        setMode(1);
    }

    useEffect(() => {
        setForm({ topic: note.topic, tags: "", content: note.content })
        setTags(note.tags);
    }, [noteId])

    const deleteTag = (tag) => {
        setTags(prev => prev.filter(item => item !== tag));
    }

    console.log(note)

    return (
        <>
            <form onSubmit={handleEdit} className='bg-yellow-200 flex flex-col gap-2 text-black'>
                <input className='border-black border' placeholder='Enter Topic' type="text" name="topic" value={form.topic ?? ""} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                <div className='flex gap-2'>
                    {
                        tags.map((tag, index) => (
                            <span key={index}>{tag}<button type='button' className='border-black border' onClick={(e) => deleteTag(tag)}>x</button></span>
                        ))
                    }
                    <input className='border-black border' placeholder='Enter Tags' type="text" name="tags" value={form.tags ?? ""} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                    <button type='button' onClick={addTags}>add</button>
                </div>
                <textarea className='border-black border min-h-[400px] overflow-y-scroll' placeholder='Write anything...' name="content" value={form.content ?? ""} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}></textarea>
                <button type="submit">Edit Note</button>
            </form>
            {/* hi */}
        </>
    )
}

export default EditingWindow
