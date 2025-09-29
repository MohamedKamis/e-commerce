const url = new URL(window.location.href);
const api_url = url.origin;
async function fetchProductDetails(productCode) {
    try {
      const url1 = new URL(window.location.href);
      const api_url2 = url1.origin;
        const response = await fetch(`${api_url2}/product?product=${productCode}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            console.log('Network response was not ok');
        }
        const product = await response.json();
        console.log('Product details fetched:', product);
        return product;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}
const order=async (dataform)=> {
   try {
       const response = await fetch(api_url+"/orders", {
                        method:"post",
                        body:JSON.stringify(dataform),
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const orders = await response.json();
        console.log('Product details fetched:', orders);
        return orders;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

const show_order = async () => {
    const existingOrders = JSON.parse(localStorage.getItem('data_orders'));
    console.log('existingOrders:', existingOrders);
    
    if (!existingOrders || existingOrders.length === 0) {
        document.getElementById('cart-footer').innerHTML = '<p class="text-center text-gray-500">لا توجد طلبات حالية.</p>';
        return;
    }
    
    document.getElementById('cart-footer').innerHTML = '';
    existingOrders.forEach(async (element) => {
    const products = await fetchProductDetails(element.product_id)
    
    // if (!products) {
    //      JSON.parse(localStorage.getItem('data_orders')) || [];
    //     localStorage.setItem('data_orders', []);
    //     return;
    // }
        document.getElementById('cart-footer').innerHTML += `
      <div data-price="${element.price}" class="product-item" data-product-id="${products.products_code}">
      <div class="flex items-center border-b border-gray-300 pb-3 mb-3">
       <img alt="شعار نظام إضاءة صفا" class="w-[50px] h-[50px] object-cover rounded-sm ml-3" height="50" src="${products.image_url}" width="50"/>
       <div class="flex-1 text-[14px]">
        <p>
         ${products.name_product}
        </p>
        <p class="text-[12px] text-gray-600">
         البائع: ${products.brand}
        </p>
        <p class="text-[12px] text-gray-600">
         الون: ${element.color_name  || 'الون الاصلي' }
        </p>
         <p class="text-[12px] text-gray-600">
         الخامه : ${element.material  || ' الخامه الخاصة'  }
        </p>
        <p class="text-[12px] text-gray-600">
         الحجم : ${element.size  || ' الحجم الخاصة'  }
        </p>
       </div>
       <div class="flex items-center border border-gray-300 rounded text-[14px] w-[90px] h-[30px] ml-3">
        <button class="w-8 h-full border-r border-gray-300 plus-btn " code="${products.products_code}" type="button"" >
         +
        </button>
        <input class="w-10 text-center border-none focus:outline-none quantity-input" min="${element.quantity}" type="number" value="${element.quantity}"/>
     
        <button class="w-8 h-full border-l border-gray-300 minus-btn"  code="${products.products_code}" type="button"  >
         -
        </button>

       </div>
       <button ocnclick="removeProductFromCart('${products.products_code}');" class="text-[14px] font-semibold text-gray-700 ml-3 remove-btn" type="button" >
        ×
       </button>
       <span class="text-[12px] text-gray-500 product-total">
        ${element.price},00 EGP
       </span>
      </div>
     </div>
    `});
    
  } 
  const plus = (productId) => {
    // Retrieve existing orders from localStorage
    console.log(productId);
    
    let existingOrders = JSON.parse(localStorage.getItem('data_orders')) || [];
    // Check if the product already exists in the orders
    const existingOrderIndex = existingOrders.findIndex(order => order.product_id === productId);
    if (existingOrderIndex !== -1) {
        // If the product exists, increment the quantity
        console.log(existingOrders[existingOrderIndex].quantity);
        existingOrders[existingOrderIndex].quantity += 1;
    } else {
        // If the product does not exist, add a new order with quantity 1
        existingOrders.push({
            product_id: productId,
            quantity: 1
        });
    }
    // Update localStorage with the modified orders
    localStorage.setItem('data_orders', JSON.stringify(existingOrders));
};
const minus = (productId) => {
    // Retrieve existing orders from localStorage
    let existingOrders = JSON.parse(localStorage.getItem('data_orders')) || [];
    // Check if the product exists in the orders
    const existingOrderIndex = existingOrders.findIndex(order => order.product_id === productId);
    if (existingOrderIndex !== -1) {
        // If the product exists, decrement the quantity
        existingOrders[existingOrderIndex].quantity -= 1;
        // If the quantity is zero, remove the order from the array
        if (existingOrders[existingOrderIndex].quantity <= 0) {
            existingOrders.splice(existingOrderIndex, 1);
        }
    }
    // Update localStorage with the modified orders
    localStorage.setItem('data_orders', JSON.stringify(existingOrders));
};

show_order();
 document.getElementById("place_order").addEventListener("click",async () => {
    document.getElementById('Loading-icone').style.display='inline-block';
    const existingOrders = JSON.parse(localStorage.getItem('data_orders')) || [];
    const data_order = JSON.stringify(existingOrders);
    // const data_order = 
    console.log(data_order);
    
    const user_id = JSON.parse(localStorage.getItem('user_id'));
    const street_address =document.getElementById('streetAddress').value;
    const floor =document.getElementById('apartment').value;
    const city =document.getElementById('city').value;
    const region =document.getElementById('region').value;
    const phone_number =document.getElementById('phone').value;
    const payment_method =document.getElementById('payment_method').value;
    const priceString =document.getElementById('finalTotal').textContent;
    const user_name =document.getElementById('user_name').value;

    const numberPart = priceString.replace(/[^\d.,]/g, '').trim();

    const normalizedNumber = numberPart.replace(/\./g, '').replace(',');

const total_price = parseFloat(normalizedNumber);
    console.log(total_price);

     const dataform={
                        'user_name':user_name,'user_id':user_id,'data_order':data_order,'payment_method':payment_method,'total_price':total_price,street_address:street_address, floor:floor, city:city, region:region,phone_number:phone_number
                        }  
    document.getElementById('Loading-icone').style.display='inline-block';

      await order(dataform).then(order_code => {
     console.log('Order placed:', order_code);
    localStorage.setItem('order_code', JSON.stringify(order_code))
    document.getElementById('Loading-icone').style.display='none';
    document.getElementById('order_code').innerHTML= order_code.order_code;
    document.getElementById('order_processed').style.display='inline-block';
    JSON.parse(localStorage.removeItem('data_orders')) ;
    // setTimeout(() => {
    // document.getElementById('order_processed').style.display='none';
    // }, 30000);
     });

   } );
const removeProductFromCart = (productId) => {

    let existingOrders = JSON.parse(localStorage.getItem('data_orders')) || [];
    existingOrders = existingOrders.filter(order => order.product_id !== productId);
    localStorage.setItem('data_orders', JSON.stringify(existingOrders));
    // show_order(); // Refresh the order display
};

   // Format number to Arabic style with comma as decimal separator and dot as thousand separator
   function formatNumber(num) {
     // Convert to fixed 2 decimals
     let parts = num.toFixed(2).split(".");
     // Add thousand separator (dot)
     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
     // Join with comma as decimal separator
     return parts.join(",");
   }

  //  function updateTotals() {
  //    const productItems = document.querySelectorAll(".product-item");
  //    let subtotal = 0;
  //    productItems.forEach(item => {
  //      const price = parseFloat(item.getAttribute("data-price"));
  //      const quantityInput = item.querySelector(".quantity-input");
  //      const productId = parseFloat(item.getAttribute("data-product-id"));
  //      let quantity = Number(parseInt(quantityInput.value));
  //       let existingOrders = JSON.parse(localStorage.getItem('data_orders')) || [];
  //   // Check if the product already exists in the orders
  //   const existingOrderIndex = existingOrders.findIndex(order => order.product_id == productId);
  //       // console.log(order.product_id);
  //   console.log(existingOrderIndex);
  //        existingOrders[existingOrderIndex].quantity = quantity;
  //       localStorage.setItem('data_orders', JSON.stringify(existingOrders));
       
  //      if (quantity < 1 || isNaN(quantity)) {
  //        quantity = 1;
    
  //   if (existingOrderIndex !== -1) {
  //       // If the product exists, increment the quantity
  //       console.log(existingOrders[existingOrderIndex].quantity);
  //       existingOrders[existingOrderIndex].quantity += 1;
  //   } else {
  //       // If the product does not exist, add a new order with quantity 1
  //       existingOrders.push({
  //           product_id: productId,
  //           quantity: 1
  //       });
  //   }
  //   // Update localStorage with the modified orders
  //        quantityInput.value = 1;
  //      }
  //      const totalPrice = price * quantity;
  //      subtotal += totalPrice;
  //      // Update product total text
  //      const productTotalSpan = item.querySelector(".product-total");
  //      productTotalSpan.textContent = formatNumber(totalPrice) + " EGP";
  //    });
  //    // Update subtotal
  //    const subtotalEl = document.getElementById("subtotal");
  //    subtotalEl.textContent = formatNumber(subtotal) + " EGP";

  //    // Get selected shipping cost
  //    const shippingRadio = document.querySelector('input[name="shipping"]:checked');
  //    const shippingCost = shippingRadio ? parseFloat(shippingRadio.value) : 0;

  //    // Update final total
  //    const finalTotalEl = document.getElementById("finalTotal");
  //    finalTotalEl.textContent = formatNumber(subtotal + shippingCost) + " EGP";
  //  }

   // Event delegation for plus and minus buttons
   

   document.getElementById("orderSection").addEventListener("click", function(e) {
    // setTimeout(() => {
    //   //  updateTotals();
    //   // }, 1000);
      // Check if the clicked element is a plus or minus button

     if (e.target.classList.contains("plus-btn") || e.target.classList.contains("minus-btn")) {
       const productItem = e.target.closest(".product-item");
       const quantityInput = productItem.querySelector(".quantity-input");
       let currentVal = parseInt(quantityInput.value);
       if (isNaN(currentVal)) currentVal = 1;
       if (e.target.classList.contains("plus-btn")) {

         quantityInput.value = currentVal + 1;

       } else {
         if (currentVal > 1) {
           quantityInput.value = currentVal - 1;
         }
       }
       updateTotals();
     }
     if (e.target.classList.contains("remove-btn")) {

         const productItem = e.target.closest(".product-item");
    const productId = productItem.dataset.productId; // Assuming product ID is stored in a data attribute
    removeProductFromCart(productId);
    productItem.remove();
    updateTotals();
     }
   });

   // Update totals when quantity input changes manually
   document.querySelectorAll(".quantity-input").forEach(input => {
     input.addEventListener("change", () => {
       if (input.value < 1 || isNaN(input.value)) {
         input.value = 1;
       }
       updateTotals();
     });
   });

   // Update totals when shipping option changes
   document.querySelectorAll('input[name="shipping"]').forEach(radio => {
     radio.addEventListener("change", () => {
       updateTotals();
     });
   });
function updateTotals() {
  const productItems = document.querySelectorAll(".product-item");
  let subtotal = 0;
  productItems.forEach(item => {
    const price = parseFloat(item.getAttribute("data-price"));
    const quantityInput = item.querySelector(".quantity-input");
    const productId = parseFloat(item.getAttribute("data-product-id"));
    let quantity = Number(parseInt(quantityInput.value));
    let existingOrders = JSON.parse(localStorage.getItem('data_orders')) || [];

    // Check if the product already exists in the orders
    const existingOrderIndex = existingOrders.findIndex(order => order.product_id == productId);
    console.log(existingOrderIndex);

    if (existingOrderIndex !== -1) {
      existingOrders[existingOrderIndex].quantity = quantity;
    } else {
      // If product not found, add it with current quantity
      existingOrders.push({
        product_id: productId,
        quantity: quantity < 1 || isNaN(quantity) ? 1 : quantity
      });
    }

    localStorage.setItem('data_orders', JSON.stringify(existingOrders));

    if (quantity < 1 || isNaN(quantity)) {
      quantity = 1;
      quantityInput.value = 1;
    }

    const totalPrice = price * quantity;
    subtotal += totalPrice;

    // Update product total text
    const productTotalSpan = item.querySelector(".product-total");
    productTotalSpan.textContent = formatNumber(totalPrice) + " EGP";
  });

  // Update subtotal
  const subtotalEl = document.getElementById("subtotal");
  subtotalEl.textContent = formatNumber(subtotal) + " EGP";

  // Get selected shipping cost
  const shippingRadio = document.querySelector('input[name="shipping"]:checked');
  const shippingCost = shippingRadio ? parseFloat(shippingRadio.value) : 0;

  // Update final total
  const finalTotalEl = document.getElementById("finalTotal");
  finalTotalEl.textContent = formatNumber(subtotal + shippingCost) + " EGP";
}
function formatNumber(num) {
  return num.toFixed(2);
}

// Run once immediately on page load
updateTotals();

// Optional: Add event listeners to update totals dynamically
document.querySelectorAll('.quantity-input').forEach(input => {
  input.addEventListener('input', updateTotals);
});

document.querySelectorAll('input[name="shipping"]').forEach(radio => {
  radio.addEventListener('change', updateTotals);
});

//------------------------------------------------------
  function parsePrice(priceStr) {
    // Remove all except digits, dots, commas
    const numberPart = priceStr.replace(/[^\d.,]/g, '').trim();
    // Remove thousand separators (dots), replace decimal comma with dot
    const normalized = numberPart.replace(/\./g, '').replace(',', '.');
    return parseFloat(normalized) || 0;
}
// Function to format a number back to "x.xxx,00 EGP" style
function formatPrice(num) {
    // Convert number to fixed 2 decimals string with dot decimal separator
    let parts = num.toFixed(2).split('.');
    // Add thousand separators (dots) to integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    // Join integer and decimal parts with comma
    return parts.join(',') + ' EGP';
}
// Read all price elements
const priceElements = document.querySelectorAll('.product-total');
let total = 0;
priceElements.forEach(el => {
    const priceText = el.textContent || '';
    total += parsePrice(priceText);
});
// Set the total price text content
const subtotalEl = document.getElementById('subtotal');
if (subtotalEl) {
    subtotalEl.textContent = formatPrice(total);
}