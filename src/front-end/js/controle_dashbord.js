const url1 = new URL(window.location.href);
const api_url1 = url1.origin;

const changeborder = (element) => {
    if (document.getElementById('users')) {
        document.getElementById('users').style.display = 'none';
        document.getElementById('users_id').style.background = '#ffffff00';
        document.getElementById('users_id').style.background = '#ffffff00';
        
    }
    if (document.getElementById('category')) {
        document.getElementById('category').style.display = 'none';
         document.getElementById('category_id').style.background = '#ffffff00';
    }
    if (document.getElementById('products')) {
        document.getElementById('products').style.display = 'none';
         document.getElementById('products_id').style.background = '#ffffff00';
    }
     if (document.getElementById('color-management')) {
        document.getElementById('color-management').style.display = 'none';
         document.getElementById('color-management_id').style.background = '#ffffff00';
    }
        if (document.getElementById('orders')) {
        document.getElementById('orders').style.display = 'none';
         document.getElementById('orders_id').style.background = '#ffffff00';
    }

    if (document.getElementById('analytics')) {
        document.getElementById('analytics').style.display = 'none';
         document.getElementById('analytics').style.background = '#ffffff00';
    }
    document.getElementById(element).style.display = 'inline-block';
    document.getElementById(element+'_id').style.background = 'white';
     url1.searchParams.set('a',`${element}`);
    console.log(url1.searchParams.get('a'));

}   

document.getElementById('add-material').addEventListener('click', function () {
  const materialInput = document.getElementById('product-material');
  const materialValue = materialInput.value.trim();
  if (!materialValue) {
    alert('Please enter a material before adding.');
    return;
  }
  const all_price = document.getElementById('all-price');
  // Create a sanitized id/name for the input based on materialValue
  const sanitizedMaterial = materialValue.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  // Append new price input with unique id and name
  all_price.innerHTML += `
    <label for="product-price-${sanitizedMaterial}" class="block text-sm font-medium text-gray-700">
      Price - ${materialValue}
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="text-gray-500 sm:text-sm">$</span>
      </div>
      <input type="text" name="product-price-${sanitizedMaterial}" id="product-price-${sanitizedMaterial}" style="border: solid 1px #a3a1a1;" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00">
    </div>`;
  materialInput.value = '';
});
// changeborder('products');
