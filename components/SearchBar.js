import React, { useState } from 'react'

const SearchBar = ({ query, setQuery, setMode }) => {
    return (
        <div className='w-full flex items-center gap-3 bg-slate-900/40 p-3 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-lg mb-6'>
            {/* Search Input Container */}
            <div className="relative flex-1 group">
                <input 
                    onClick={(e) => {
                        if (query.length > 3) {
                            setMode(3);
                        }
                    }} 
                    onChange={(e) => { setQuery(e.target.value); }} 
                    type="text" 
                    placeholder='Search your notes...' 
                    value={query} 
                    className='w-full bg-slate-800/50 text-slate-200 border border-slate-700 rounded-xl py-2.5 px-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500' 
                    name="query" 
                />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                <button 
                    className='px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl border border-slate-700 transition-all cursor-pointer' 
                    onClick={(e) => {setQuery(""); setMode(0)}}
                >
                    Clear
                </button>
                
                <button 
                    className='px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 cursor-pointer' 
                    onClick={(e) => {(query.length > 3) && setMode(3)}}
                >
                    Search
                </button>

                <div className="w-px h-6 bg-slate-700 mx-1"></div>

                <button 
                    className='px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer flex items-center gap-2' 
                    onClick={(e) => setMode(4)}
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
                    </span>
                    AI Chat
                </button>
            </div>
        </div>
    )
}

export default SearchBar