document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.remove('hidden');
    });

    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
    });

    // Add Product Modal
    const addProductButton = document.getElementById('add-product-button');
    const addProductModal = document.getElementById('add-product-modal');
    const closeAddProduct = document.getElementById('close-add-product');
    const cancelAddProduct = document.getElementById('cancel-add-product');

    addProductButton.addEventListener('click', function() {
        addProductModal.classList.remove('hidden');
    });

    closeAddProduct.addEventListener('click', function() {
        addProductModal.classList.add('hidden');
    });

    cancelAddProduct.addEventListener('click', function() {
        addProductModal.classList.add('hidden');
    });

    // Edit Product Modal
    const editProductButtons = document.querySelectorAll('.edit-product');
    const editProductModal = document.getElementById('edit-product-modal');
    const closeEditProduct = document.getElementById('close-edit-product');
    const cancelEditProduct = document.getElementById('cancel-edit-product');

    editProductButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            document.getElementById('edit-product-id').value = productId;
            
            // In a real app, you would fetch product details by ID here
            // For demo, we'll just populate with sample data
            switch(productId) {
                case '1':
                    document.getElementById('edit-product-name').value = 'Premium Smartphone';
                    document.getElementById('edit-product-sku').value = 'SP-001';
                    document.getElementById('edit-product-description').value = 'High-end smartphone with advanced camera features';
                    document.getElementById('edit-product-category').value = 'Electronics';
                    document.getElementById('edit-product-brand').value = 'TechBrand';
                    document.getElementById('edit-product-price').value = '899.99';
                    document.getElementById('edit-product-cost').value = '599.99';
                    document.getElementById('edit-product-quantity').value = '24';
                    document.getElementById('edit-product-weight').value = '0.45';
                    document.getElementById('edit-product-dimensions').value = '15cm x 7cm x 0.9cm';
                    document.getElementById('edit-product-status').value = 'Active';
                    document.getElementById('edit-product-featured').checked = true;
                    document.getElementById('edit-product-image-preview').src = 'https://placehold.co/100';
                    break;
                case '2':
                    document.getElementById('edit-product-name').value = 'Wireless Headphones';
                    document.getElementById('edit-product-sku').value = 'HP-002';
                    document.getElementById('edit-product-description').value = 'Premium wireless headphones with noise cancellation';
                    document.getElementById('edit-product-category').value = 'Electronics';
                    document.getElementById('edit-product-brand').value = 'AudioTech';
                    document.getElementById('edit-product-price').value = '199.99';
                    document.getElementById('edit-product-cost').value = '129.99';
                    document.getElementById('edit-product-quantity').value = '3';
                    document.getElementById('edit-product-weight').value = '0.3';
                    document.getElementById('edit-product-dimensions').value = '20cm x 15cm x 5cm';
                    document.getElementById('edit-product-status').value = 'Active';
                    document.getElementById('edit-product-featured').checked = false;
                    document.getElementById('edit-product-image-preview').src = 'https://placehold.co/100';
                    break;
                case '3':
                    document.getElementById('edit-product-name').value = 'Winter Jacket';
                    document.getElementById('edit-product-sku').value = 'CJ-003';
                    document.getElementById('edit-product-description').value = 'Warm winter jacket for cold weather';
                    document.getElementById('edit-product-category').value = 'Clothing';
                    document.getElementById('edit-product-brand').value = 'OutdoorWear';
                    document.getElementById('edit-product-price').value = '129.99';
                    document.getElementById('edit-product-cost').value = '79.99';
                    document.getElementById('edit-product-quantity').value = '0';
                    document.getElementById('edit-product-weight').value = '1.2';
                    document.getElementById('edit-product-dimensions').value = '60cm x 40cm x 5cm';
                    document.getElementById('edit-product-status').value = 'Archived';
                    document.getElementById('edit-product-featured').checked = false;
                    document.getElementById('edit-product-image-preview').src = 'https://placehold.co/100';
                    break;
            }
            
            editProductModal.classList.remove('hidden');
        });
    });

    closeEditProduct.addEventListener('click', function() {
        editProductModal.classList.add('hidden');
    });

    cancelEditProduct.addEventListener('click', function() {
        editProductModal.classList.add('hidden');
    });

    // Delete Product Modal
    const deleteProductButtons = document.querySelectorAll('.delete-product');
    const deleteProductModal = document.getElementById('delete-product-modal');
    const cancelDeleteProduct = document.getElementById('cancel-delete-product');

    deleteProductButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            document.getElementById('delete-product-id').value = productId;
            deleteProductModal.classList.remove('hidden');
        });
    });

    cancelDeleteProduct.addEventListener('click', function() {
        deleteProductModal.classList.add('hidden');
    });

    // Confirm Delete Button
    const confirmDeleteButton = document.querySelector('#delete-product-modal button.bg-red-600');
    confirmDeleteButton.addEventListener('click', function() {
        const productId = document.getElementById('delete-product-id').value;
        
        // In a real app, you would make an API call here to delete the product
        console.log(`Product with ID ${productId} deleted`);
        
        // Show success notification
        showNotification('Product deleted successfully');
        
        deleteProductModal.classList.add('hidden');
        
        // In a real app, you would reload the product list or remove the row from the table
        // For demo, we'll just log to console
    });

    // Submit Add Product Form
    const submitAddProductButton = document.querySelector('#add-product-modal button.bg-indigo-600');
    submitAddProductButton.addEventListener('click', function() {
        // In a real app, you would validate the form and submit data to an API
        console.log('New product added');
        
        // Show success notification
        showNotification('Product added successfully');
        
        addProductModal.classList.add('hidden');
        
        // Reset form
        document.getElementById('add-product-form').reset();
    });

    // Submit Edit Product Form
    const submitEditProductButton = document.querySelector('#edit-product-modal button.bg-indigo-600');
    submitEditProductButton.addEventListener('click', function() {
        const productId = document.getElementById('edit-product-id').value;
        
        // In a real app, you would validate the form and submit data to an API
        console.log(`Product with ID ${productId} updated`);
        
        // Show success notification
        showNotification('Product updated successfully');
        
        editProductModal.classList.add('hidden');
    });

    // Notification function
    function showNotification(message) {
        const notification = document.getElementById('success-notification');
        notification.querySelector('span').textContent = message;
        notification.classList.remove('hidden');
        
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    // Image upload handlers (placeholder functionality)
    document.querySelector('#add-product-modal button[type="button"]').addEventListener('click', function() {
        // In a real app, you would implement actual image upload functionality
        document.getElementById('product-image-preview').src = 'https://placehold.co/400';
        showNotification('Image upload functionality would be implemented here');
    });

    document.querySelector('#edit-product-modal button[type="button"]').addEventListener('click', function() {
        // In a real app, you would implement actual image upload functionality
        document.getElementById('edit-product-image-preview').src = 'https://placehold.co/400';
        showNotification('Image upload functionality would be implemented here');
    });
});
const uplode_product = async ()=>{
    const url = new URL(window.location.href);
    const api_url =url.origin;
    const productName = document.getElementById('product-name').value;
    const productDescription = document.getElementById('product-description').value;
    const sections_code = document.getElementById('section-code').value;
    const productBrand = document.getElementById('product-brand').value;
    const productPrice = document.getElementById('product-price').value;
    const productStatus = document.getElementById('product-status').value;

    // Here you would typically send this data to your server
 const fileInput = document.getElementById('product-image');
    const file = fileInput.files[0];
    const formData = new FormData();
   // formData.append('movieDescription',movieDescription);
    formData.append('name_product',productName) ;
    formData.append('description', productDescription);
    formData.append('sections_code', sections_code);
    formData.append('brand', productBrand);
    formData.append('price', productPrice);
    formData.append('products_Status', productStatus);
    if (file) {
        formData.append('image', file);
    } else {
        alert('Please select an image to upload.');
        return;
    }
    try {
        const response = await fetch(api_url+'/products', {
            method: 'POST',
            body: formData,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
    }
    show_all_products_and_edit();
}

    async function read_all_products() {
            const url = new URL(window.location.href);
    const api_url =url.origin;
    try {
        const response = await fetch(api_url+"/all_products", {
                method:"get",
                headers:{
                    'Content-Type':'application/json',
                }
            });
                const data= await response.json();
                return data;
    } catch (error) {
        console.error('Error sending data:', error);
    }
}
// onclick="show_all_products_and_edit()" 
show_all_products_and_edit = async () => {
      const url = new URL(window.location.href);
    const api_url =url.origin;
      await read_all_products().then((products) => {
        const productList = document.getElementById('edit-product-list');
        productList.innerHTML = ''; // Clear existing products
        products.forEach(product => {
            // if (product.products_Status === 'Active') {
                productList.innerHTML += `
                          <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10">
                                                <img src="${product.image_url}" alt="Smartphone product image with sleek design and metallic finish" class="h-10 w-10 rounded-md">
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">${product.name_product}</div>
                                                <div class="text-sm text-gray-500">#${product.products_code}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">${product.sections_name}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">${product.price} EGP</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                            -----
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                            ${product.products_Status}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium action-buttons">
                                        <button class="text-indigo-600 hover:text-indigo-900 mr-3 edit-product" data-id="1" onclick="editProduct(${product.id})">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="text-red-600 hover:text-red-900 delete-product" data-id="1" onclick="deleteProduct(${product.id})">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>`;
            // }
        });
        });

}
show_all_products_and_edit();