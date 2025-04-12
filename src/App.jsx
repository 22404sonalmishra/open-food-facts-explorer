import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchFood = async () => {
    if (!query) return;
    const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`);
    const data = await res.json();
    setResults(data.products.slice(0, 5)); // Show top 5 results
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', color: 'white' }}>
      <h1>Open Food Facts Explorer</h1>
      <input
        type="text"
        placeholder="Search for food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={searchFood} style={{ marginLeft: '10px', padding: '10px' }}>
        Search
      </button>

      <div style={{ marginTop: '20px' }}>
        {results.map((product, index) => (
          <div key={index} style={{ marginBottom: '20px', background: '#222', padding: '15px', borderRadius: '8px' }}>
            <h3>{product.product_name || 'Unnamed Product'}</h3>
            {product.image_small_url && (
              <img src={product.image_small_url} alt="product" style={{ width: '100px' }} />
            )}
            <p><strong>Brand:</strong> {product.brands || 'N/A'}</p>
            {product.nutriments && (
              <ul>
                <li><strong>Energy:</strong> {product.nutriments['energy-kcal']} kcal</li>
                <li><strong>Fat:</strong> {product.nutriments.fat} g</li>
                <li><strong>Sugars:</strong> {product.nutriments.sugars} g</li>
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
