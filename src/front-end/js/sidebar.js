
async function read_all_category(endpoint) {
      try {
          const response = await fetch(endpoint+"/all", {
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
  async function renderCategories() {
        const url = new URL(window.location.href);
        const api = url.origin;
    const categories = await read_all_category(api);
    categories.forEach(category => {
         document.getElementById('lest_category').innerHTML +=`
                <a href="${api}/category?a=${category.id}">
                <button class="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-200" data-slide="1" type="button">
                  <i class="fas fa-bolt text-base text-gray-400">
                  </i>
                  ${category.name_categorie}
                </button>
                </a>
            `
           
            if( document.getElementById('shopping_categories')){
            document.getElementById('shopping_categories').innerHTML +=`
          <div class="flex-shrink-0 relative w-25 h-25 rounded-full border border-[#c9a52b] bg-[#c9a52b] shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] flex items-center justify-center">
             <a href="category?a=${category.id}"> <img alt="" class="w-20 h-20 rounded-full object-contain" height="80" src="${category.image_url}" width="80"/>
                <span class="absolute bottom-3 right-1 text-white text-sm font-semibold select-none">
                 ${category.name_categorie}
                </span>
               </a>
          </div>
          `}
          })
          }
renderCategories()

async function fetchProductDetails(productCode) {
    try {
        const url = new URL(window.location.href);
        const api_url = url.origin;
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
// function updateTotals() {
//      const productItems = document.querySelectorAll("text-[10px] text-yellow-600 mt-1 font-semibold");
//      let subtotal = 0;
//      productItems.forEach(item => {
//        const price = parseFloat(item.getAttribute("data-price"));
//        const quantityInput = item.querySelector(".quantity-input");
//        let quantity = parseInt(quantityInput.value);
//        if (quantity < 1 || isNaN(quantity)) {
//          quantity = 1;
//          quantityInput.value = 1;
//        }
//        const totalPrice = price * quantity;
//        subtotal += totalPrice;
//        // Update product total text
//        const productTotalSpan = item.querySelector("text-[10px] text-yellow-600 mt-1 font-semibold");
//        productTotalSpan.textContent = formatNumber(totalPrice) + " EGP";
//      });
// }

const show_cart_footer = async () => {
    document.getElementById('total-price').innerHTML =0;
    const existingOrders = JSON.parse(localStorage.getItem('data_orders'));
    // console.log('existingOrders:', existingOrders);
    
    if (!existingOrders || existingOrders.length === 0) {
        document.getElementById('order-detils').innerHTML = '<p class="text-center text-gray-500">لا توجد طلبات حالية.</p>';
        return;
    }
    
    document.getElementById('order-detils').innerHTML = '';
    existingOrders.forEach(async (element) => {

    // 
    const products = await fetchProductDetails(element.product_id)
    console.log(products);
    let total_price1=Number( document.getElementById('total-price').textContent);
    let total_price2 = total_price1 + Number(products.price);
    // total_price = total_price2.toFixed(2);
    document.getElementById('total-price').innerHTML = total_price2 * Number(element.quantity);     
        document.getElementById('order-detils').innerHTML += `
           <div class="flex gap-3">
        <img alt="صورة منتج كشاف ليد 24 وات سقف مشرم 3 نكات سراج" class="w-14 h-14 rounded-md object-cover" height="60" src="${products.image_url}" width="60"/>
        <div class="flex flex-col text-xs text-gray-800">
          <p class="font-semibold leading-tight">
            ${products.name_product}
          </p>
          <p class="text-[9px] text-gray-500 mt-0.5">
          النوع: ${products.brand}
          </p>
          <p class="text-[9px] text-gray-500 mt-0.5">
          الكميه: ${element.quantity}
          </p>
            <p class="text-[9px] text-gray-500 mt-0.5">
          الون: ${element.color_name ? element.color_name : 'الون الاصلي'}
          </p>
          <p class="text-[10px] text-yellow-600 mt-1 font-semibold">
          ${Number(element.price) * Number(element.quantity)}
          </p>
        </div>
        <button aria-label="حذف المنتج" class="text-gray-500 text-xs self-start" title="حذف المنتج" ocnclick="removeFromCart(${element.id})">
          ×
        </button>
        </div>
        <br>
     
    `
});
// document.getElementById('total-price').innerHTML += 'EGP';
  } 
  const show_sidebar=() => {
    document.getElementById('sidebar').style.display = 'flex';
    // document.getElementById('overlay').style.display = 'flex';
   }
   document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
   //  const overlay = document.getElementById('overlay');
    closeButton.addEventListener('click', function () {
      sidebar.style.display = 'none';
     //  overlay.style.display = 'none';
    });
  });
  if(document.getElementById('add-to-cart-button')){
  document.addEventListener('DOMContentLoaded', function() {
    const addToCartButton = document.getElementById('add-to-cart-button');
    const notificationContainer = document.getElementById('notification-container');
    let notificationCount = 0;
    addToCartButton.addEventListener('click', function() {
        // Add shake animation to button
        this.classList.add('shake');
        setTimeout(() => {
            this.classList.remove('shake');
        }, 500);
        // Create notification
        createNotification();
    });
    function createNotification() {
        notificationCount++;
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-icon">✓</div>
                <div class="notification-title">Item Added to Order!</div>
            </div>
            <div class="notification-message">
                تمت اضافت المنتج الي العربه
                 اجمالي عدد المنتجات المضافه الان: ${notificationCount}
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
            }, 400);
        }, 4000);
    }
    // Add keyboard accessibility
    addToCartButton.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});
}

const removeProductFromCart2 = (productId) => {

    let existingOrders = JSON.parse(localStorage.getItem('data_orders')) || [];
    existingOrders = existingOrders.filter(order => order.product_id !== productId);
    localStorage.setItem('data_orders', JSON.stringify(existingOrders));
    // show_order(); // Refresh the order display
};