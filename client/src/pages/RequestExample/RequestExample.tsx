import { useState, useCallback, useEffect } from 'react';
import * as React from 'react';

import styles from './RequestExample.css';

export const RequestExample = () => {
  const [newCatValue, setNewCatValue] = useState('');
  const [cats, setCats] = useState([]);

  const loadCats = useCallback(() => {
    fetch('/api/cats', { method: 'GET' })
      .then(data => data.json())
      .then(data => {
        setCats(data.cats);
      });
  }, []);

  const addCat = () => {
    fetch('/api/cat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cat: newCatValue }),
    })
      .then(() => {
        setNewCatValue('');
        loadCats();
      });
  };

  useEffect(() => {
    loadCats();
  }, [loadCats]);

  return (
    <div>
      App
      New cat:
      <input
        value={newCatValue}
        onChange={e => setNewCatValue(e.target.value)}
      />
      <br />
      <button type="button" onClick={addCat}>Add Cat</button>
      {cats.map((cat, i) => (
        <div key={i}>
          <span className={styles.title}>
            {cat}
          </span>
        </div>
      ))}
    </div>
  );
};
