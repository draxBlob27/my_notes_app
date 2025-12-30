import React from 'react'

const RagInterface = ({ ragQuery, setRagQuery, setSendReqtoLLm, llmResponse }) => {
    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto animate-in fade-in duration-700">
            {/* Input Section */}
            <div className='flex flex-col gap-3 bg-slate-800/40 p-4 rounded-2xl border border-slate-700 shadow-xl'>
                <textarea 
                    onChange={(e) => { setRagQuery(e.target.value); }} 
                    value={ragQuery} 
                    className='w-full min-h-[120px] max-h-[400px] p-4 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none custom-scrollbar' 
                    name="ragQuery" 
                    placeholder='Ask anything about your notes...'
                ></textarea>
                
                <div className='grid grid-cols-5 gap-3'>
                    <button 
                        onClick={(e) => setSendReqtoLLm(true)} 
                        type='button' 
                        className='col-span-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 active:scale-[0.99] cursor-pointer'
                    >
                        Ask AI Assistant
                    </button>
                    <button 
                        onClick={(e) => setRagQuery("")} 
                        type='button' 
                        className='col-span-1 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-3 rounded-xl transition-all duration-200 border border-slate-600 cursor-pointer'
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* AI Response Section */}
            {llmResponse.length > 0 && (
                <div className="flex flex-col gap-3 animate-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-2 px-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">AI Response</span>
                    </div>
                    <div className='bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-2xl text-slate-200 leading-relaxed shadow-inner'>
                        {llmResponse}
                    </div>
                </div>
            )}
        </div>
    )
}

export default RagInterface