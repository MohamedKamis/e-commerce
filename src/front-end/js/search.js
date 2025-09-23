const url_search = new URL(window.location.href);
const api_search =url_search.origin;
const search_orders= async ()=>{
    const search= document.getElementById('search-orders').value;
    console.log(search);
         const dataform={
                    'search':search
                    }  
                try {
               const response =  await fetch(api_search+"/search_orders", {
                        method:"post",
                        body:JSON.stringify(dataform),
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });
                    const lest= document.getElementById('show_orders');
                    lest.innerHTML='';
                    const orders = await response.json()
                    console.log(orders);
                    
                     orders.forEach(order => {
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
      })
            } catch (error) {
                console.error('Error sending data:', error);
            }
}

const search_product= async ()=>{
    const search= document.getElementById('search-product').value;
    console.log(search);
         const dataform={
                    'search':search
                    }  
                try {
               const response =  await fetch(api_search+"/search_product", {
                        method:"post",
                        body:JSON.stringify(dataform),
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });

                    const orders = await response.json()
                    const item=orders[0].sections_code
                    window.location.href = api_search + `/category/items?a=${item}`;
                    console.log(orders);
                    return;
                }
            catch (error) {
                console.error('Error sending data:', error);
            }
}