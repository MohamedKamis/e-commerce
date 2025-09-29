const url_token = new URL(window.location.href);
const api_url_token =url_token.origin;
const token = localStorage.getItem('tokin');
if (!token) {
  // No token, redirect to login page
  window.location.href = api_url_token+'/login';
} else {
  // Optionally verify token with backend
  fetch(api_url_token+'/verifyAuthToken', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Invalid token');
      }
      return res.json();
    })
    .then(data => {
      // Token is valid, proceed to load page content
      console.log('Token valid:', data);
    })
    .catch(() => {
      // Token invalid, redirect to login
      window.location.href = api_url_token+'/login';
    });
}
if( document.getElementById('logoutBtn')){
const logout=()=>{

      // Remove the auth token from localStorage
      localStorage.removeItem('tokin');
      // Redirect to login page
      window.location.href = api_url_token; // change this to your login page URL
    }
}