import React from 'react'
const ShowNote = ({ notes, noteId }) => {
    let note = notes.find(o => o.id === noteId);
    // console.log(note)
    return (
        <>
            <div className='flex gap-2 flex-col'>
                {note.topic}
                {note.tags}
                {note.content}
            </div>
        </>
    )
}

export default ShowNote
