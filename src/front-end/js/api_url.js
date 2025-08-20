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
                            console.log('Data sent successfully:', result );
                            window.location.reload();
                            
                        }).catch((err) => {
                            console.log('Error sending data:', err);
                            
                        });
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