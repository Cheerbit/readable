import React, { PureComponent } from 'react';
import { Layout, Spin } from 'antd';

const style = {
  height: '100vh',
  justifyContent: 'center',
};

export default class CenteredSpinner extends PureComponent {
  render() {
    return <Layout style={ style }><Spin size='large' /></Layout>;
  }
}