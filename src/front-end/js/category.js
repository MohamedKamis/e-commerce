
    const url2 = new URL(window.location.href);
    const api =url2.origin;
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
                console.error('Error sending data:', error);
            }
        }
const fun=(async () => {
    const crows = await read_all_category(api); 
    const srws = await read_all_sections(api);
         const categories= []; 
    for (const c of crows ) {
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
    };
        return categories;
})

const categoriesContainer = document.getElementById('categories-container');
const addCategoryBtn = document.getElementById('add-category-btn');
const addCategoryModal = document.getElementById('add-category-modal');
const cancelCategoryBtn = document.getElementById('cancel-category-btn');
const categoryForm = document.getElementById('category-form');
const addSectionModal = document.getElementById('add-section-modal');
const cancelSectionBtn = document.getElementById('cancel-section-btn');
const sectionForm = document.getElementById('section-form');
let activeCategoryId = null;
const removeCategory = async(id) => {
                // document.getElementById('home-link').href = api;
                    const dataform={
                    'id':id
                    }  
                try {
                 await fetch(api+"/categories/remove", {
                        method:"post",
                        body:JSON.stringify(dataform),
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });
                    chenges();
                     document.getElementById('add-category-modal').style.display = 'none';
                    document.getElementById('add-section-modal').style.display = 'none';

                 
            } catch (error) {
                console.error('Error sending data:', error);
            }
}
// Render all categories
async function renderCategories() {
    const categories = await fun();
    console.log('Categories:', categories);
    
    categoriesContainer.innerHTML = '';
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card bg-white rounded-lg shadow overflow-hidden';
        categoryCard.dataset.categoryId = category.id;

        categoryCard.innerHTML = `
            <div class="wd-col category-grid-item wd-cat cat-design-center without-product-count wd-with-subcat product-category product">
                <img src="${category.image_url}" alt="${category.name_categorie} showcase products" class="w-full h-48 object-cover" onerror="this.src='https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/67cd8fe5-0a8b-461d-b8a2-36f8981f4394.png'">
                <div class="absolute top-2 right-2 flex space-x-1">
                    <button class="edit-category-btn p-2 bg-white rounded-full shadow hover:bg-gray-100" data-id="${category.id}">
                        <i class="fas fa-pen text-gray-600"></i>
                    </button>
                    <button class="delete-category-btn p-2 bg-white rounded-full shadow hover:bg-gray-100" data-id="${category.id}">
                        <i class="fas fa-trash text-red-600" id="d_${category.id}" onclick="removeCategory(${category.id})"></i>
                    </button>
                </div>
            </div>
            <div class="p-4">
                <h3 class="text-xl font-semibold text-gray-800">${category.name_categorie}</h3>
                <p class="text-gray-500 text-sm mt-1">${category.description}</p>
                
                <div class="mt-4 pt-2 border-t border-gray-100">
                    <div class="flex justify-between items-center mb-2">
                        <h4 class="font-medium text-gray-700">Sections</h4>
                        <button class="add-section-btn px-2 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200" data-category-id="${category.id}">
                            <i class="fas fa-plus mr-1"></i>Add Section
                        </button>
                    </div>
                    <div class="sections-list space-y-2 mt-2" data-category-id="${category.id}">
                        ${category.sections.map(section => `
                            <div class="section-item relative group p-3 border border-gray-200 rounded-md flex justify-between items-center" data-section-id="${section.id}">
                                <div>
                                    <span class="font-medium text-gray-700">${section.name}</span>
                                    <span class="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">${section.type}</span>
                                </div>
                                <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button class="edit-section-btn p-1 text-gray-500 hover:text-indigo-600" data-section-id="${section.id}">
                                        <i class="fas fa-pen fa-sm"></i>
                                    </button>
                                    <button class="delete-section-btn p-1 text-gray-500 hover:text-red-600" data-section-id="${section.id}">
                                        <i class="fas fa-trash fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        categoriesContainer.appendChild(categoryCard);
    });

    // Update section drag events
    setupDragAndDrop();
}
 const options = async ()=> {
        const data= await read_all_category(api);
        console.log('Category Types:', data);
        const product_section=document.getElementById('section_type');
         product_section.innerHTML =''
        // const option = document.createElement('option');
        for (const element of data) {
           product_section.innerHTML +=`
            <option value="${element.name_categorie}">${element.name_categorie}</option>`
        }
};
const options_product_section = async ()=> {
        const data= await read_all_sections(api);
        console.log('Category Types:', data);
        const section_code=document.getElementById('section-code');
        section_code.innerHTML ='';
        for (const element of data) {
            section_code.innerHTML +=`
            <option value="${element.sections_code}">${element.section_name}</option>`
        }
};
const options_all_product_section= async ()=> {
        const data= await read_all_sections(api);
        // console.log('Category Types:', data);
        const section_code=document.getElementById('filter-section-product');
        section_code.innerHTML ='';
        section_code.innerHTML =`
          <option value="all_sections">All sections</option>
        `;
      
        for (const element of data) {
            section_code.innerHTML +=`
            <option value="${element.sections_code}">${element.section_name}</option>`
        }
};
options_product_section();
// Setup drag and drop for sections
function setupDragAndDrop() {
    document.querySelectorAll('.sections-list').forEach(list => {
        list.addEventListener('dragover', e => {
            e.preventDefault();
            const draggedItem = document.querySelector('.dragging');
            const afterElement = getDragAfterElement(list, e.clientY);
            if (afterElement) {
                list.insertBefore(draggedItem, afterElement);
            } else {
                list.appendChild(draggedItem);
            }
        });
    });

    document.querySelectorAll('.section-item').forEach(item => {
        item.setAttribute('draggable', true);
        item.addEventListener('dragstart', () => {
            item.classList.add('dragging');
        });
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.section-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Modal toggle functions
function toggleCategoryModal() {
    addCategoryModal.classList.toggle('hidden');
}

function toggleSectionModal() {
    addSectionModal.classList.toggle('hidden');
}

// Form handlers


// sectionForm.addEventListener('submit', e => {
//     e.preventDefault();
//     if (!activeCategoryId) return;
    
//     const category = categories.find(c => c.id === activeCategoryId);
//     if (category) {
//         const id = category.sections.length > 0 ? Math.max(...category.sections.map(s => s.id)) + 1 : 101;
//         const newSection = {
//             id,
//             name: document.getElementById('section-name').value,
//             type: document.getElementById('section-type').value,
//             position: parseInt(document.getElementById('section-position').value) || category.sections.length + 1
//         };
//         category.sections.push(newSection);
//         renderCategories();
//     }
//     toggleSectionModal();
//     sectionForm.reset();
//     activeCategoryId = null;
// });

// Event listeners
addCategoryBtn.addEventListener('click', toggleCategoryModal);
cancelCategoryBtn.addEventListener('click', toggleCategoryModal);

categoriesContainer.addEventListener('click', e => {
    if (e.target.classList.contains('add-section-btn') || e.target.closest('.add-section-btn')) {
        const btn = e.target.classList.contains('add-section-btn') ? e.target : e.target.closest('.add-section-btn');
        activeCategoryId = parseInt(btn.dataset.categoryId);
        toggleSectionModal();
    }
    else if (e.target.classList.contains('edit-category-btn') || e.target.closest('.edit-category-btn')) {
        const btn = e.target.classList.contains('edit-category-btn') ? e.target : e.target.closest('.edit-category-btn');
        // Implement edit functionality
    }
    else if (e.target.classList.contains('delete-category-btn') || e.target.closest('.delete-category-btn')) {
        const btn = e.target.classList.contains('delete-category-btn') ? e.target : e.target.closest('.delete-category-btn');
        const categoryId = parseInt(btn.dataset.id);
        if (confirm('Are you sure you want to delete this category?')) {
            const index = categories.findIndex(c => c.id === categoryId);
            if (index !== -1) {
                categories.splice(index, 1);
                renderCategories();
            }
        }
    }
    else if (e.target.classList.contains('edit-section-btn') || e.target.closest('.edit-section-btn')) {
        const btn = e.target.classList.contains('edit-section-btn') ? e.target : e.target.closest('.edit-section-btn');
        // Implement edit functionality
    }
    else if (e.target.classList.contains('delete-section-btn') || e.target.closest('.delete-section-btn')) {
        const btn = e.target.classList.contains('delete-section-btn') ? e.target : e.target.closest('.delete-section-btn');
        const sectionId = parseInt(btn.dataset.sectionId);
        if (confirm('Are you sure you want to delete this section?')) {
            categories.forEach(category => {
                const index = category.sections.findIndex(s => s.id === sectionId);
                if (index !== -1) {
                    category.sections.splice(index, 1);
                    renderCategories();
                }
            });
        }
    }
});

cancelSectionBtn.addEventListener('click', toggleSectionModal);

// Initialize

const chenges= async () => {
    
    await renderCategories();
    await options();
    await options_product_section()
}

// chenges().catch(error => {
//     console.error('Error initializing categories:', error);
// });
  const url = new URL(window.location.href);

  
const api_url =url.origin;
        async function sendData(endpoint) {
                const name_categorie1=document.getElementById('category_name').value;
                const description1=document.getElementById('category_description').value; 
                const image_url1=document.getElementById('category_image').value;
                const dataform={
                'name_categorie':name_categorie1,'description':description1,'image_url':image_url1,
                }  
            try {
                console.log(dataform);
                const response = await fetch(endpoint+"/categories", {
                        method:"post",
                        body:JSON.stringify(dataform),
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });
                        const data1= await response.json().then((result) => {
                            console.log('Data sent successfully: data');
                        }).catch((err) => {
                            console.log('Error sending data:', err);
                            
                        });
                        chenges();
            } catch (error) {
                console.error('Error sending data:', error);
            }
        }
document.getElementById('but_send_catgory').onclick =function() {
    sendData(api_url);
}
const fun2 = async (endpoint) => {
  try {
            const section_type = document.getElementById('section_type').value;
            const section_position = document.getElementById('section_position').value;
            const section_name = document.getElementById('section_name').value;
            const image_url = document.getElementById('image_url').value;
            const dataform={
                        'section_type':section_type,'section_name':section_name,'section_position':section_position,'image_url':image_url
                        }  
                console.log(dataform);
                const response = await fetch(endpoint+"/sections", {
                        method:"post",
                        body:JSON.stringify(dataform),
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });
                    const data1= await response.json()
                    console.log('Data sent successfully:', data1);
                    
            } catch (error) {
                console.error('Error sending data:', error);
            }
}

const but_add_Section = document.getElementById("but_add_Section");
 but_add_Section.addEventListener("click", async () => {
     await fun2(api_url);
     window.location.reload();
 }) 

// export default api_url;