import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Select } from 'antd';
import { CATEGORIES, CONTENT_TYPES } from '../constants';

const mapPropsToFields = props => {
  const { content, contentType } = props;
  if (contentType === CONTENT_TYPES.COMMENT) {
    if (!content) {
      return {
        author: Form.createFormField({}),
        body: Form.createFormField({}),
      };
    }
    return {
      author: Form.createFormField({
        value: props.content.author,
      }),
      body: Form.createFormField({
        value: props.content.body,
      }),
    };
  }
  if (!content) {
    return {
      author: Form.createFormField({}),
      body: Form.createFormField({}),
      category: Form.createFormField({}),
      title: Form.createFormField({}),
    }
  }
  return {
    author: Form.createFormField({
      value: content.author,
    }),
    body: Form.createFormField({
      value: content.body,
    }),
    category: Form.createFormField({
      value: content.category,
    }),
    title: Form.createFormField({
      value: content.title,
    }),
  };
};

class ContentEditor extends Component {
  static propTypes = {
    contentType: PropTypes.oneOf([CONTENT_TYPES.COMMENT, CONTENT_TYPES.POST]),
    isEditing: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    width: PropTypes.number,
  };

  static defaultProps = {
    contentType: CONTENT_TYPES.COMMENT,
    isEditing: false,
    width: 400,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit && this.props.onSubmit(values);
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6, offset: 0 },
      wrapperCol: { span: 14 },
    };
    const { isEditing, onCancel, contentType } = this.props;
    const { getFieldDecorator } = this.props.form;
    const submitContent = isEditing ? 'Submit' : 'Add';

    let items = [
      (
        <Form.Item label='Content' { ...formItemLayout } key='body'>
          { getFieldDecorator('body', {
            rules: [{ required: true, message: 'Content is required!' }],
          })(<Input.TextArea />) }
        </Form.Item>
      ),
    ];

    if (contentType === CONTENT_TYPES.POST) {
      items = [
        (
          <Form.Item label='Title' { ...formItemLayout } key='title'>
            { getFieldDecorator('title', {
                rules: [{ required: true, message: 'Title is required!' }],
              })(<Input />)
            }
          </Form.Item>
        ),
        (
          <Form.Item label='Content' { ...formItemLayout } key='body'>
            { getFieldDecorator('body', {
              rules: [{ required: true, message: 'Content is required!' }],
            })(<Input.TextArea />) }
          </Form.Item>
        )
      ];

      if (!isEditing) {
        items.push(
          <Form.Item
            { ...formItemLayout }
            label='Category'
            key='category'
          >
            {getFieldDecorator('category', {
              rules: [
                { required: true, message: 'Please pick category' },
              ],
            })(
              <Select placeholder='Please pick category'>
                <Select.Option value={ CATEGORIES.REACT }>{ CATEGORIES.REACT }</Select.Option>
                <Select.Option value={ CATEGORIES.REDUX }>{ CATEGORIES.REDUX }</Select.Option>
                <Select.Option value={ CATEGORIES.UDACITY }>{ CATEGORIES.UDACITY }</Select.Option>
              </Select>
            )}
          </Form.Item>
        )
      }
    }

    return (
      <Card style={{ marginTop: 10, width: this.props.width }}>
        <Form layout='horizontal' onSubmit={ this.handleSubmit }>
          { !isEditing && <Form.Item label='Author' { ...formItemLayout }>
            { getFieldDecorator('author', {
              rules: [{ required: true, message: 'Author is required!' }],
            })(<Input />) }
          </Form.Item> }
          { items }
          <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
            <Button type='primary' htmlType='submit'>
              { submitContent }
            </Button>
            <Button onClick={ () => onCancel && onCancel() } style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create({ mapPropsToFields })(ContentEditor);
