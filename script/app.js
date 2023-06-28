/*
    app.js

*/

window.addEventListener('DOMContentLoaded', () => {

    const search = document.getElementById('search');

    const allProducts = productService.getProducts();
    displayProducts(allProducts);

    search.addEventListener('keyup', () => {
        const searchTerm = search.value;

        if (searchTerm === '') {
            const allProducts = productService.getProducts();
            displayProducts(allProducts);
        } else {
            const filteredProducts = productService.searchProducts(searchTerm);
            displayProducts(filteredProducts);
        }
    });
});

function displayProducts(products) {
    const productContainer = document.getElementById('product-cards');
    productContainer.innerHTML = '';

    for (let product of products) {
        const article = document.createElement('article');
        article.classList.add('product-card');

        const sku = document.createElement('div');
        sku.classList.add('sku');
        sku.innerText = product.productSku;
        article.appendChild(sku);

        const price = document.createElement('div');
        price.classList.add('price');
        price.innerText = '$' + product.price;
        article.appendChild(price);

        const name = document.createElement('div');
        name.classList.add('product-name', 'action');
        name.setAttribute("data-id", product.productId);
        name.innerText = product.name;

        name.addEventListener('click', () => {
            showMessage(product.description);
        });

        article.appendChild(name);

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('product-image');
        const image = document.createElement('img');
        image.setAttribute('src', product.imageName);
        imageContainer.appendChild(image);
        article.appendChild(imageContainer);

        const cart = document.createElement('div');
        cart.classList.add('cart');
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-cart-plus', 'icon', 'action');
        icon.setAttribute('title', 'Add item to cart');
        cart.appendChild(icon);

        icon.addEventListener('click', () => {
            showMessage(product.name + ' added to cart');
        });

        article.appendChild(cart);

        productContainer.appendChild(article);
    }
}


function showMessage(msg) {
    const middleNav = document.getElementById('middle-nav');
    middleNav.innerText = msg;
    middleNav.style.opacity = "1";

    setTimeout(() => {
        middleNav.style.transition = "opacity 1s";
        middleNav.style.opacity = "0";
    }, 3000);
}