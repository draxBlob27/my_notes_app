import React from 'react'
import axios from 'axios';
import { fetchData } from 'next-auth/client/_utils';

const ShowTopics = ({ notes, setSelectedNoteId, setMode, fetchData }) => {
    // {console.log(notes)}
    const deleteNote = async (noteId) => {
        await axios.delete(`/api/note?noteId=${noteId}`);
        fetchData();
        setMode(0);
    }
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
                            <button onClick={async () => {
                                if (confirm("Do you want to delete this note.")) {
                                    await deleteNote(note.id);
                                }
                            }}>Delete</button>
                        </div> 
                    </div>
                ))}
            </ol>
        </>
    )
}

export default ShowTopics