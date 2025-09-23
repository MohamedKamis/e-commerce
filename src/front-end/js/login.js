// document.getElementById
//   const button = document.getElementById('but');
// button.addEventListener('click', () => {
//   const login = document.getElementById('login');
//   const create = document.getElementById('create');
//     login.style.display = 'none';
//     create.style.display = 'block';
//     button.value="ttt"
//   });
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('but');
    const div1 = document.getElementById('login');
    const div2 = document.getElementById('create');
    let isDiv1Visible = true;
    button.addEventListener('click', () => {
      if (isDiv1Visible) {
        div1.style.display = 'none';
        div2.style.display = 'block';
         button.textContent = ' تسجيل الدخول';
        button.setAttribute('aria-pressed', 'true');
      } else {
        div1.style.display = 'block';
        div2.style.display = 'none';
        button.textContent = 'انشاء حساب';
        button.setAttribute('aria-pressed', 'false');
      }
      isDiv1Visible = !isDiv1Visible;
    });
  });
