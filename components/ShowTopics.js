import React from 'react'
import axios from 'axios';

const ShowTopics = ({ notes, setSelectedNoteId, setMode, fetchData }) => {
    const deleteNote = async (noteId) => {
        await axios.delete(`/api/note?noteId=${noteId}`);
        fetchData();
        setMode(0);
    }
    
    return (
        <div className='flex flex-col gap-2 h-[600px] overflow-y-auto pr-2 custom-scrollbar'>
            {notes.map((note, index) => (
                <div 
                    key={`note-${note.id ?? index}`}
                    className="group bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/60 hover:border-indigo-500/30 rounded-xl p-3 transition-all duration-200 shadow-sm"
                >
                    {/* Note Topic / Clickable Area */}
                    <div 
                        onClick={() => {
                            setSelectedNoteId(note.id); 
                            setMode(1);
                        }}
                        className='cursor-pointer text-sm font-semibold text-slate-300 group-hover:text-indigo-400 truncate transition-colors'
                    >
                        {note.topic || "Untitled Note"}
                    </div> 

                    {/* Action Buttons - Visible on Hover */}
                    <div className='flex gap-4 justify-end items-center mt-2 pt-2 border-t border-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                        <button 
                            onClick={() => {
                                setSelectedNoteId(note.id);
                                setMode(2);
                            }}
                            className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-400 transition-colors"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={async () => {
                                if (confirm("Do you want to delete this note.")) {
                                    await deleteNote(note.id);
                                }
                            }}
                            className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-red-400 transition-colors"
                        >
                            Delete
                        </button>
                    </div> 
                </div>
            ))}
        </div>
    )
}

export default ShowTopics