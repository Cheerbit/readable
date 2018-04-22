import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import * as postActions from '../actions/postActions';
import Header from '../components/Header';
import CenteredSpinner from '../components/CenteredSpinner';
import ContentEditor from '../components/ContentEditor';
import Post from '../components/Post';
import { CONTENT_TYPES } from '../constants';

const styles = {
  layout: {
    alignItems: 'center',
    height: '100vh',
    padding: 20,
  },
};

const mapStateToProps = state => {
  return {
    posts: state.posts.normalized,
    isFetchingAll: state.posts.isFetchingAll,
  }
};

class PostsContainer extends Component {
  static propTypes = {
    isFetchingAll: PropTypes.bool,
    posts: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      order: 'desc',
    };
  }

  componentDidMount() {
    this.props.dispatch(postActions.fetchAllPosts());
  }

  onSubmitPost = values => {
    const { dispatch } = this.props;
    dispatch(postActions.addPost({ ...values }));
  };

  onCategoryChanged = category => {
    this.props.history.push(`/${category}`);
  };

  render() {
    const { isFetchingAll, posts } = this.props;
    if (isFetchingAll) {
      return <CenteredSpinner />;
    }

    const sortComparator = this.state.order === 'desc' ?
      ((p1, p2) => p2.timestamp - p1.timestamp) :
      ((p1, p2) => p1.timestamp - p2.timestamp);
    const postComponents = Object.keys(posts)
      .map(postId => posts[postId])
      .sort(sortComparator)
      .map(post => {
      return (
        <Post
          key={ post.id }
          post={ post }
          onPostClick={ post => this.props.history.push(`/${post.category}/${post.id}`) }
        />
      )
    });

    return (
      <Layout style={ styles.layout }>
        <Header
          category='all'
          onCategoryChanged={ this.onCategoryChanged }
          onOrderChanged={ order => this.setState({ order })}
          order={ this.state.order }
        />
        <ContentEditor contentType={ CONTENT_TYPES.POST } onSubmit={ this.onSubmitPost } width={ 600 } />
        { postComponents }
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(PostsContainer);
