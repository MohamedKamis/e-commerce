
const url = new URL(window.location.href);
const api_url =url.origin;
const show_pass=() => {
    const passwordInput = document.getElementById('log_password');

    const icon = document.getElementById('eye_icon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}
const show_pass2=() => {
        const add_password = document.getElementById('add_password');
        const confirmpassword= document.getElementById('confirm-password');
    if (add_password.type === 'password') {
        add_password.type = 'text';
        confirmpassword.type = 'text';
        document.getElementById('eye_icon1').classList.remove('fa-eye-slash');
        document.getElementById('eye_icon1').classList.add('fa-eye');
        document.getElementById('eye_icon2').classList.remove('fa-eye-slash');
        document.getElementById('eye_icon2').classList.add('fa-eye');
    } else {
        add_password.type = 'password';
        confirmpassword.type = 'password';
        document.getElementById('eye_icon1').classList.remove('fa-eye');
        document.getElementById('eye_icon1').classList.add('fa-eye-slash');
        document.getElementById('eye_icon2').classList.remove('fa-eye');
        document.getElementById('eye_icon2').classList.add('fa-eye-slash');
    }
}
const login_user= async() => {
    const passwor = document.getElementById('log_password').value;
    const username = document.getElementById('log_username').value;
const formData = {
        'user_name': username,
        'pass': passwor
    }
    try {
        const response = await fetch(api_url + '/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        if (!data) {
            document.location.href = api_url+ '/login';
            alert('اسم المستخدم او كلمة المرور غير صحيحة');
            document.getElementById('log_password').value = '';
            document.getElementById('log_username').value = '';
            // document.getElementById('log_password').focus();
            return;
        }
         else {
            if(data.login==true){
                localStorage.setItem('tokin', data.tokin);
                document.location.href = api_url+'/dashbord';
            }
            else{
            localStorage.setItem('user_id', data.id);
            localStorage.setItem('user_name', data.user_name);
            document.location.href = api_url;
            console.log('Login successful:', data);
             }
        }
    }
     catch (error) {
        document.location.href = api_url;
        alert('An error occurred while logging in. Please try again.');
    }

}
const add_user=async ()  => {
    const passwordInput = document.getElementById('add_password').value
    const confirmpassword= document.getElementById('confirm-password').value
    if (passwordInput !== confirmpassword) {
        alert('Passwords do not match');
        return;
    }
    const nameInput = document.getElementById('add_name').value
    const usernameInput = document.getElementById('add_username').value
    const phoneInput = document.getElementById('add_phone').value
    const emailInput = document.getElementById('add_email').value
    const accountTypeInput = document.getElementById('account-type').value
    const formData = {
        'name': nameInput,
        'user_name': usernameInput,
        'pass': passwordInput,
        'phone_number': phoneInput,
        'email': emailInput,
        'account_type': accountTypeInput
    };
    try {
    console.log(formData);

        const response = await fetch(api_url + '/add_user', {
            method: 'POST',
            body:JSON.stringify(formData),
            headers: {
                 'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        if (data.error) {
            alert({error: "استخدم اسم مستخدم آخر"});
        } else {
            alert('User created successfully');
            document.location.href = api_url + '/login';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the user. Please try again.');
    }

}