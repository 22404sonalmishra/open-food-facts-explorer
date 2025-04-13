import React, { useState } from 'react';
import "./../style.css";


function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [tags, setTags] = useState({});

  const handleSearch = async () => {
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`
    );
    const data = await response.json();
    setResults(data.products.slice(0, 5));
  };

  const handleAddTag = (code) => {
    const tag = prompt('Enter a tag:');
    if (tag) {
      setTags((prevTags) => ({
        ...prevTags,
        [code]: tag,
      }));
    }
  };

  return (
    <div className="app">
      <h1>Open Food Facts Explorer</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search food..."
      />
      <button onClick={handleSearch}>Search</button>

      <div className="products">
        {results.map((product) => (
          <div key={product.code} className="product-card">
            <h2>{product.product_name}</h2>
            <img
              src={product.image_front_small_url}
              alt={product.product_name}
              width="100"
            />
            <p><strong>Brand:</strong> {product.brands}</p>
            <ul>
              <li><strong>Energy:</strong> {product.nutriments?.energy_kcal} kcal</li>
              <li><strong>Fat:</strong> {product.nutriments?.fat} g</li>
              <li><strong>Sugars:</strong> {product.nutriments?.sugars} g</li>
            </ul>

            <button onClick={() => handleAddTag(product.code)}>Add Tag</button>
            {tags[product.code] && (
              <p><strong>Tag:</strong> {tags[product.code]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
