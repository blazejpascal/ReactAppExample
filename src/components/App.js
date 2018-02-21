import React, { Component } from 'react';
import './App.css';
import Search from './components/Search/Search'
import Table from './components/Table/Table'
import Button from "./components/Button/Button";

const DEFAULT_QUERY = 'redux'
const DEFAULT_HPP = '5'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
        }

        this.onSearchSubmit = this.onSearchSubmit.bind(this)
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
        this.setSearchTopStories = this.setSearchTopStories.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onDismiss = this.onDismiss.bind(this)
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
            }
        })

    }

    fetchSearchTopStories(searchTerm, page = 0) {
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
                       onDismiss={this.onDismiss}
                    />
                }
                <div className="interactions">
                    <Button onClick={()=> this.fetchSearchTopStories(searchKey, page + 1)} >
                        More
                    </Button>
                </div>
            </div>
        )
    }
}
export default App