function openModal(title, description, image, price, features) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalPrice').innerText = `S/ ${price}`;
    
    // Actualizar características
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = ''; // Limpiar lista previa
    features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    $('#myModal').modal('show'); // Muestra el modal
}

document.getElementById('closeModalButton').onclick = function() {
    $('#myModal').modal('hide');
};

function addToCart() {
    alert('Producto añadido al carrito.');
}

function toggleFavorite() {
    alert('Producto añadido a favoritos.');
}