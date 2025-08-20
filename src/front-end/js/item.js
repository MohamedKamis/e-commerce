    // console.log(Math.floor( Date.now()));
    
     const url = new URL(window.location.href);
    const apis = url.searchParams.get('a') || 'err';
    console.log(apis);
    
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
        window.location.href = api_url;
    }
}
renderproducts = async () => {
    const url = new URL(window.location.href);
    const apis =Number(url.searchParams.get('a') || 3323222);
    const api_url =url.origin;
    const products = await read_all_products();
    for (const product of products) {
         if(product.sections_code == apis && product.products_Status == 'Active') {
             document.getElementById('page-title').innerHTML = product.sections_name;
             document.getElementById('section-link').href = api_url;
              document.getElementById('section-link').innerHTML = product.sections_name;
             document.getElementById('home-link').href = api_url;

        document.getElementById('product_list').innerHTML += `
             <div class="bg-white rounded-lg border border-gray-200 p-3 relative flex flex-col" style="min-width: 280px;max-height: 400px;">
      <button aria-label="Add to favorites" class="absolute top-3 right-3 bg-white rounded-md p-2 text-gray-800 hover:text-red-600">
       <i class="far fa-heart">
       </i>
      </button>

      <div class="relative rounded-lg overflow-hidden">
       <img alt="${product.description}" class="w-full h-auto object-cover rounded-lg" style="width:300px;"  loading="lazy" src="${product.image_url}" width="300"/>
       <!-- Bottom-left black icon -->
       <div aria-hidden="true" class="absolute bottom-3 left-3 bg-black bg-opacity-70 rounded-md p-1 text-yellow-400 text-lg">
        <i class="fas fa-adjust">
        </i>
       </div>
      </div>
      <h3 class="mt-3 font-bold text-sm leading-tight text-gray-900">
         ${product.name_product}
      </h3>
      <!-- Rating stars -->
      <div class="mt-1 flex space-x-1 justify-start rtl:space-x-reverse text-yellow-400 text-lg">
       <i class="far fa-star">
       </i>
       <i class="far fa-star">
       </i>
       <i class="far fa-star">
       </i>
       <i class="far fa-star">
       </i>
       <i class="far fa-star">
       </i>
      </div>
      <!-- Price -->
      <p class="mt-2 font-semibold text-base text-gray-900">
        ${product.price} EGP
       <span class="text-gray-500 mx-1">
        -
       </span>
        ${Math.floor(Number(product.price) + Number(10/100*product.price))} EGP
      </p>
      <!-- Button -->
      <button class="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-md py-2 flex items-center justify-center gap-2" type="button" onclick="posh_order(${product.products_code},${product.price})" >
       اضافه الي العربه
       <i class="fas fa-shopping-cart">
       </i>
      </button>
            <button class="mt-3 bg-yellow-300 hover:bg-yellow-500 text-gray-900 font-semibold rounded-md py-2 flex items-center justify-center gap-2" type="button" >
      <a href="${api_url}/item-profile?product=${product.products_code}" class="text-blue-500 hover:underline">  عرض التفاصيل  </a>
       <i class="fas fa-info-circle">
       </i>
      </button>
     </div>
     `
    };
     }
}

if(document.addEventListener('DOMContentLoaded', function () {
     const closeButton = document.getElementById('close-btn');
     const sidebar = document.getElementById('sidebar');
     const overlay = document.getElementById('overlay');
     closeButton.addEventListener('click', function () {
       sidebar.style.display = 'none';
       overlay.style.display = 'none';
     });
   })){
    //
   }
//اكمل من هنا عرض المنتجات و الاضافه
const show_order = async () => {
        const existingOrders = JSON.parse(localStorage.getItem('data_orders'));
        document.getElementById('cart-footer').innerHTML ='';

      for (const element of existingOrders) {
        document.getElementById('cart-footer').innerHTML +=`
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
    <div class="flex gap-3">
     <img alt="صورة منتج كشاف ليد 24 وات سقف مشرم 3 نكات سراج" class="w-14 h-14 rounded-md object-cover" height="60" src="https://storage.googleapis.com/a1aa/image/272a24ee-1a1f-4b58-1f9a-b24e14dc14c9.jpg" width="60"/>
     <div class="flex flex-col text-xs text-gray-800">
      <p class="font-semibold leading-tight">
       كشاف ليد 24 وات سقف مشرم 3 نكات سراج
      </p>
      <p class="text-[9px] text-gray-500 mt-0.5">
       النوع: Sirage
      </p>
      <p class="text-[10px] text-yellow-600 mt-1 font-semibold">
       395,00 EGP
      </p>
     </div>
     <button aria-label="حذف المنتج" class="text-gray-500 text-xs self-start" title="حذف المنتج">
      ×
     </button>
    </div>
   </div>`
      }
  
}
const posh_order = (id_prodect,price) => {
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
            quantity: 1
        };
        // Check if the order already exists
        existingOrders.push(orderData);
        localStorage.setItem('data_orders', JSON.stringify(existingOrders));
    }
renderproducts()