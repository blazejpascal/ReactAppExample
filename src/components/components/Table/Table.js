import React from 'react';
import './Table.css';
import Button from '../Button/Button'


const largeColumn = {
    width: '40%',
};
const midColumn = {
    width: '30%',
};
const smallColumn = {
    width: '10%',
};

const Table = ({ list, onDismiss }) =>
        <div className="table">
       { list.map(item =>
            <div key={item.objectId} className="table-row">
                    <span style={largeColumn}>
                     <a href={item.url}> {item.title} </a>
                    </span>
                <span style={midColumn}>{item.author}</span>
                <span style={smallColumn}>{item.points}</span>
                <span style={smallColumn}>{item.nun_comments}</span>
                <span style={smallColumn}>
                        <Button onClick={() => onDismiss(item.objectId)}
                                className="button-inline"
                        >
                            Dismiss
                        </Button>
                    </span>
            </div>
        )}
        </div>

export default Table