import React from 'react'

const ShowTopics = ({ notes, setSelectedNoteId, setNewNote }) => {
    // {console.log(notes)}
    return (
        <>
            <ol className='flex flex-col gap-3'>
                {notes.map((note, index) => (
                    <li onClick={() => {
                            setSelectedNoteId(note.id); 
                            setNewNote(false);
                            // console.log("This is id: ", note.id);
                        }

                    }
                    className='cursor-pointer'  key={note._id ?? index}>{note.topic}</li>   
                ))}
            </ol>
        </>
    )
}

export default ShowTopics