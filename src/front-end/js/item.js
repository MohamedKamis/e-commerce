
    //  const url = new URL(window.location.href);
    // const apis = url.searchParams.get('a') || 'err';
    console.log(apis);
    
//   async function read_all_products() {
//       const url = new URL(window.location.href);
//     const api_url =url.origin;
//     try {
//         const response = await fetch(api_url+"/all_products", {
//                 method:"get",
//                 headers:{
//                     'Content-Type':'application/json',
//                 }
//             });
//                 const data= await response.json();
//                 return data;
//     } catch (error) {
//         console.error('Error sending data:', error);
//     }
// }
// renderproducts = async () => {
//     const url = new URL(window.location.href);
//     const apis = url.searchParams.get('a') || 'err';

//     const products = await read_all_products();
//     for (const element of products) {
//          if(element.section_name == apis){
//              document.getElementById('page-title').innerHTML = apis;
//         document.getElementById('product_list').innerHTML += `
//              <div class="bg-white rounded-lg border border-gray-200 p-3 relative flex flex-col" style="min-width: 280px">
//       <button aria-label="Add to favorites" class="absolute top-3 right-3 bg-white rounded-md p-2 text-gray-800 hover:text-red-600">
//        <i class="far fa-heart">
//        </i>
//       </button>

//       <div class="relative rounded-lg overflow-hidden">
//        <img alt="${product.description}" class="w-full h-auto object-cover rounded-lg" height="300" loading="lazy" src="../uploads/${product.image_url}" width="300"/>
//        <!-- Bottom-left black icon -->
//        <div aria-hidden="true" class="absolute bottom-3 left-3 bg-black bg-opacity-70 rounded-md p-1 text-yellow-400 text-lg">
//         <i class="fas fa-adjust">
//         </i>
//        </div>
//       </div>
//       <h3 class="mt-3 font-bold text-sm leading-tight text-gray-900">
//          ${product.name_product}
//       </h3>
//       <!-- Rating stars -->
//       <div class="mt-1 flex space-x-1 justify-start rtl:space-x-reverse text-yellow-400 text-lg">
//        <i class="far fa-star">
//        </i>
//        <i class="far fa-star">
//        </i>
//        <i class="far fa-star">
//        </i>
//        <i class="far fa-star">
//        </i>
//        <i class="far fa-star">
//        </i>
//       </div>
//       <!-- Price -->
//       <p class="mt-2 font-semibold text-base text-gray-900">
//         ${product.price} EGP
//        <span class="text-gray-500 mx-1">
//         -
//        </span>
//         ${product.price +product.price*15% product.price} EGP
//       </p>
//       <!-- Button -->
//       <button class="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-md py-2 flex items-center justify-center gap-2" type="button">
//        عرض التفاصيل
//        <i class="fas fa-shopping-cart">
//        </i>
//       </button>
//      </div>
//      `
//     };
//      }
// }
// renderproducts()