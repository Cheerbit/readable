import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Layout, Select } from 'antd';
import { fetchSinglePost } from '../actions/postActions';
import { fetchAllComments, addComment } from '../actions/commentActions';
import CenteredSpinner from '../components/CenteredSpinner';
import Comment from '../components/Comment';
import ContentEditor from '../components/ContentEditor';
import Post from '../components/Post';

const styles = {
  layout: {
    alignItems: 'center',
    height: '100vh',
  },
  homeIcon: {
    position: 'absolute',
    left: 40,
    top: 40,
    fontSize: 24,
  },
};

const mapStateToProps = (state, ownProps) => {
  const { post_id: postId } = ownProps.match.params;
  return {
    comments: state.comments.normalized,
    post: state.posts.normalized[postId],
    isFetchingPost: state.posts.isFetchingPost,
    isFetchingComments: state.comments.isFetchingAll,
  }
};

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'desc',
    };
  }

  componentDidMount() {
    const { post_id: postId } = this.props.match.params;
    this.props.dispatch(fetchSinglePost(postId));
    this.props.dispatch(fetchAllComments(postId));
  }

  onSubmitComment = values => {
    const { dispatch, post } = this.props;
    dispatch(addComment({ ...values, postId: this.props.post.id }))
      .then(() => dispatch(fetchSinglePost(post.id)));
  };

  render() {
    const { comments, post, isFetchingPost, isFetchingComments } = this.props;
    if (isFetchingPost) {
      return <CenteredSpinner />;
    }

    let commentComponents = <CenteredSpinner />;
    if (!isFetchingComments) {
      const sortComparator = this.state.order === 'desc' ?
        ((c1, c2) => c2.timestamp - c1.timestamp) :
        ((c1, c2) => c1.timestamp - c2.timestamp);
      commentComponents = Object.keys(comments)
        .map(commentId => comments[commentId])
        .sort(sortComparator)
        .map(comment => {
        if (comment.deleted) {
          return null;
        }
        return (
          <Comment
            comment={ comment }
            key={ comment.id }
          />
        );
      });
    }
    return (
      <Layout style={ styles.layout }>
        <div style={{ cursor: 'pointer' }}>
          <Icon type='home' style={ styles.homeIcon } onClick={ () => this.props.history.replace('/') } />
        </div>
        <Post post={ post } onDelete={ () => this.props.history.replace('/') } />
        { !isFetchingComments && (
          <Select value={ this.state.order } onChange={ order => this.setState({ order }) } style={{ marginTop: 20 }}>
            <Select.Option value='desc'>{ 'New to Old' }</Select.Option>
            <Select.Option value='asc'>{ 'Old to New' }</Select.Option>
          </Select>
        ) }
        { commentComponents }
        { !isFetchingComments && <ContentEditor onSubmit={ this.onSubmitComment }/> }
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(PostContainer);
