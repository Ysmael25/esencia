let cart = [];
        let favorites = [];

        function addToCart(productName, productPrice, productImage) {
            const existingProductIndex = cart.findIndex(item => item.name === productName);
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
            }
            displayCart();
        }

        function displayCart() {
            const cartDiv = document.getElementById('cart');
            cartDiv.innerHTML = ''; // Limpiar contenido previo

            if (cart.length === 0) {
                cartDiv.innerHTML = '<p>El carrito está vacío.</p>';
                document.getElementById('totalAmount').textContent = '0';
                updateCartCount();
                return;
            }

            for (let i = cart.length - 1; i >= 0; i--) {
                const item = cart[i];
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <div >
                        <div class="d-flex justify-content-between align-items-center">
                            <img src="${item.image}" class="img-fluid" alt="${item.name}" style="width: 50px; height: auto;">
                            <strong>${item.name}</strong> x <span id="quantity-${i}">${item.quantity}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn-borrar-item" onclick="removeFromCart(${i}); return false;">Borrar</button>
                            <div class="mt-2 d-flex justify-content-center">
                                <button class="btn-menos" onclick="updateQuantity(${i}, -1)">-</button>
                                <button class="btn-mas" onclick="updateQuantity(${i}, 1)">+</button>
                            </div>
                        </div>
                    </div>
                `;
                cartDiv.appendChild(itemDiv);
            }

            updateTotal();
            updateCartCount();
        }

        function toggleFavorite(productName, productPrice, productImage) {
            const existingFavoriteIndex = favorites.findIndex(item => item.name === productName);
            if (existingFavoriteIndex === -1) {
                // Añadir a favoritos
                favorites.push({ name: productName, price: productPrice, image: productImage });
            } else {
                // Quitar de favoritos
                favorites.splice(existingFavoriteIndex, 1);
            }
            displayFavorites();
        }

        function displayFavorites() {
            const favoritesDiv = document.getElementById('favorites');
            const noFavoritesMessage = document.getElementById('noFavoritesMessage');
            favoritesDiv.innerHTML = ''; // Limpiar contenido previo

            if (favorites.length === 0) {
                noFavoritesMessage.style.display = 'block';
                updateFavoriteCount();
                return;
            } else {
                noFavoritesMessage.style.display = 'none';
            }

            for (let i = 0; i < favorites.length; i++) {
                const item = favorites[i];
                const itemDiv = document.createElement('div');
                itemDiv.className = 'favorite-item';
                itemDiv.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" class="img-fluid" alt="${item.name}" style="width: 50px; height: auto; margin-right:8px">
                            <strong>${item.name}</strong>
                        </div>
                        <div>
                            <button class="btn-borrar-item" onclick="removeFromFavorites(${i}); return false;">Borrar</button>
                        </div>
                    </div>
                `;
                favoritesDiv.appendChild(itemDiv);
            }

            updateFavoriteCount();
        }

        function removeFromFavorites(index) {
            favorites.splice(index, 1);
            displayFavorites();
        }

        function updateQuantity(index, change) {
            cart[index].quantity += change;
            if (cart[index].quantity < 1) {
                removeFromCart(index);
            } else {
                displayCart();
            }
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            displayCart();
        }

        function clearCart() {
            cart = [];
            displayCart();
        }

        function updateTotal() {
            const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
        }

        function updateCartCount() {
            const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
            document.getElementById('cartCount').textContent = totalCount;
        }

        function updateFavoriteCount() {
            document.getElementById('favoriteCount').textContent = favorites.length;
        }

        // Controlar el comportamiento del dropdown
        document.getElementById('cartButton').addEventListener('click', function (event) {
            const dropdown = document.getElementById('cartDropdown');
            dropdown.classList.toggle('show');
            event.stopPropagation();
        });

        document.getElementById('favoriteButton').addEventListener('click', function (event) {
            const dropdown = document.getElementById('favoriteDropdown');
            dropdown.classList.toggle('show');
            event.stopPropagation();
        });

        // Cerrar los dropdowns si se hace clic fuera de ellos
        window.addEventListener('click', function () {
            const cartDropdown = document.getElementById('cartDropdown');
            const favoriteDropdown = document.getElementById('favoriteDropdown');
            cartDropdown.classList.remove('show');
            favoriteDropdown.classList.remove('show');
        });