import React from 'react'

const ShowNote = ({ notes, noteId }) => {
    let note = notes.find(o => o.id === noteId);

    if (!note) return (
        <div className="flex items-center justify-center h-64 text-slate-500 italic">
            Select a note to view its contents
        </div>
    );

    return (
        <div className='flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500'>
            {/* Header Section */}
            <div className="border-b border-slate-800 pb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-0.5 bg-indigo-500"></span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400">Let's Rock It</span>
                </div>
                <h1 className='text-4xl font-extrabold text-white tracking-tight'>
                    {note.topic}
                </h1>
            </div>

            {/* Tags Section */}
            <div className='flex flex-wrap gap-2'>
                {note.tags?.toString().split(',').map((tag, index) => (
                    <span 
                        key={index} 
                        className="bg-slate-800 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full border border-slate-700 shadow-sm"
                    >
                        #{tag.trim()}
                    </span>
                ))}
            </div>

            {/* Content Section */}
            <div className='bg-slate-800/20 p-8 rounded-3xl border border-slate-800/50 shadow-inner'>
                <p className='text-slate-300 text-lg leading-relaxed whitespace-pre-wrap font-sans'>
                    {note.content}
                </p>
            </div>

            {/* Footer / Metadata Placeholder */}
            <div className="mt-4 flex justify-end">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium">
                    Stored in NoteMind Vector DB
                </p>
            </div>
        </div>
    )
}

export default ShowNote