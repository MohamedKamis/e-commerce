
console.log("Item Profile Loaded");
const url = new URL(window.location.href);
const api_url = url.origin;
const productCode = url.searchParams.get('product');
if (!productCode) {
    console.error('Product code is required');
    window.location.href = api_url;
}
async function fetchProductDetails() {
    try {
        const response = await fetch(`${api_url}/product?product=${productCode}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const product = await response.json();
        console.log('Product details fetched:', product);
        return product;
    } catch (error) {
        console.error('Error fetching product details:', error);
        window.location.href = api_url;
    }
}
async function renderProductDetails() {
    const product = await fetchProductDetails();
    if (!product) {
        console.error('Product not found');
        window.location.href = api_url;
        return;
    }
    document.getElementById('product-title').innerText = product.name_product;
    document.getElementById('product-description').innerText = product.Description;
    document.getElementById('product-price').innerText = `${product.price}`;
    document.getElementById('old-price').innerText = ` ${Math.floor(Number(product.price) + Number(10/100*product.price))} EGP`;
    document.getElementById('product-image').src = product.image_url;
}
document.addEventListener('DOMContentLoaded', () => {
    renderProductDetails();
});
document.getElementById('add-to-cart-button').addEventListener('click', () => {

    const id_prodect = productCode ;
    const price =  document.getElementById('product-price').textContent;
    // const price = 8080;
    const quantity= document.getElementById('qty').value || 1;
    const url = new URL(window.location.href);
    const api_url =url.origin;
      if (
        !localStorage.getItem('user_id') || localStorage.getItem('user_id') === 'null' ||
        localStorage.getItem('user_id') === '' || localStorage.getItem('user_id') === 'undefined' || localStorage.getItem('user_id') === undefined 
    ) {
       return window.location.href = api_url+'/login';
    }
    if (!localStorage.getItem('data_orders')) {
        localStorage.setItem('data_orders', JSON.stringify([]));
    } 
        const existingOrders = JSON.parse(localStorage.getItem('data_orders'));
        const orderData = {
            product_id: id_prodect,
            price: price,
            quantity: quantity
        };
        // Check if the order already exists
        existingOrders.push(orderData);
        localStorage.setItem('data_orders', JSON.stringify(existingOrders));
        return ;
    

    // const qtyInput = document.getElementById('qty');
    // const quantity = qtyInput.value || 1;
    // console.log(`Adding ${quantity} of product ${productCode} to cart`);
    // // Here you would typically send a request to your backend to add the item to the cart
    // alert(`Added ${quantity} of ${product.name_product} to cart`);
});
document.getElementById('increase-qty').addEventListener('click', () => {
    const qtyInput = document.getElementById('qty');
    const current = parseInt(qtyInput.value, 10) || 1;
    qtyInput.value = current + 1;
});
document.getElementById('decrease-qty').addEventListener('click', () => {
    const qtyInput = document.getElementById('qty');
    const current = parseInt(qtyInput.value, 10) || 1;
    if (current > 1) {
        qtyInput.value = current - 1;
    }
});
document.getElementById('buy-now').addEventListener('click', () => {
    const qtyInput = document.getElementById('qty');
    const quantity = qtyInput.value || 1;
    console.log(`Buying ${quantity} of product ${productCode}`);
    // Here you would typically redirect to a checkout page or process the purchase
    alert(`Proceeding to buy ${quantity} of ${product.name_product}`);
});
document.getElementById('add-to-favorites').addEventListener('click', () => {
    console.log(`Adding product ${productCode} to favorites`);
    // Here you would typically send a request to your backend to add the item to favorites
    alert(`Added ${product.name_product} to favorites`);
});
document.getElementById('view-section').addEventListener('click', () => {
    const sectionLink = `${api_url}/category/items?a=${product.sections_code}`;
    window.location.href = sectionLink;
});
document.getElementById('home-link').href = api_url;
    //   document.getElementById('product-list').innerHTML += `
    //   <div class="bg-white rounded-lg border border-gray-200 p-3 relative flex flex-col" style="min-width: 280px;max-height: 400px;">
    //    <button aria-label="Add to favorites" class="absolute top-3 right-3 bg-white rounded-md p-2 text-gray-800 hover:text-red-600">
    //     <i class="far fa-heart"></i>
    //    </button>
    //    <div class="relative rounded-lg overflow-hidden">
    //     <img alt="${product.description}" class="w-full h-auto object-cover rounded-lg" style="width:300px;" loading="lazy" src="${product.image_url}" width="300"/>
    //     <div aria-hidden="true" class="absolute bottom-3 left-3 bg-black bg-opacity-70 rounded-md p-1 text-yellow-400 text-lg">
    //      <i class="fas fa-adjust"></i>
    //     </div>
    //    </div>
    //    <h3 class="mt-3 font-bold text-sm leading-tight text-gray-900">${product.name_product}</h3>
    //    <div class="mt-1 flex space-x-1 justify-start rtl:space-x-reverse text-yellow-400 text-lg">);
    //      <i class="far fa-star"></i>
    //      <i class="far fa-star"></i>
    //      <i class="far fa-star"></i>
    //      <i class="far fa-star"></i>
    //      <i class="far fa-star"></i>
    //    </div>
    //    <p class="mt-2 text-gray-600 text-sm">${product.description}</p>
    //    <p class="mt-2 text-gray-800 font-semibold">${product.price} E   GP
    //     <span class="text-gray-500 mx-1">-</span> 
    //     ${Math.floor(Number(product.price) + Number(10/100*product.price))} EGP
    //    </p>
    //    <button class="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-md py-2 flex items-center justify-center gap-2" type="button" onclick="posh_order(${product.products_code},${product.price})">
    //     اضافه الي العربه
    //     <i class="fas fa-shopping-cart"></i>
    //      </button>
    //      <button class="mt-3 bg-yellow-300 hover:bg-yellow-500 text-gray-900 font-semibold rounded-md py-2 flex items-center justify-center gap-2" type="button">  
    //     <a href="${api_url}/item-profile?product=${product.products_code}" class="text-blue-500 hover:underline">  عرض التفاصيل  </a>
    //     <i class="fas fa-info-circle"></i>
    //      </button>
    //     </div>
    // `;
document.getElementById('page-title').innerHTML = product.sections_name;
document.getElementById('section-link').href = `${api_url}/category/items?a=${product.sections_code}`;
document.getElementById('section-link').innerHTML = product.sections_name;
document.getElementById('home-link').href = api_url;
// document.getElementById('product-list').innerHTML += `       




