import React, { Component } from 'react';
import './App.css';
import Search from './components/Search/Search'
import Table from './components/Table/Table'
import ButtonWithLoading from './components/ButtonWithLoading/ButtonWithLoading'
import {
    DEFAULT_QUERY,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
} from '../constants'



class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false,
            sortKey: 'NONE',
            isSortReverse: false,
        }

        this.onSearchSubmit = this.onSearchSubmit.bind(this)
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
        this.setSearchTopStories = this.setSearchTopStories.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onDismiss = this.onDismiss.bind(this)
        this.onSort = this.onSort.bind(this)
    }

    onSort(sortKey) {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse
        this.setState({ sortKey, isSortReverse})
        console.log(this.state.isSortReverse)
    }

    setSearchTopStories(result) {
        const {hits, page } = result
        const { searchKey, results } = this.state

        const oldHits = results && results[searchKey]
        ? results[searchKey].hits
        : []
        const updatedHits = [
            ...oldHits,
            ...hits
        ]

        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page }
            },
            isLoading: false
        })

    }

    fetchSearchTopStories(searchTerm, page = 0) {
        this.setState({isLoading: true})

        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(e => this.setState({error: e}));
    }

    componentDidMount() {
        const { searchTerm } = this.state
        this.setState({ searchKey: searchTerm})
        this.fetchSearchTopStories(searchTerm)
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value})

    }

    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm})
        this.fetchSearchTopStories(searchTerm)
        event.preventDefault()
    }

    onDismiss(id) {
        const { searchKey, results } = this.state
        const { hits, page } = results[searchKey]

        const isNotId = item => item.objectID !== id
        const updatedHits = hits.filter(isNotId)
        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page }
            }
        })
    }

    render() {
        console.log(this.state)
        const {
            searchTerm,
            results,
            searchKey,
            error,
            isLoading,
            sortKey,
            isSortReverse,
        } = this.state
        const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page
        ) || 0

        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits
        ) || []

        return (
            <div className="page">
                <div className="interactions">
               <Search
                   value={searchTerm}
                   onChange={this.onSearchChange}
                   onSubmit={this.onSearchSubmit}
               >
                   Search
               </Search>
                </div>
                { error
                    ?  <div className="interactions">
                        <p>Paaanie error</p>
                      </div>
                    : <Table
                       list={list}
                       sortKey={sortKey}
                       isSortReversed={isSortReverse}
                       onDismiss={this.onDismiss}
                       onSort={this.onSort}
                    />
                }
                <div className="interactions">
                   <ButtonWithLoading
                       isLoading={isLoading}
                       onClick={() => this.fetchSearchTopStories(searchKey, page +1)}
                   >
                       More
                   </ButtonWithLoading>
                </div>
            </div>
        )
    }
}
export default App
