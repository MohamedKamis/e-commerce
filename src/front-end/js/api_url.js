    const url_users2 = new URL(window.location.href);
    const api_users2 =url_users2.origin;
const all_users= async() => {

            try {
                const response = await fetch(api_users2+"/all_users", {
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
  const  active_orders= async() => {

            try {
                const response = await fetch(api_users2+"/active_orders", {
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

show_users=async()=>{
    await active_orders().then((orders)=>{
        console.log(orders);
        
        document.getElementById('activeOrders').innerHTML=orders.length;
    })
     await all_users().then((users) => {
        const customerTable = document.getElementById('customer-table');
        document.getElementById('totalCustomers').innerHTML=users.length;
        console.log(users.length)
        customerTable.innerHTML = ''; // Clear existing products
       const totalRevenue= document.getElementById('totalRevenue');
       const activeOrders= document.getElementById('activeOrders');
       const totalBlockedCustomers= document.getElementById('totalBlockedCustomers');
        totalRevenue.innerHTML=''
        totalBlockedCustomers.innerHTML=''
        activeOrders.innerHTML=''
        let num=0
        let block=0
        let active=0
        users.forEach(user => {
            const { name, total_price_all_orders, history, phone_number,email , customer_id, status,order_status } = user;
            num +=Number(total_price_all_orders);
            status == 'block' ? block++ : block=block;
            order_status == true ? active++ : active=active;
            const dateObj  = new Date(`${history}`);
           const dateOnly = dateObj.toISOString().split('T')[0];
            // if (product.products_Status === 'Active') {
                customerTable.innerHTML += ` 
                 <tr class="customer-row hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${customer_id}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <img src="../imgs/user-icon.avif" alt="Profile picture of a young asian woman with black hair and business casual attire" class="w-8 h-8 rounded-full mr-2">
                                            <div>
                                                <div class="text-sm font-medium text-gray-900">${name}</div>
                                                <div class="text-sm text-gray-500">${dateOnly}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${email} <br>
                                     ${phone_number}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">EGP ${total_price_all_orders} </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold    ${status != "block"  ? ' rounded-full bg-green-100 text-green-800' : 'rounded-full bg-red-100 text-red-800'} ">
                                           ${status != "block" ? 'Active  <i class="fas fa-circle ml-1 text-blue-500 text-xs"></i> ' : 'Blocked  <i class="fas fa-circle ml-1 text-red-500 text-xs"></i> '} 
                                        </span>
                                        
                                        <span class="ml-2 px-2 inline-flex text-xs  font-semibold ${order_status === true ? ' leading-5  bg-blue-100 rounded-fulltext-blue-800' : 'bg-white-100'}   active-order">
                                            ${order_status === true ? 'Active Order  <i class="fas fa-circle ml-1 text-blue-500 text-xs"></i> ' : 'NO Active Order'} 
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onclick="unblockuser('${customer_id}')" class="text-indigo-600 hover:text-indigo-900 mr-3">
                                            <i class="fas fa-unlock"></i>
                                        </button>
                                        <button onclick="blockuser('${customer_id}')" class="text-gray-600 hover:text-gray-900 mr-3">
                                            <i class="fas fa-ban"></i>
                                        </button>
                                        <button onclick="deleteCustomer('${customer_id}')" class="text-red-600 hover:text-red-900">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                `
                        
        });
            totalRevenue.innerHTML+=num+'EGP';
            totalBlockedCustomers.innerHTML=block;
            activeOrders.innerHTML=active;


}
)}
const blockuser = async (id) => {
         try {
              const block_user = new URL(window.location.href);
            const api_block_user =block_user.origin;
                const  dataform={
                    customer_id:id
                }
                const response = await fetch(api_block_user+`/block_user`, {
                        method:"post",
                        body:JSON.stringify(dataform),
                        headers:{
                            'Content-Type':'application/json',
                        }
                })
                 show_users();
                alert("user is blocked")
                return ;
                            

    } catch (error) {
        console.log('Error uploading file:', error);
    }
} 
const unblockuser = async (id) => {
         try {
              const unblock_user = new URL(window.location.href);
            const api_unblock_user =unblock_user.origin;
                const  dataform={
                    customer_id:id
                }
                const response = await fetch(api_unblock_user+`/unblock_user`, {
                        method:"post",
                        body:JSON.stringify(dataform),
                        headers:{
                            'Content-Type':'application/json',
                        }
                })
                 show_users();
                alert("user is unblocked")
                return ;

    } catch (error) {
        console.log('Error uploading file:', error);
    }
} 