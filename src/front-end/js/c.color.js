const url_color = new URL(window.location.href);
const api_url_color = url_color.origin;

const add_color = async () => {
  const color = document.getElementById("color_name").value;
  const prodect_code_color = document.getElementById("prodect_code_color").value

    // const url = new URL(window.location.href);
    // const api_url =url.origin;
    // const productName = document.getElementById('product-name').value;
    // const productDescription = document.getElementById('product-description').value;
    // const sections_code = document.getElementById('section-code').value;
    // const productBrand = document.getElementById('product-brand').value;
    // const productPrice = document.getElementById('product-price').value;
    // const productStatus = document.getElementById('product-status').value;

    // Here you would typically send this data to your server
 const fileInput = document.getElementById('imgs_url_color');
    const file = fileInput.files[0];
    const formData = new FormData();
   // formData.append('movieDescription',movieDescription);
    formData.append('color_name',color) ;
    formData.append('prodect_code',prodect_code_color) ;


    if (file) {
        formData.append('image', file);
    } else {
        alert('Please select an image to upload.');
        return;
    }
    try {
        const response = await fetch(api_url_color+'/imgs_colors_add', {
            method: 'POST',
            body: formData,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
    }
  show_all_colors();
}   
 const read_all_colors= async () => {
    try {
        const response = await fetch(api_url_color+"/imgs_colors", {
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
const remove_color= async (color_id)=>{
    console.log(color_id);
         const dataform={
                    'id':color_id
                    }  
                try {
                 await fetch(api+"/imgs_colors/remove", {
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
            show_all_colors()
}
const show_all_colors= async () => {
    const data = await read_all_colors();
    const table = document.getElementById('color-data-list');
    table.innerHTML = "";
    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML=`
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">${item.status}</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.color_name}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <img
              src="${item.imgs_url}"
              alt="Crimson Red"
              class="h-10 w-10 rounded-md object-cover"
              loading="lazy"
            />
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.prodect_code}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.created_at}</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
            <!-- <button
              class="text-indigo-600 hover:text-indigo-900"
              aria-label="Edit color 1"
              data-id="1"
            >
              <i class="fas fa-edit"></i>
            </button> -->
            <button onclick="remove_color('${item.id}')"
              class="text-red-600 hover:text-red-900"
              aria-label="Delete color 1"
              data-id="1"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        `
       table.appendChild(row) 
    });
}
