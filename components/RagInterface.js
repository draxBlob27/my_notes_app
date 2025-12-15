import React from 'react'

const RagInterface = ({ ragQuery, setRagQuery, setSendReqtoLLm, llmResponse }) => {
    return (
        <>
        <div className='flex flex-col justify-center gap-2'>
            <textarea onChange={(e) => { setRagQuery(e.target.value); }} value={ragQuery} className='w-full max-h-[600] field-sizing-content border bg-amber-200 border-white text-black' name="ragQuery" id="" placeholder='Type to chat...'></textarea>
            <button onClick={(e) => setSendReqtoLLm(true)} type='button' className='cursor-pointer text-center'>Send</button>
        </div>

        
        {llmResponse.length > 0 && <div>{llmResponse}</div>}
        </>
    )
}

export default RagInterface
