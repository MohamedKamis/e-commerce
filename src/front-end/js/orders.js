
    const url_orders = new URL(window.location.href);
    const api_orders =url_orders.origin;
 async function read_all_orders() {
            try {
                const response = await fetch(api_orders+"/all_orders", {
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
const show_order=async()=>{
    const selectedOrders = document.getElementById('filter-status-orders').value ;
    const orders= await read_all_orders()

    const pendingOrders = orders.filter(order => order.status === 'pending');
    const deliveredgOrders = orders.filter(order => order.status === 'delivered');
    const ProcessingOrders = orders.filter(order => order.status === 'processing');
    // const pendingOrders = allOrders.filter(order => order.status === 'pending');
    
     document.getElementById('total_pending').innerHTML = pendingOrders.length;
     document.getElementById('total_delivered').innerHTML = deliveredgOrders.length;
     document.getElementById('total_processing').innerHTML = ProcessingOrders.length;
    document.getElementById('total_orders').innerHTML=orders.length;

    const lest= document.getElementById('show_orders');
    lest.innerHTML='';
    // document.getElementById('show_orders').removeChild;
    
    orders.forEach(order => {

        if(selectedOrders == order.status){
            console.log(selectedOrders + order.status);
            //    const order_div = document.createElement('tr');
        // order_div.classList="hover:bg-gray-50 transition order-card";
        lest.innerHTML +=` 
            <tr class="hover:bg-gray-50 transition order-card">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${order.order_code}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <img src="../imgs/user-icon.avif" alt="Customer profile picture" class="h-10 w-10 rounded-full">
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">${order.name}</div>
                                            <div class="text-sm text-gray-500">${order.phone_number}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.created_at}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">EGP${order.total_price}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span ${order.status=='processing' ? 'class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"':'class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"'}>${order.status}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex justify-end space-x-2">
                                        <button class="text-indigo-600 hover:text-indigo-900 edit-order " data-order-id="${order.order_code}" onclick="edit_order(${order.order_code})">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="text-red-600 hover:text-red-900 delete-order " data-order-id="${order.order_code}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                                </tr> `
            // lest.appendChild(order_div);
    } else if(selectedOrders == 'all'){
         console.log(selectedOrders);
                      lest.innerHTML +=` 
            <tr class="hover:bg-gray-50 transition order-card">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${order.order_code}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <img src="../imgs/user-icon.avif" alt="Customer profile picture" class="h-10 w-10 rounded-full">
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">${order.name}</div>
                                            <div class="text-sm text-gray-500">${order.phone_number}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.created_at}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">EGP${order.total_price}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span ${order.status=='processing' ? 'class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"':'class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"'}>${order.status}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex justify-end space-x-2">
                                        <button class="text-indigo-600 hover:text-indigo-900 edit-order " data-order-id="${order.order_code}" onclick="edit_order(${order.order_code})">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="text-red-600 hover:text-red-900 delete-order " data-order-id="${order.order_code}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                                </tr> `
    }   
      })


    }
    const read_order=async(order_code)=>{
         // document.getElementById('home-link').href = api;
                    const dataform={
                    'order_code':order_code
                    }  
                try {
               const response =  await fetch(api_orders+"/show_order", {
                        method:"post",
                        body:JSON.stringify(dataform),
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
           
// export default
// document.getElementById('mobile-menu-button').addEventListener('click', function() {
//     document.querySelector('.sidebar_orders_orders').classList.toggle('active');
// });
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
        //    ('Network response was not ok');
        }
        const product = await response.json();
        console.log('Product details fetched:', product);
        return product;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}
const edit_order=async(order_code)=>{
      const order=( await read_order(order_code))

      document.getElementById('order-modal').classList.remove('hidden');
      document.getElementById('modal-order-id').textContent = order_code;
    //   document.getElementById('modal-order-code').textContent = '#' + order_code;payment-method
      document.getElementById('modal-order-status').innerHTML = order.status;
      document.getElementById('payment-method').innerHTML = order.payment_method;

      document.getElementById('modal-order-total').innerHTML = order.total_price;
      document.getElementById('modal-order-date').innerHTML = order.created_at;
    //   document.getElementById('modal-order-delivery').textContent = order.delivery_date;
    //   document.getElementById('modal-order-shipper').textContent = order.shipper_name;
      document.getElementById('modal-order-shipper-phone').innerHTML ='Phone: '+ order.phone_number;
      document.getElementById('address-info-country').innerHTML = 'country: '+order.country;
      document.getElementById('address-info-city').innerHTML = 'city: '+order.city;
      document.getElementById('address-info-region').innerHTML ='region: '+ order.region;
      document.getElementById('address-info-Street_address').innerHTML ='Street Address: '+ order.Street_address;
      document.getElementById('address-info-floor').innerHTML ='floor: '+ order.floor;
      document.getElementById('order-status').value='';

     const products=JSON.parse(order.data_order);

      document.getElementById('order-product-container').innerHTML =``;
      for (const element of products) {
         const name= await fetchProductDetails(element.product_id)
          document.getElementById('order-product-container').innerHTML +=`
                                <div class="flex">
                                    <div class="flex-shrink-0 h-20 w-20 border rounded-md overflow-hidden">
                                        <img src="${name.image_url}" alt="Product image - Wireless Bluetooth Headphones" class="h-full w-full object-cover">
                                    </div>
                                    <div class="ml-4">
                                        <h5 class="text-sm font-medium text-gray-900">${name.name_product}</h5>
                                        <p class="text-sm text-gray-500">Quantity: ${element.quantity}</p>
                                        <p class="text-sm font-medium text-gray-900">price: EGP ${name.price}</p>
                                        <p class="text-sm font-medium text-gray-900">color: ${element.color_name || 'الون الاصلي '}</p>
                                        <p class="text-sm font-medium text-gray-900">material: ${element.material}</p>
                                        <p class="text-sm font-medium text-gray-900">size: ${element.size || 'الحجم الاصلي '}</p>
                                    </div>
                                </div>
          `;
      }
      }

async function update_order_status() {

    try {
      const  order_code= document.getElementById('modal-order-id').textContent;
      const  order_status= document.getElementById('order-status').value;
       console.log(order_status);
       
        const dataform={
                    'order_code':order_code,
                    'order_status':order_status
                    }  
        const response = await fetch(`${api_orders}/update_order_status`, {
            method: 'post',
            body:JSON.stringify(dataform),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
         console.log('Network response was not ok');
        }
        const product = await response.json();
        document.getElementById('order-modal').classList.add('hidden');
        console.log('Product details fetched:', product);
        show_order();
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

async function notifyPendingOrdersFromAPI() {
  try {
    const allOrders = await read_all_orders();
    const pendingOrders = allOrders.filter(order => order.status === 'pending');
    const deliveredgOrders = allOrders.filter(order => order.status === 'delivered');
    const ProcessingOrders = allOrders.filter(order => order.status === 'processing');
    // const pendingOrders = allOrders.filter(order => order.status === 'pending');
    
     document.getElementById('total_pending').innerHTML = pendingOrders.length;
     document.getElementById('total_delivered').innerHTML = deliveredgOrders.length;
     document.getElementById('total_processing').innerHTML = ProcessingOrders.length;
    // const addToCartButton = document.getElementById('addToCartButton')
    const notificationContainer = document.getElementById('notification-container');
    // addToCartButton.addEventListener('click', function() {
    //     // Add shake animation to button
    //     this.classList.add('shake');
    //     setTimeout(() => {
    //         this.classList.remove('shake');
    //     }, 500);
    //     // Create notification
    //     createNotification();
    // });
        console.log('start orders test .....');
        if(pendingOrders.length !==0 ){
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-icon">✓</div>
                <div class="notification-title">Item Added to Order!</div>
            </div>
            <div class="notification-message">
                تمت اضافت المنتج الي العربه
                 اوردرارت جديده او معلقه: ${pendingOrders.length}
            </div>
        `;
        notificationContainer.appendChild(notification);
        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 1000);
        }, 5000);
    }
}
   catch (error) {
    console.error('Error notifying pending orders from API:', error);
  }
}
const close_order_modal = () => {
      document.getElementById('order-modal').classList.add('hidden');
}
show_order();
setInterval(notifyPendingOrdersFromAPI, 30000);
notifyPendingOrdersFromAPI();