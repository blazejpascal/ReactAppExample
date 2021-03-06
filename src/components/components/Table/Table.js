import React from 'react';
import './Table.css';
import Button from '../Button/Button'
import Sort from '../Sort/Sort'
import PropTypes from 'prop-types'
import {sortBy} from "lodash";

const largeColumn = {
    width: '40%',
};
const midColumn = {
    width: '30%',
};
const smallColumn = {
    width: '10%',
};

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
};

const Table = ({ list, sortKey, onSort, onDismiss, isSortReverse }) => {
    const sortedList = SORTS[sortKey](list)
    const reverseSortedList = isSortReverse
    ? sortedList.reverse()
    : sortedList

    return(
    <div className="table">
        <div className='table-header'>
                <span style={largeColumn}>
                    <Sort sortKey={'TITLE'}
                          onSort={onSort}
                          activeSortKey={sortKey}
                    >
                        Title
                    </Sort>
                </span>
            <span style={midColumn}>
                    <Sort sortKey={'AUTHOR'}
                          onSort={onSort}
                          activeSortKey={sortKey}
                    >
                        Author
                    </Sort>
                </span>
            <span style={smallColumn}>
                    <Sort sortKey={'POINTS'}
                          onSort={onSort}
                          activeSortKey={sortKey}
                    >
                        Points
                    </Sort>
                </span>
            <span style={smallColumn}>
                    <Sort sortKey={'COMMENTS'}
                          onSort={onSort}
                          activeSortKey={sortKey}
                    >
                        Comments
                    </Sort>
                </span>
            <span style={smallColumn}>
                        Archive
            </span>
        </div>
        {reverseSortedList.map(item =>
            <div key={item.objectID} className="table-row">
                    <span style={largeColumn}>
                     <a href={item.url}> {item.title} </a>
                    </span>
                <span style={midColumn}>{item.author}</span>
                <span style={smallColumn}>{item.points}</span>
                <span style={smallColumn}>{item.num_comments}</span>
                <span style={smallColumn}>
                        <Button onClick={() => onDismiss(item.objectID)}
                                className="button-inline"
                        >
                            Dismiss
                        </Button>
                    </span>
            </div>
        )}
    </div>
    )
}

Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_components: PropTypes.number,
            points: PropTypes.number
        })
    ),
    onDismiss: PropTypes.func.isRequired,

}

export default Table