import * as React from 'react';

import styles from './App.css';

export const App = () => {
  const loadCats = () => {
    fetch('/api/cats', { method: 'GET' })
      .then(data => data.json())
      .then(data => console.log(data));
  };

  return (
    <div>
      App
      <button type="button" onClick={loadCats}>loadCats</button>
      <h1 className={styles.title}>title</h1>
    </div>
  );
};
