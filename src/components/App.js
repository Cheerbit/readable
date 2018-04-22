import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PostContainer from '../containers/PostContainer';
import PostsByCategoryContainer from '../containers/PostsByCategoryContainer';
import PostsContainer from '../containers/PostsContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ PostsContainer } />
        <Route exact path='/:category' component={ PostsByCategoryContainer } />
        <Route path='/:category/:post_id' component={PostContainer} />
      </Switch>
    );
  }
}

export default App;
