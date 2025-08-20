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