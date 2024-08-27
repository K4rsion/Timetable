import React from 'react';
import styles from './PageHeader.module.scss';

const PageTitle = ({ children }) => (
  <h2 className={styles.pageTitle}>{children}</h2>
);

export default PageTitle;
