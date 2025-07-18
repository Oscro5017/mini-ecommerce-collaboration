document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    let allProducts = [];

    loader.style.display = 'block'
    // Fetch products from JSON
    fetch('js/products.json')
        .then(response => response.json())
        
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        })
        .finally(() =>{
            loader.style.display = 'none'
        })

    function displayProducts(products) {
        productList.innerHTML = ''; // Clear previous list
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${product.price.toLocaleString()} บาท</p>
            `;
            productList.appendChild(card);
        });
    }

    // Inefficient Search
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm === '') {
            const filteredProducts = allProducts.filter(product => {
                return product.name.toLowerCase().includes(searchTerm);
            });
        }
        displayProducts(filteredProducts);
    });
});