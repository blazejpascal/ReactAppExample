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
    constructor(props) {
        super(props)

        this.state = {
            list,
        }

        this.onDismiss = this.onDismiss.bind(this)
    }

    onDismiss(id) {
        const isNotId = item => item.objectId !== id
        const updatedlist = this.state.list.filter(isNotId)
        this.setState({list: updatedlist})
    }

    render() {
        return (
            <div className="App">
                {this.state.list.map(item =>
                    <div key={item.objectId}>
                        <span>
                         <a href={item.url}> {item.title} </a>
                        </span>
                        <span>{item.author}</span>
                        <span>{item.points}</span>
                        <span>{item.nun_comments}</span>
                        <span>
                            <button onClick={() => this.onDismiss(item.objectId)}
                            type="button"
                            >
                                Dismiss
                            </button>
                        </span>
                    </div>
                )}
            </div>
        )
    }
}
export default App