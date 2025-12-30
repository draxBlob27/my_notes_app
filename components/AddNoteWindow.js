import React from 'react'

const AddNoteWindow = ({ form, setForm, tags, setTags, handleSubmit }) => {
    const addTags = (e) => {
        setTags(prev => [...prev, form.tags.trim()]);
        setForm({ ...form, tags: "" });
    }

    return (
        <div className="w-full h-full animate-in fade-in duration-500">
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 text-slate-200'>
                {/* Topic Input */}
                <input 
                    className='bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-xl font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500' 
                    placeholder='Note Topic...' 
                    type="text" 
                    name="topic" 
                    value={form.topic ?? ""} 
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} 
                />

                {/* Tags Section */}
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-wrap gap-2 min-h-8'>
                        {tags.map((tag, index) => (
                            <span key={index} className="bg-indigo-500/20 text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-500/30">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <div className='flex gap-2'>
                        <input 
                            className='flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500' 
                            placeholder='Add tags (e.g. react, idea)...' 
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
                    placeholder='Start writing your thoughts...' 
                    name="content" 
                    value={form.content ?? ""} 
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                ></textarea>

                {/* Submit Button */}
                <button 
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform active:scale-[0.98] shadow-lg shadow-indigo-500/20"
                >
                    Save Note
                </button>
            </form>
        </div>
    )
}

export default AddNoteWindow