
// console.log("Item Profile Loaded");
const url = new URL(window.location.href);
const api_url = url.origin;

const productCode = url.searchParams.get('product');
if (!productCode) {
    console.error('Product code is required');
    window.location.href = api_url;
}
async function fetchProductDetails() {
    try {
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
        // console.log('Product details fetched:', product);
        return product;
    } catch (error) {
        console.error('Error fetching product details:', error);
        window.location.href = api_url;
    }
}
        function populateMaterials(text) {
            // الحصول على العنصر بحسب المعرف
            const select = document.getElementById('material');
            // تقسيم النص بواسطة المسافة والشرطة
            const materials = text.split('-');
            // إزالة أي خيارات فارغة محتملة وإضافة كل عنصر كخيار
            materials.forEach(material => {
                if (material.trim()) {  // التحقق من عدم وجود عناصر فارغة
                    const option = document.createElement('option');
                    option.value = material.trim();
                    option.textContent = material.trim();
                    select.appendChild(option);
                }
            });
        }
         function populateSize(text) {
            // الحصول على العنصر بحسب المعرف
            const select = document.getElementById('size');
            // تقسيم النص بواسطة المسافة والشرطة
            const materials = text.split('-');
            // إزالة أي خيارات فارغة محتملة وإضافة كل عنصر كخيار
            materials.forEach(material => {
                if (material.trim()) {  // التحقق من عدم وجود عناصر فارغة
                    const option = document.createElement('option');
                    option.value = material.trim();
                    option.textContent = material.trim();
                    select.appendChild(option);
                }
            });
        }
        // النص المقدم
        // const text = "حديد - فولاز -خشب - مطاط";
        // استدعاء الدالة لملء الخيارات
        // دالة إضافية لعرض الاختيار الحالي (اختياري)
        // function displaySelection() {
        //     const select = document.getElementById('material');
        //     console.log('الاختيار الحالي:', select.value);
        //     // يمكن إضافة منطق إضافي هنا إذا لزم الأمر، مثل عرض رسالة أو تحديث واجهة أخرى
        // }

const chang_img_color=(img_profile,hidden_input)=>{
    document.getElementById('hidden_input').value = hidden_input;
    document.getElementById('product-image').src = img_profile;
}
const  the_price= async() =>{
     const material = document.getElementById('material').value;
     const size =String(document.getElementById('size').value);
      const product = await fetchProductDetails();
      const sizes = (product.sizes).split('-')

    arr=[]
    
     const prices = JSON.parse(product.price)
     const allPriceMaterial= prices[`${material}`];
     const indexSize=sizes.indexOf(`${size}`);
     const finel_price=allPriceMaterial.split('-')
    //  console.log(sizes);
     
    //  console.log(finel_price);
    //  console.log(indexSize);
    //  console.log(finel_price[indexSize]);
     document.getElementById('product-price').innerText = finel_price[indexSize];
    document.getElementById('old-price').innerText = ` ${Math.floor(Number(finel_price[indexSize] )+ Number(20/100*finel_price[indexSize]))} EGP`;

     
}
async function renderProductDetails() {
    const product = await fetchProductDetails();
    if (!product) {
        console.error('Product not found');
        window.location.href = api_url;
        return;
    }

    // console.log(product);
         const prices = JSON.parse(product.price)
                  const firstPrice = ( Object.values(prices)[0]);
                //   console.log(firstPrice);
                  
                  const prices2 = JSON.stringify(firstPrice).split('-')[0].replace(/[^\d.,]/g, '').trim()
    document.getElementById('product-title').innerText = product.name_product;
    document.getElementById('product-description').innerText = product.description;
    document.getElementById('product-price').innerText = `${prices2}`;
    document.getElementById('old-price').innerText = ` ${Math.floor(Number(prices2 )+ Number(20/100*prices2))} EGP`;
    document.getElementById('product-image').src = product.image_url;
    document.getElementById('img_profile').src = product.image_url;
    populateMaterials(product.material);
    populateSize(product.sizes);
    const color=await show_color();
    
    // console.log(color);
    
     const imgs = document.getElementById('all_imgs_color2');
     imgs.innerHTML=''
    color.forEach(element => {
        imgs.innerHTML+=`<img alt="${element.color_name}" class="rounded-lg border border-gray-300 cursor-pointer thumbnail" height="80" src="${element.imgs_url}" onclick="chang_img_color('${element.imgs_url}','${element.color_name}');"  width="80"/>
        <summary>
        ${element.color_name}
       </summary>
        `
        // const row = document.createElement('img');
        // row.src=`${element.imgs_url}`
        // row.classList="rounded-lg border border-gray-300 cursor-pointer thumbnail";
        // row.style.height='80px';
        // row.style.width='80px';
        // lest.appendChild(order_div)
    
    });

}
document.addEventListener('DOMContentLoaded', () => {
    renderProductDetails();
});
const show_color = async() => {
                   
                // document.getElementById('home-link').href = api;
                    const dataform={
                    'prodect_code':productCode
                    }  
                try {
                const response= await fetch(api_url+"/imgs_color", {
                        method:"POST",
                        body:JSON.stringify(dataform),
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



document.getElementById('add-to-cart-button').addEventListener('click', () => {
    
    const id_prodect = productCode ;
    const price =  document.getElementById('product-price').textContent;
    const color_name= document.getElementById('hidden_input').value;
    const size= document.getElementById('size').value;
    const material= document.getElementById('material').value;
    // const price = 8080;
    const quantity= document.getElementById('qty').value || 1;
    const url = new URL(window.location.href);
    const api_url =url.origin;
      if (
        !localStorage.getItem('user_id') || localStorage.getItem('user_id') === 'null' ||
        localStorage.getItem('user_id') === '' || localStorage.getItem('user_id') === 'undefined' || localStorage.getItem('user_id') === undefined 
    ) {
    //    return window.location.href = api_url+'/login';
   localStorage.setItem('user_id',0)
    return 
    }
    if (!localStorage.getItem('data_orders')) {
        localStorage.setItem('data_orders', JSON.stringify([]));
    } 
        const existingOrders = JSON.parse(localStorage.getItem('data_orders'));
        const orderData = {
            color_name:color_name,
            product_id: id_prodect,
            price: price,
            quantity: quantity,
            size:size,
            material:material
        };
        // Check if the order already exists
        existingOrders.push(orderData);
        localStorage.setItem('data_orders', JSON.stringify(existingOrders));
        return ;
    
});

document.getElementById('home-link').href = api_url;
// document.getElementById('home-link').innerHTML = product.sections_name;
// document.getElementById('section-link').href = `${api_url}/category/items?a=${product.sections_code}`;
// document.getElementById('section-link').innerHTML = product.sections_name;
document.getElementById('home-link').href = api_url;
  




