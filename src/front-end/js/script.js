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
    const categories = await read_all_category(api);
    categories.forEach(category => {
         document.getElementById('lest_category').innerHTML +=`
                <a href="category?a=${category.id}">
                <button class="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-200" data-slide="1" type="button">
                  <i class="fas fa-bolt text-base text-gray-400">
                  </i>
                  ${category.name_categorie}
                </button>
                </a>
            `
          document.getElementById('shopping_categories').innerHTML +=`
          <div class="flex-shrink-0 relative w-24 h-24 rounded-full border border-[#c9a52b] bg-[#c9a52b] shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] flex items-center justify-center">
             <a href="category?a=${category.id}"> <img alt="" class="w-20 h-20 rounded-full object-contain" height="80" src="${category.image_url}" width="80"/>
                <span class="absolute bottom-3 right-1 text-white text-sm font-semibold select-none">
                 ${category.name_categorie}
                </span>
               </a>
          </div>
          `
          })
          }
   document.addEventListener('DOMContentLoaded', function () {
     const closeButton = document.getElementById('close-btn');
     const sidebar = document.getElementById('sidebar');
     const overlay = document.getElementById('overlay');
     closeButton.addEventListener('click', function () {
       sidebar.style.display = 'none';
       overlay.style.display = 'none';
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
renderCategories()

  