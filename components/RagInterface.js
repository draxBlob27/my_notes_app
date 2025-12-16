import React from 'react'

const RagInterface = ({ ragQuery, setRagQuery, setSendReqtoLLm, llmResponse }) => {
    return (
        <>
        <div className='flex flex-col gap-2'>
            <textarea onChange={(e) => { setRagQuery(e.target.value); }} value={ragQuery} className='max-h-[600] field-sizing-content border bg-amber-200 border-white text-black' name="ragQuery" id="" placeholder='Type to chat...'></textarea>
            <div className='grid grid-cols-5 gap-3'>
                <button onClick={(e) => setSendReqtoLLm(true)} type='button' className='border border-white cursor-pointer text-center col-span-4'>Send</button>
                <button onClick={(e) => setRagQuery("")} type='button' className='border border-white cursor-pointer text-center col-span-1'>Clear</button>
            </div>
        </div>

        
        {llmResponse.length > 0 && <div>{llmResponse}</div>}
        </>
    )
}

export default RagInterface
