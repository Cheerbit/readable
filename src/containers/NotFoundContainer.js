import React from 'react';
import { Layout } from 'antd';

const styles = {
  layout: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: '100vh',
  },
};

const NotFoundContainer = () => (
  <Layout style={ styles.layout }>
    <div>
      <h1>404</h1>
    </div>
  </Layout>
);

export default NotFoundContainer;
