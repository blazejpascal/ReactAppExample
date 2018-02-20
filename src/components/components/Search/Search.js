import React from 'react';
import './Search.css';


const Search = ({value, onChange, onSubmit, children}) =>
            <form onSubmit={onSubmit}>
                 <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onSubmit={onSubmit}
                 />
                <button type="submit">
                        {children}
                </button>
            </form>

export default Search