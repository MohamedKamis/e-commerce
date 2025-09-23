    const url = new URL(window.location.href);
    const api = url.origin;

    const scrollContainer = document.getElementById("main-section");
    const scrollLeftBtn = document.getElementById("right-button");
    const scrollRightBtn = document.getElementById("left-button");

    // Scroll amount per click (adjust as needed)
    const scrollAmount = 120;

    scrollLeftBtn.addEventListener("click", () => {
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    scrollRightBtn.addEventListener("click", () => {
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });
    const navLinks = document.querySelectorAll('.sidebar nav a');
    const pageTitle = document.getElementById('pageTitle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('bg-indigo-800'));
            link.classList.add('bg-indigo-800');
            pageTitle.textContent = link.querySelector('span').textContent;
        });
    });


  
 
   const order_car=() => {
    const order = document.getElementById('order');
    if (order.style.display === 'none' || order.style.display === '') {
        order.style.display = 'block';
    } else {
        order.style.display = 'none';
    }
   }
   async function rendome_prodect() {
    const url = new URL(window.location.href);
    const api = url.origin;
    try {
        const response = await fetch(api+"/getRandomProducts", {
                method:"get",
                headers:{
                    'Content-Type':'application/json',
                }
            });
            document.getElementById('rendome_prodect').innerHTML=''
                const data= await response.json();
                console.log(data);
                for (const product of data) {
                  const prices = JSON.parse(product.price)

                  const firstPrice = ( Object.values(prices)[0]);
                  console.log(firstPrice);
                  
                  const prices2 = JSON.stringify(firstPrice).split('-')[0].replace(/[^\d.,]/g, '').trim()
            document.getElementById('rendome_prodect').innerHTML+=`
             <div class="bg-white rounded-lg border border-gray-200 p-3 relative flex flex-col" style="min-width: 280px;max-height: 400px;">
      <button aria-label="Add to favorites" class="absolute top-3 right-3 bg-white rounded-md p-2 text-gray-800 hover:text-red-600">
       <i class="far fa-heart">
       </i>
      </button>

      <div class="relative rounded-lg overflow-hidden">
       <img alt="${product.description}" class="w-full h-auto object-cover rounded-lg" style="width:300px;"  loading="lazy" src="${product.image_url}" width="300"/>
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
       EGP ${prices2}
       <span class="text-gray-500 mx-1">
       </span>
      <span class="text-gray-500">
       <i class="fas fa-tag">
       </i>
          <span class="text-lg text-red-600 font-semibold line-through" >
          ${Math.floor(Number(prices2) + Number(20/100*prices2))} EGP
          </span>
        </span>
      </p>
      <!-- Button -->

       </i>
      </button>
            <button class="mt-3 bg-yellow-300 hover:bg-yellow-500 text-gray-900 font-semibold rounded-md py-2 flex items-center justify-center gap-2" type="button" >
      <a href="${api}/item-profile?product=${product.products_code}" class="text-blue-500 hover:underline">  عرض التفاصيل  </a>
       <i class="fas fa-info-circle">
       </i>
      </button>
     </div>
     `
                }
    } catch (error) {
        console.error('Error sending data:', error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const shopIcon = document.getElementById('shoping_icone');
    function toggleIconOnScroll() {
      if (window.scrollY > 50) {
        shopIcon.classList.remove('hidden');
      } else {
        shopIcon.classList.add('hidden');
      }
    }
    window.addEventListener('scroll', toggleIconOnScroll);
    // Initial check in case page is already scrolled
    toggleIconOnScroll();
    // Optional: click handler
    shopIcon.addEventListener('click', () => {
      // For example, scroll to top or open cart
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
rendome_prodect()

  