import React, { Component } from 'react';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walker',
        nun_comments: 3,
        points: 4,
        objectId: 0,
    },
    {
        title: 'Redux',
        url: 'https://facebook.github.io/redux/',
        author: 'Kartacz Kartaczyński',
        nun_comments: 2,
        points: 5,
        objectId: 1,
    },
];

class App extends Component {
    render() {
        return (
            <div className="App">

                {list.map((item) => {
                    return (
                        <span key={item.objectId}>
                            <div>{item.title}</div>
                            <a href={item.url}> {item.title} </a>
                            <div>{item.author}</div>
                            <div>{item.points}</div>
                        </span>

                    )
                })}
            </div>
        )
    }
}
export default App