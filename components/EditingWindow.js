import axios from 'axios';
import React, { useEffect } from 'react'

const EditingWindow = ({ notes, noteId, form, setForm, tags, setTags, setMode, refreshData}) => {
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
        if (note) {
            setForm({ topic: note.topic, tags: "", content: note.content })
            setTags(note.tags);
        }
    }, [noteId])

    const deleteTag = (tag) => {
        setTags(prev => prev.filter(item => item !== tag));
    }

    return (
        <div className="w-full h-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-indigo-400">Edit Note</h2>
                <button 
                    onClick={() => setMode(1)} 
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={handleEdit} className='flex flex-col gap-5 text-slate-200'>
                {/* Topic Input */}
                <input 
                    className='bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-xl font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500' 
                    placeholder='Enter Topic' 
                    type="text" 
                    name="topic" 
                    value={form.topic ?? ""} 
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} 
                />

                {/* Tags Section */}
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-wrap gap-2 min-h-8'>
                        {tags.map((tag, index) => (
                            <span 
                                key={index} 
                                className="flex items-center gap-1 bg-indigo-500/20 text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-500/30"
                            >
                                #{tag}
                                <button 
                                    type='button' 
                                    className='ml-1 hover:text-red-400 transition-colors font-bold' 
                                    onClick={(e) => deleteTag(tag)}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    
                    <div className='flex gap-2'>
                        <input 
                            className='flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500' 
                            placeholder='Enter Tags' 
                            type="text" 
                            name="tags" 
                            value={form.tags ?? ""} 
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} 
                        />
                        <button 
                            type='button' 
                            onClick={addTags}
                            className="bg-slate-700 hover:bg-slate-600 text-sm px-4 py-2 rounded-lg transition-colors border border-slate-600"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <textarea 
                    className='bg-slate-800/50 border border-slate-700 rounded-xl p-4 min-h-[400px] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500 resize-none custom-scrollbar' 
                    placeholder='Write anything...' 
                    name="content" 
                    value={form.content ?? ""} 
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                ></textarea>

                {/* Submit Button */}
                <button 
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform active:scale-[0.98] shadow-lg shadow-emerald-500/20"
                >
                    Update Note
                </button>
            </form>
        </div>
    )
}

export default EditingWindow