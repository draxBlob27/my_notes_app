import React from 'react'

const ShowTopics = ({ notes, setSelectedNoteId, setMode }) => {
    // {console.log(notes)}
    return (
        <>
            <ol className='flex flex-col gap-3'>
                {notes.map((note, index) => (
                    <div key={`note-${note.id ?? index}`}>
                        <li onClick={() => {
                                setSelectedNoteId(note.id); 
                                setMode(1);
                                // console.log("This is id: ", note.id);
                            }
                        }
                        className='cursor-pointer'  key={`topic-${note.id ?? index}`}>{note.topic}</li> 
                        <div key={`actions-${note.id ?? index}`} className='flex gap-4 justify-end'>
                            <button onClick={() => {
                                setSelectedNoteId(note.id);
                                setMode(2);
                            }}>Edit</button>
                            {/* <button onClick={}>Delete</button> */}
                        </div> 
                    </div>
                ))}
            </ol>
        </>
    )
}

export default ShowTopics