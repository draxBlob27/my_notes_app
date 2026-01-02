import React from 'react'

const SearchBar = ({ query, setQuery, setMode, topK, setTopK }) => {
    return (
        <div className='flex flex-col gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800 backdrop-blur-md shadow-xl mb-8'>
            
            {/* Top Row: Search Input and Main Actions */}
            <div className="flex flex-col md:flex-row gap-3">
                <div className="relative grow group">
                    <input 
                        onClick={() => query.length > 3 && setMode(3)} 
                        onChange={(e) => setQuery(e.target.value)} 
                        type="text" 
                        placeholder='Search your notes...' 
                        value={query} 
                        className='w-full bg-slate-800/40 text-slate-200 border border-slate-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500' 
                    />
                </div>

                <div className="flex gap-2">
                    <button 
                        className='px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold rounded-xl border border-slate-700 transition-all cursor-pointer' 
                        onClick={() => {setQuery(""); setMode(0)}}
                    >
                        Clear
                    </button>
                    
                    <button 
                        className='px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 cursor-pointer' 
                        onClick={() => query.length > 3 && setMode(3)}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Bottom Row: Controls and AI Toggle */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800/60">
                
                {/* Top-K Range Slider */}
                <div className="flex items-center gap-4 w-full md:w-auto bg-slate-800/30 px-4 py-2 rounded-xl border border-slate-700/50">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        Top K: <span className="text-indigo-400">{topK}</span>
                    </label>
                    <input 
                        type="range" 
                        min={3} 
                        max={10} 
                        onChange={(e) => setTopK(e.target.value)} 
                        value={topK} 
                        className="w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                    />
                </div>

                {/* AI Chat Button */}
                <button 
                    className='w-full md:w-auto px-6 py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 text-sm font-bold rounded-xl border border-emerald-500/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-3' 
                    onClick={() => setMode(4)}
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    AI Chat Assistant
                </button>
            </div>
        </div>
    )
}

export default SearchBar