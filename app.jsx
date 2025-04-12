import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchFood = async () => {
    if (!query.trim()) return;
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`
    );
    const data = await response.json();
    setResults(data.products.slice(0, 5));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Open Food Facts Explorer</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search food..."
        style={{ padding: '8px', width: '250px' }}
      />
      <button onClick={searchFood} style={{ padding: '8px 12px', marginLeft: '10px' }}>
        Search
      </button>

      <div style={{ marginTop: '20px' }}>
        {results.map((product, index) => (
          <div key={index} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <h3>{product.product_name || 'No Name'}</h3>
            <p><strong>Countries:</strong> {product.countries || 'N/A'}</p>
            <p><strong>Brands:</strong> {product.brands || 'N/A'}</p>
            <p><strong>Categories:</strong> {product.categories || 'N/A'}</p>
            {product.image_small_url && (
              <img src={product.image_small_url} alt="Product" width="100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
