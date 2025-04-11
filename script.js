document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const query = document.getElementById('search').value;
    const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`);
    const data = await response.json();

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    data.products.slice(0, 5).forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.product_name || 'No Name'}</h3>
            <p><strong>Countries:</strong> ${product.countries || 'N/A'}</p>
            <p><strong>Brands:</strong> ${product.brands || 'N/A'}</p>
            <p><strong>Categories:</strong> ${product.categories || 'N/A'}</p>
            <img src="${product.image_small_url || ''}" alt="Product Image" width="100">
        `;
        resultsDiv.appendChild(card);
    });
});
