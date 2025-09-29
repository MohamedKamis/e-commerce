const url = new URL(window.location.href);
const api_url =url.origin;
const apis = url.searchParams.get('a') || 'err';

  
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
                document.location.href = api_url ;
                console.error('Error sending data:', error);

            }
        }
         async function read_all_sections(endpoint) {
            try {
                const response = await fetch(endpoint+"/all_sections", {
                        method:"get",
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });
                        const data= await response.json();
                        return data;
            } catch (error) {
              document.location.href = api_url ;
                console.error('Error sending data:', error);
            }
        }
const fun=(async () => {
    const crows = await read_all_category(api_url); 
    const srws = await read_all_sections(api_url);
         const categories= []; 
    for (const c of crows ) {
        if (c.id == apis) {
         const sections =[];
        for (const s of srws) {
            if (c.id === s.categories_id) {
                sections.push({id: s.id,categories_id:s.categories_id ,name: s.section_name, type: s.section_type,position: s.section_position,sections_code: s.sections_code,image_url:s.image_url});
            }
        }
         categories.push({
            id: c.id,
            name_categorie: c.name_categorie,
            description: c.description, 
            image_url: c.image_url,
            sections: sections
            });
            return categories;
        }
    };
})
// async function read_all_sections(endpoint) {
//         try {
//             const response = await fetch(endpoint+"/all_sections", {
//                     method:"get",
//                     headers:{
//                         'Content-Type':'application/json',
//                     }
//                 });
//                     const data= await response.json();
//                     return data;
//         } catch (error) {
//             console.error('Error sending data:', error);
//         }
// }
const rendome_prodect= async() =>{
    const url = new URL(window.location.href);
    const api = url.origin;
    if(document.getElementById('home-link').href=api_url)
    try {
        const response = await fetch(api+"/getRandomProducts", {
                method:"get",
                headers:{
                    'Content-Type':'application/json',
                }
            });
           
                const data= await response.json();
                console.log(data);
                if(document.getElementById('rendome_prodect')){
                    document.getElementById('rendome_prodect').innerHTML=''
              
                for (const iterator of data) {
                      const prices = JSON.parse(iterator.price)

                  const firstPrice = ( Object.values(prices)[0]);
                  
                  const prices2 = JSON.stringify(firstPrice).split('-')[0].replace(/[^\d.,]/g, '').trim()
            document.getElementById('rendome_prodect').innerHTML+=`
            <div class="bg-white rounded-lg border border-gray-200 p-3 relative flex flex-col" style="min-width: 280px">
            <!-- Heart icon top-left -->
            <button aria-label="Add to favorites" class="absolute top-3 right-3 bg-white rounded-md p-2 text-gray-800 hover:text-red-600">
             <i class="far fa-heart">
             </i>
            </button>
            <!-- Product image -->
            <div class="relative rounded-lg overflow-hidden">
             <img alt="${iterator.description}" class="w-full h-auto object-cover rounded-lg" height="300" loading="lazy" src="${iterator.image_url}" width="300"/>
             <!-- Bottom-left black icon -->
             <div aria-hidden="true" class="absolute bottom-3 left-3 bg-black bg-opacity-70 rounded-md p-1 text-yellow-400 text-lg">
              <i class="fas fa-adjust">
              </i>
             </div>
            </div>
            <!-- Product title -->
            <h3 class="mt-3 font-bold text-sm leading-tight text-gray-900">
            ${iterator.name_product}
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
            EGP ${prices2} --
            <span class="text-gray-500 mx-1">
            </span>
           <span class="text-gray-500">
            <i class="fas fa-tag">
            </i>
               <span class="text-lg text-red-600 font-semibold line-through" >
               ${Math.floor(Number(prices2)+ Number(20/100*prices2))} EGP
               </span>
             </span>
           </p>
               <div class="absolute top-3 left-3 bg-red-600 text-white text-x font-semibold rounded px-2 py-1 select-none" style="border-radius:50px;" >
                   -20%
                  </div>
            <!-- Button -->
            <button class="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-md py-2 flex items-center justify-center gap-2" type="button">
            <a href="${api_url}/item-profile?product=${iterator.products_code}" class="text-blue-500 hover:underline">  عرض التفاصيل  </a>
             <i class="fas fa-shopping-cart">
             </i>
            </button>
           </div>
           `
                } }
    } catch (error) {
        console.error('Error sending data:', error);
    }
}
rendome_prodect()
async function renderSections() {
    const categories = await fun();
    console.log('Categories:', categories);
    categories.forEach(category => {
          document.getElementById('category-name').innerHTML +=`
          ${category.name_categorie}`;
          document.getElementById('category-title').innerHTML +=`
            ${category.name_categorie}`;
        document.getElementById('category-title').style.color = "#2a2a2a";
      category.sections.map(section => {
        console.log(section.sections_code);
        
          document.getElementById('lest_section').innerHTML +=`
              <a href="category/items?a=${section.sections_code}">
               <div class="flex flex-col items-center">
              <div class="rounded-full bg-[#dba90a] border-8 border-[#e6e6e6] w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <img alt="Shower head in a circular golden background" class="rounded-full" height="96" src="${section.image_url}" width="96"/>
 
              
                </div>
    <span class="mt-2 text-center text-[#1a1a1a] text-sm sm:text-base">
    ${section.name}
    </span>
   </div>
              </a>`;

      })
    });
}
renderSections();