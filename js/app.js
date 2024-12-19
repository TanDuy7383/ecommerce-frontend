document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Kìm Nanye', price: 100.00, category: 'Phụ kiện Gundam' },
        { id: 2, name: 'Máy chiếu', price: 1200.00, category: 'Đồ dùng văn phòng' },
        { id: 3, name: 'Hoodie', price: 200.00, category: 'Thời trang' },
        { id: 4, name: 'Star Destroyer', price: 450.00, category: 'Gundam' },
        { id: 5, name: 'Tastier', price: 800.00, category: 'Gundam' },
        { id: 6, name: 'Takeda 1/100', price: 1000.00, category: 'Gundam' }
    ];

    const productsContainer = document.getElementById('products');
    const searchInput = document.getElementById('search');
    const cartBtn = document.getElementById('cart-btn');
    const cart = [];
    const cartContainer = document.getElementById('cart');

    cartBtn.addEventListener('click', () => {
        cartContainer.classList.toggle('hidden');
    });

    function addToCart(product) {
        cart.push(product);
        alert(`${product.name} đã được thêm vào giỏ hàng!`);
        updateCart();
    }

    function updateCart() {
        cartBtn.textContent = `Giỏ hàng (${cart.length})`;
        cartContainer.innerHTML = '<h2>Giỏ Hàng Của Bạn</h2>';
        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `<p>${product.name} - $${product.price}</p>`;
            cartContainer.appendChild(cartItem);
        });
    }

    function renderProducts(filteredProducts) {
        productsContainer.innerHTML = '';
        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h2>${product.name}</h2>
                <p>$${product.price}</p>
                <button>Thêm vào giỏ hàng</button>
            `;
            productElement.querySelector('button').addEventListener('click', () => addToCart(product));
            productsContainer.appendChild(productElement);
        });
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.category.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });

    // Render all products initially
    renderProducts(products);
});
