import React from 'react'

const AddNoteWindow = ({ form, setForm, tags, setTags, handleSubmit }) => {
    const addTags = (e) => {
        setTags(prev => [...prev, form.tags.trim()]);
        setForm({ ...form, tags: "" });
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='bg-yellow-200 flex flex-col gap-2 text-black'>
                <input className='border-black border' placeholder='Enter Topic' type="text" name="topic" value={form.topic ?? ""} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                <div className='flex gap-2'>
                    <span>{tags.toString()}</span>
                    <input className='border-black border' placeholder='Enter Tags' type="text" name="tags" value={form.tags ?? ""} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                    <button type='button' onClick={addTags}>add</button>
                </div>
                <textarea className='border-black border min-h-[400px] overflow-y-scroll' placeholder='Write anything...' name="content" value={form.content ?? ""} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}></textarea>
                <button type="submit">Add Note</button>
            </form>
        </>
    )
}

export default AddNoteWindow
