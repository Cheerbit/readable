import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Post from '../components/Post';
import { fetchPostsByCategory } from '../actions/postActions';

const styles = {
  layout: {
    alignItems: 'center',
    height: '100vh',
    padding: 20,
  },
};

const mapStateToProps = (state, ownerProps) => {
  return {
    posts: state.posts.normalized,
  };
};

class PostsByCategoryContainer extends Component {
  state = {};

  static propTypes = {
    posts: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      order: 'desc',
    };
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    const { dispatch } = this.props;
    dispatch(fetchPostsByCategory(category));
  }

  componentDidUpdate(prevProps) {
    const { category: oldCategory } = prevProps.match.params;
    const { category } = this.props.match.params;
    const { dispatch } = this.props;
    if (category !== oldCategory) {
      dispatch(fetchPostsByCategory(category));
    }
  }

  onCategoryChanged = category => {
    if (category === 'all') {
      this.props.history.push('/');
    } else {
      this.props.history.push(`/${category}`);
    }
  };

  render() {
    const { category } = this.props.match.params;
    const { posts } = this.props;

    const sortComparator = this.state.order === 'desc' ?
      ((p1, p2) => p2.timestamp - p1.timestamp) :
      ((p1, p2) => p1.timestamp - p2.timestamp);

    const postsByCategory = Object.keys(posts)
      .map(postId => posts[postId])
      .sort(sortComparator)
      .map(post => {
      if (post.category !== category) {
        return null;
      }
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
          category={ category }
          onCategoryChanged={ this.onCategoryChanged }
          onOrderChanged={ order => this.setState({ order })}
          order={ this.state.order }
        />
        { postsByCategory }
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(PostsByCategoryContainer);
