import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import ContentComponent from './ContentComponent';
import { votePost, deletePost, editPost, fetchAllPosts } from '../actions/postActions';
import { CONTENT_TYPES } from '../constants';

class Post extends PureComponent {
  static propTypes = {
    post: PropTypes.object,
    onPostClick: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    onDelete: _.noop,
  };

  onDeletePost = post => {
    const { dispatch, onDelete } = this.props;
    dispatch(deletePost(post.id))
      .then(() => dispatch(fetchAllPosts()))
      .then(() => onDelete());
  };

  onEditPost = (values, post) => {
    const { dispatch } = this.props;
    dispatch(editPost({ postId: post.id, body: values.body, title: values.title }));
  };

  render() {
    const { dispatch, onPostClick, post } = this.props;
    if (!post) {
      return null;
    }

    return (
      <ContentComponent
        content={ post }
        contentType={ CONTENT_TYPES.POST }
        onClick={ onPostClick }
        onDelete={ this.onDeletePost }
        onDownVote={ post => dispatch(votePost(post.id, 'downVote')) }
        onEdit={ this.onEditPost }
        onUpVote={ post => dispatch(votePost(post.id, 'upVote')) }
        width={ 600 }
      />
    );
  }
}

export default connect()(Post);
