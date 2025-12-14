import React from 'react'

const SearchResult = ({ query, notes }) => {
    const results = [];

    const got = (tags, query) => {
        if (tags.filter(tag => tag.toLowerCase().includes(query)).length)
            return true;
    
        return false;
    }

    for (const note of notes) {
        if (query.length == 0)
            return []
        
        if (got(note.tags, query) || note.topic.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)) {
            results.push(note);
        }
    }

    // console.log(results);

    return (
        <div>
            {
                results.map((note, index) => (
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
