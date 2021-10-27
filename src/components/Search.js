import React, { useRef, useState, useCallback } from 'react';
import { searchProducts } from '../services/searchProducts';
import { debounce } from 'lodash-es';

const SUPPORT_DEBOUNCE = true;

export function Search() {
  const input = useRef();
  const [results, setResults] = useState([]);
  const [showEmptyMessage, updateDisplayingEmptyMessage] = useState(false);

  const getValue = () => input.current.value.trim();

  const updateProducts = (value) => {
    searchProducts(value)
      .then((products) => {
        setResults(products);
        updateDisplayingEmptyMessage(products.length === 0);
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  const debouncedUpdateProducts = debounce(updateProducts, 500);

  const keyDownHandler = useCallback((evt) => {
    const value = getValue();
    if (evt.key === 'Enter' && value.length > 0) {
      setResults([]);
      if (SUPPORT_DEBOUNCE) {
        debouncedUpdateProducts(value);
      } else {
        updateProducts(value);
      }
    }
  }, []);

  return (
    <div>
      <h1>Regular search app</h1>
      <h3>
        Support debounce: <mark>{String(SUPPORT_DEBOUNCE)}</mark>
      </h3>
      <fieldset>
        <label>
          Search:
          <input
            ref={input}
            onKeyDown={keyDownHandler}
            placeholder="Enter phrase..."
            className="search-input"
          />
        </label>
      </fieldset>
      <div className="results">
        {showEmptyMessage && (
          <p className="no-results">No results for "{getValue()}"</p>
        )}
        {results.map((item) => {
          return (
            <fieldset key={item.id} className="result-row">
              <img src={item.imageUrl} className="product-photo" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}
