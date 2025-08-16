document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Masa de Maíz Tradicional', price: 10.00 },
        { id: 2, name: 'Masa de Maíz Azul', price: 12.00 },
        { id: 3, name: 'Masa para Restaurantes', price: 45.00 }
    ];

    // Cargar el carrito desde localStorage al iniciar
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <div class="cart-item-info">
                        <span>${item.name}</span>
                        <span class="price">$${item.price.toFixed(2)} USD</span>
                    </div>
                    <div class="cart-item-quantity-controls">
                        <button class="quantity-minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-plus" data-id="${item.id}">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
                totalItems += item.quantity;
            });
        }
        cartTotalElement.textContent = `$${total.toFixed(2)} USD`;
        cartCountElement.textContent = totalItems;
        saveCart(); // Guardar el carrito después de cada renderización
    };

    const addToCart = (productId) => {
        const product = products.find(p => p.id == productId);
        const existingItem = cart.find(item => item.id == productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    };

    const updateQuantity = (productId, change) => {
        const item = cart.find(i => i.id == productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id != productId);
            }
            renderCart();
        }
    };

    cartIcon.addEventListener('click', (event) => {
        cartDropdown.classList.toggle('visible');
    });
    
    document.addEventListener('click', (event) => {
        const isClickInside = cartDropdown.contains(event.target) || cartIcon.contains(event.target);
        if (!isClickInside && cartDropdown.classList.contains('visible')) {
            cartDropdown.classList.remove('visible');
        }
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            addToCart(productId);
            cartDropdown.classList.add('visible');
        });
    });

    cartItemsContainer.addEventListener('click', (e) => {
        e.stopPropagation(); 

        if (e.target.classList.contains('quantity-plus')) {
            const productId = e.target.dataset.id;
            updateQuantity(productId, 1);
        }
        if (e.target.classList.contains('quantity-minus')) {
            const productId = e.target.dataset.id;
            updateQuantity(productId, -1);
        }
    });

    renderCart();
});