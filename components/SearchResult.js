import React from 'react'

const SearchResult = ({ rawNotes, semanticNotes }) => {
    // console.log(results_raw);
    
    return (
        <div>
            Raw search
            {
                rawNotes.map((note, index) => (
                    <div key={`div-${note.id ?? index}`}>
                        <ul key={`ul-${note.id ?? index}`}>
                            <li>{note.topic}</li>
                            <li>{note.tags}</li>
                            <li>{note.content}</li>
                        </ul>
                    </div>
                ))
            }

            Semantic search
            {
                semanticNotes.map((note, index) => (
                    <div key={`div-${note.id ?? index}`}>
                        <ul key={`ul-${note.id ?? index}`}>
                            <li>{note.topic}</li>
                            <li>{note.tags}</li>
                            <li>{note.content}</li>
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}

export default SearchResult
