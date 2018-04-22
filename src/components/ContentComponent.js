import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Card, Icon } from 'antd';
import ContentEditor from './ContentEditor';
import { CONTENT_TYPES } from '../constants';

const styles = {
  card: {
    marginTop: 10,
  },
  contentWrapper: {
    cursor: 'pointer',
  },
};

export default class ContentComponent extends PureComponent {
  static propTypes = {
    content: PropTypes.object,
    contentType: PropTypes.oneOf([CONTENT_TYPES.COMMENT, CONTENT_TYPES.POST]),
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
    onDownVote: PropTypes.func,
    onEdit: PropTypes.func,
    onUpVote: PropTypes.func,
    width: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  render() {
    const { content, contentType, onClick, onDelete, onUpVote, onDownVote, width } = this.props;
    if (!content) {
      return null;
    }

    if (this.state.isEditing) {
      return (
        <ContentEditor
          contentType={ contentType }
          content={ content }
          onCancel={ () => this.setState({ isEditing: !this.state.isEditing }) }
          isEditing={ this.state.isEditing }
          onSubmit={ values => {
            this.props.onEdit(values, content);
            this.setState({ isEditing: !this.state.isEditing });
          } }
          width={ width }
        />
      );
    }
    const actions = [
      <Icon type='caret-up' onClick={() => onUpVote && onUpVote(content)} />,
      <Icon type='caret-down' onClick={() => onDownVote && onDownVote(content)} />,
      <Icon type='edit' onClick={ () => this.setState({ isEditing: !this.state.isEditing })} />,
    ];
    if (onDelete) {
      actions.push(<Icon type='delete' onClick={ () => onDelete(content) } />);
    }
    return (
      <Card
        actions={ actions }
        style={{ ...styles.card, width }}
      >
        <div onClick={ () => onClick && onClick(content) } style={ styles.contentWrapper }>
          <Card.Meta description={ `@${content.author}` } />
          { content.title && <Card.Meta title={ content.title } /> }
          <Card.Meta title={ content.body } />
          { content.category && <Card.Meta description={ `Category: ${content.category}` } /> }
          { !_.isNil(content.commentCount) && <Card.Meta description={ `Comments: ${content.commentCount}` } /> }
          <Card.Meta description={ `Votes: ${content.voteScore}` } />
          <Card.Meta description={ `Date: ${new Date(content.timestamp)}` } />
        </div>
      </Card>
    )
  }
}