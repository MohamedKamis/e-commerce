
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
    const orders= await read_all_orders()
    console.log('orders:', orders);
    document.getElementById('show_orders').innerHTML = "";
    orders.forEach(order => {
          document.getElementById('show_orders').innerHTML +=`
                            <tr class="hover:bg-gray-50 transition order-card">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${order.order_code}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <img src="https://img.freepik.com/premium-vector/user-icon-icon_1076610-59410.jpg?w=360" alt="Customer profile picture" class="h-10 w-10 rounded-full">
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
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full status-pending">${order.status}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex justify-end space-x-2">
                                        <button class="text-indigo-600 hover:text-indigo-900 edit-order" data-order-id="${order.order_code}">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="text-red-600 hover:text-red-900 delete-order" data-order-id="${order.order_code}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>`

      })
    }
    show_order();