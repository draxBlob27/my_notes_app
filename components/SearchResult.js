import React from 'react'

const SearchResult = ({ rawNotes, semanticNotes, setSelectedNoteId, setMode }) => {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Semantic Search Section */}
            <section>
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="h-px flex-1 bg-linear-to-r from-indigo-500/50 to-transparent"></div>
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">AI Semantic Matches</h2>
                    <div className="h-px flex-1 bg-linear-to-l from-indigo-500/50 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {semanticNotes.length > 0 ? (
                        semanticNotes.map((note, index) => (
                            <div key={`sem-${note.id ?? index}`} className="group bg-slate-800/30 border border-indigo-500/20 hover:border-indigo-500/50 p-5 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
                                <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-indigo-300 transition-colors">{note.topic}</h3>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {note.tags?.toString().split(',').map((tag, i) => (
                                        <span key={i} className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20">
                                            #{tag.trim()}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed italic">
                                    "{note.content}"
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-2 text-center text-slate-600 py-4 italic text-sm font-sans">No semantic matches found.</p>
                    )}
                </div>
            </section>

            {/* Raw Search Section */}
            <section>
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="h-px flex-1 bg-linear-to-r from-slate-700 to-transparent"></div>
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Keyword Matches</h2>
                    <div className="h-px flex-1 bg-linear-to-l from-slate-700 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
                    {rawNotes.length > 0 ? (
                        rawNotes.map((note, index) => (
                            <div onClick={() => {
                                setSelectedNoteId(note.id);
                                setMode(1);
                            }} key={`raw-${note.id ?? index}`} className="bg-slate-900/40 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all">
                                <h3 className="text-lg font-semibold text-slate-200 mb-2">{note.topic}</h3>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {note.tags?.toString().split(',').map((tag, i) => (
                                        <span key={i} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                                    {note.content}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-2 text-center text-slate-600 py-4 italic text-sm">No keyword matches found.</p>
                    )}
                </div>
            </section>
        </div>
    )
}

export default SearchResult