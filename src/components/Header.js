import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Radio, Select } from 'antd';
import { CATEGORIES } from '../constants';

export default class Header extends PureComponent {
  static propTypes = {
    category: PropTypes.string.isRequired,
    onCategoryChanged: PropTypes.func,
    onOrderChanged: PropTypes.func,
    order: PropTypes.string.isRequired,
  };

  onCategoryChanged = e => {
    this.props.onCategoryChanged && this.props.onCategoryChanged(e.target.value);
  };

  onOrderChanged = value => {
    this.props.onOrderChanged && this.props.onOrderChanged(value);
  }

  render() {
    return (
      <div>
        <Radio.Group value={ this.props.category } onChange={ this.onCategoryChanged }>
          <Radio.Button value={ 'all' }>{ 'all' }</Radio.Button>
          <Radio.Button value={ CATEGORIES.REACT }>{ CATEGORIES.REACT }</Radio.Button>
          <Radio.Button value={ CATEGORIES.REDUX }>{ CATEGORIES.REDUX }</Radio.Button>
          <Radio.Button value={ CATEGORIES.UDACITY }>{ CATEGORIES.UDACITY }</Radio.Button>
        </Radio.Group>
        <Select value={ this.props.order } onChange={ this.onOrderChanged }>
          <Select.Option value='desc'>{ 'New to Old' }</Select.Option>
          <Select.Option value='asc'>{ 'Old to New' }</Select.Option>
        </Select>
      </div>
    )
  }
}