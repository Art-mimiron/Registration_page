import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.sass';

//import components

import About from '../About/About'
import Registration from '../Registration/Registration'
import UserList from '../UserList/UserList'
import Navigation from '../Navigation/Navigation'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users : [],
      searchQuery: ''
    }
    this.maxId = 0;
    
  }

  

  //local store
  componentDidMount = () => {
    if (localStorage.getItem('users') !== null) {
      const localUsers = JSON.parse(localStorage.getItem('users'))
      this.setState(() => {
        return {users: localUsers}
      });
      this.maxId = JSON.parse(localStorage.getItem('id'))
    } else {
      localStorage.setItem('users', JSON.stringify([]))
    }
  };
  


  componentDidUpdate = () => {
    localStorage.setItem('users', JSON.stringify(this.state.users))
    localStorage.setItem('id', JSON.stringify(this.maxId))
  }
  
 
  //functions
  
  formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hours.length < 2) 
        hours = '0' + hours;
    if (minutes.length < 2) 
        minutes = '0' + minutes;
    
    return (`${day}.${month}.${year} / ${hours}:${minutes}`);
}

  addUser = (user) => {
    const data = this.formatDate(new Date());
    const newUser = {...user, registrationTime: data, id: this.maxId++}

    this.setState(({users}) => {
      const addingUser = [...users, newUser]
      return {users: addingUser}
    })
    
    
  };

  removeUser = (id) => {
    this.setState(({users}) => {
      const index = users.findIndex(elem => elem.id === id);
      const newArr = [...users.slice(0, index), ...users.slice(index+1)]
      return {users: newArr}}) 
  }
    
  searchQuery = (searchQuery) => {
    this.setState({searchQuery})
  }

  searchResults = (users, searchQuery) => {
    if (searchQuery.length === 0) {
        return users;
    }

    return users.filter((users) => {
        return JSON.stringify(users).toLowerCase().indexOf(searchQuery) > -1;
    })
}

  //render
  
  render () {
    const {users, searchQuery} = this.state
    const visibleUsers = this.searchResults(users, searchQuery)
    
    
    return (
      <>
        <Router>
            
            <Navigation />
            
            <Switch>
              <Route path="/About">
                <About />
              </Route>
              <Route path="/User_list">
                <UserList users={visibleUsers} removeUser={this.removeUser} searchQuery={this.searchQuery} />
              </Route>
              <Route path="/New_user">
                <Registration addUser={this.addUser} />
              </Route>
              <Route path="/">
                <Redirect to="/New_user" />
              </Route>
            </Switch>
        </Router>
      </>
    )
  }
}