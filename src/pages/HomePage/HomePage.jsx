import React from 'react';
import { Layout, PageHeader } from 'antd';

import styles from './styles.module.scss';

import VarsTable from '../../components/VarsTable/VarsTable';

const { Header, Content, Footer } = Layout;

const HomePage = () => {
  return (
    <>
      <Layout className={styles.layout}>
        <Header className={styles.header}>Динамические конфиги Userver</Header>

        <Content className={styles.content}>
          <PageHeader title="Список переменных" />

          <VarsTable />
        </Content>

        <Footer className={styles.footer}>Сделано с любовью ❤️ 2022</Footer>
      </Layout>
    </>
  );
};

export default HomePage;
