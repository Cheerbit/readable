import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostContainer from '../containers/PostContainer';
import PostsByCategoryContainer from '../containers/PostsByCategoryContainer';
import PostsContainer from '../containers/PostsContainer';
import NotFoundContainer from '../containers/NotFoundContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ PostsContainer } />
        <Route exact path='/notfound' component={NotFoundContainer} />
        <Route exact path='/:category' component={ PostsByCategoryContainer } />
        <Route path='/:category/:post_id' component={ PostContainer } />
        <Redirect key='catchall' from='*' to='/notfound' />
      </Switch>
    );
  }
}

export default App;
