const url = new URL(window.location.href);
const api_url = url.origin;
async function fetchProductDetails(productCode) {
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
const removeProductFromCart = (productId) => {
  console.log("productId");
  
    let existingOrders = JSON.parse(localStorage.getItem('data_orders')) || [];
    existingOrders = existingOrders.filter(order => order.product_id !== productId);
    localStorage.setItem('data_orders', JSON.stringify(existingOrders));
    // show_order(); // Refresh the order display
};
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
      <div data-price="${products.price}" class="product-item" data-product-id="${products.products_code}">
      <div class="flex items-center border-b border-gray-300 pb-3 mb-3">
       <img alt="شعار نظام إضاءة صفا" class="w-[50px] h-[50px] object-cover rounded-sm ml-3" height="50" src="${products.image_url}" width="50"/>
       <div class="flex-1 text-[12px]">
        <p>
         ${products.name_product}
        </p>
        <p class="text-[10px] text-gray-600">
         البائع: ${products.brand}
        </p>
       </div>
       <div class="flex items-center border border-gray-300 rounded text-[14px] w-[90px] h-[30px] ml-3">
        <button class="w-8 h-full border-r border-gray-300 plus-btn" type="button">
         +
        </button>
        <input class="w-10 text-center border-none focus:outline-none quantity-input" min="1" type="number" value="${element.quantity}"/>
        <button class="w-8 h-full border-l border-gray-300 minus-btn" type="button">
         -
        </button>
       </div>
       <button ocnclick="removeProductFromCart('${products.products_code}');" class="text-[14px] font-semibold text-gray-700 ml-3 remove-btn" type="button" >
        ×
       </button>
       <span class="text-[12px] text-gray-500 product-total">
        ${products.price},00 EGP
       </span>
      </div>
     </div>
    `});
    
  } 
show_order();
 document.getElementById("place_order").addEventListener("click",async () => {
    const data_order = JSON.parse(localStorage.getItem('data_orders'));
    const user_id = JSON.parse(localStorage.getItem('user_id'));
    const street_address =document.getElementById('streetAddress').value;
    const floor =document.getElementById('apartment').value;
    const city =document.getElementById('city').value;
    const region =document.getElementById('region').value;
    const phone_number =document.getElementById('phone').value;
    const priceString =document.getElementById('subtotal').textContent;
    const total_price = priceString.match(/[\d.]+/)[0];
    console.log(total_price);

     const dataform={
                        'user_id':user_id,'data_order':data_order,'total_price':total_price,street_address:street_address, floor:floor, city:city, region:region,phone_number:phone_number
                        }  
     const order_code=await order(dataform);
     localStorage.setItem('order_code', JSON.stringify(order_code))
    document.getElementById('order_processed').style.display='inline-block';
    document.getElementById('order_code').innerHTML='#'+ order_code;
    setTimeout(() => {
    document.getElementById('order_processed').style.display='none';
    }, 30000);
   } );


   // Format number to Arabic style with comma as decimal separator and dot as thousand separator
   function formatNumber(num) {
     // Convert to fixed 2 decimals
     let parts = num.toFixed(2).split(".");
     // Add thousand separator (dot)
     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
     // Join with comma as decimal separator
     return parts.join(",");
   }

   function updateTotals() {
     const productItems = document.querySelectorAll(".product-item");
     let subtotal = 0;
     productItems.forEach(item => {
       const price = parseFloat(item.getAttribute("data-price"));
       const quantityInput = item.querySelector(".quantity-input");
       let quantity = parseInt(quantityInput.value);
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

   // Event delegation for plus and minus buttons
   
  updateTotals();
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

   // Initial totals update on page load
   updateTotals();
