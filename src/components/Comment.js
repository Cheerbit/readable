import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentEditor from './ContentEditor';
import ContentComponent from './ContentComponent';
import { fetchSinglePost } from '../actions/postActions';
import { voteComment, deleteComment, editComment } from '../actions/commentActions';

class Comment extends PureComponent {
  static propTypes = {
    comment: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  onDeleteComment = comment => {
    const { dispatch } = this.props;
    dispatch(deleteComment(comment.id))
      .then(() => dispatch(fetchSinglePost(comment.parentId)));
  };

  onEditComment = (values, comment) => {
    const { dispatch } = this.props;
    dispatch(editComment({ commentId: comment.id, body: values.body }));
  };

  render() {
    const { comment, dispatch } = this.props;
    if (!comment) {
      return null;
    }

    if (this.state.isEditing) {
      return (
        <ContentEditor
          content={ comment }
          onCancel={ () => this.setState({ isEditing: !this.state.isEditing }) }
          isEditing={ this.state.isEditing }
          onSubmit={ values => {
            this.props.onEdit(values, comment);
            this.setState({ isEditing: !this.state.isEditing });
          } }
        />
      );
    }
    return (
      <ContentComponent
        content={ comment }
        onDelete={ this.onDeleteComment }
        onDownVote={ comment => dispatch(voteComment(comment.id, 'downVote')) }
        onEdit={ this.onEditComment }
        onUpVote={ comment => dispatch(voteComment(comment.id, 'upVote')) }
        width={ 400 }
      />
    );
  }
}

export default connect()(Comment);
