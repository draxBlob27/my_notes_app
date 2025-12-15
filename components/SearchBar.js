import React, { useState } from 'react'

const SearchBar = ({ query, setQuery, setMode }) => {
    return (
        <div className='p-2 grid grid-cols-8 gap-3'>
            <input onClick={(e) => {
                if (query.length > 3) {
                    setMode(3);
                }
            }} onChange={(e) => { setQuery(e.target.value); }} type="text" placeholder='Search' value={query} className='bg-amber-200 w-full col-span-5 text-black' name="query" />
            <button className='cursor-pointer text-white border border-white' onClick={(e) => {setQuery(""); setMode(0)}}>clear</button>
            <button className='cursor-pointer text-white border border-white' onClick={(e) => {(query.length > 3) && setMode(3)}}>search</button>
            <button className='cursor-pointer text-white border border-white' onClick={(e) => setMode(4)}>chat</button>
        </div>
    )
}

export default SearchBar
