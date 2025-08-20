const changeborder = (element) => {
    if (document.getElementById('users')) {
        document.getElementById('users').style.display = 'none';
        document.getElementById('users_id').style.background = '#ffffff00';
        
    }
    if (document.getElementById('category')) {
        document.getElementById('category').style.display = 'none';
         document.getElementById('category_id').style.background = '#ffffff00';
    }
    if (document.getElementById('products')) {
        document.getElementById('products').style.display = 'none';
         document.getElementById('products_id').style.background = '#ffffff00';
    }
     if (document.getElementById('analytics')) {
        document.getElementById('analytics').style.display = 'none';
         document.getElementById('analytics_id').style.background = '#ffffff00';
    }
        if (document.getElementById('orders')) {
        document.getElementById('orders').style.display = 'none';
         document.getElementById('orders_id').style.background = '#ffffff00';
    }
        if (document.getElementById('analytics')) {
        document.getElementById('analytics').style.display = 'none';
         document.getElementById('analytics_id').style.background = '#ffffff00';
    }
    document.getElementById(element).style.display = 'inline-block';
    document.getElementById(element+'_id').style.background = 'white';
}

changeborder('products');