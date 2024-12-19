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
    const priceFilter = document.getElementById('price');
    const menuItems = document.querySelectorAll('nav ul li a');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const authModal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginSubmit = document.getElementById('login-submit');
    const signupSubmit = document.getElementById('signup-submit');

    cartBtn.addEventListener('click', () => {
        cartContainer.classList.toggle('hidden');
    });

    loginLink.addEventListener('click', (event) => {
        event.preventDefault();
        authModal.classList.remove('hidden');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    });

    signupLink.addEventListener('click', (event) => {
        event.preventDefault();
        authModal.classList.remove('hidden');
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    loginSubmit.addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        // Gửi yêu cầu đăng nhập đến máy chủ
        fetch('https://your-server-endpoint.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Đăng nhập thành công!');
                authModal.classList.add('hidden');
                // Xử lý khi đăng nhập thành công (ví dụ: lưu thông tin người dùng, cập nhật giao diện)
            } else {
                alert('Đăng nhập thất bại. Vui lòng thử lại.');
            }
        })
        .catch(error => {
            console.error('Có lỗi xảy ra:', error);
            alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.');
        });
    });

    signupSubmit.addEventListener('click', () => {
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        // Gửi yêu cầu đăng ký đến máy chủ
        fetch('https://your-server-endpoint.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Đăng ký thành công!');
                authModal.classList.add('hidden');
                // Xử lý khi đăng ký thành công (ví dụ: tự động đăng nhập, cập nhật giao diện)
            } else {
                alert('Đăng ký thất bại. Vui lòng thử lại.');
            }
        })
        .catch(error => {
            console.error('Có lỗi xảy ra:', error);
            alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
        });
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

    function applyFilters() {
        const selectedPrice = priceFilter.value;
        let filteredProducts = products;

        if (selectedPrice !== 'all') {
            filteredProducts = filteredProducts.filter(product => {
                const price = product.price;
                if (selectedPrice === '0-200') return price >= 0 && price <= 200;
                if (selectedPrice === '201-500') return price > 200 && price <= 500;
                if (selectedPrice === '501-1000') return price > 500 && price <= 1000;
                if (selectedPrice === '1000+') return price > 1000;
            });
        }

        renderProducts(filteredProducts);
    }

    function filterByCategory(category) {
        let filteredProducts = products;

        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        renderProducts(filteredProducts);
    }

    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const category = item.getAttribute('data-category');
            filterByCategory(category);
        });
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.category.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });

    priceFilter.addEventListener('change', applyFilters);

    // Render all products initially
    renderProducts(products);
});
