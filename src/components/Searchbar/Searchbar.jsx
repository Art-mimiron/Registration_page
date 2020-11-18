import React, {Component} from 'react';
import './Searchbar.sass';

export default class Searchbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: ''
        }
    }

    takeFilter = (e) => {
        const filter = e.target.value;
        this.setState({filter});
        this.props.searchQuery(filter.toLowerCase())
    }

    render() {
        return (
            <div className='Searchbar'>
            <input 
            className="Searchbar-Input"
            type="text"
            value={this.state.filter}
            onChange={this.takeFilter}
            id='searchbar'
            required
            />
            <label htmlFor="searchbar" className='Searchbar-Label'>
                <span className='Searchbar-Title'>SEARCH QUERY</span>
            </label>
            </div>
        )
    }
}