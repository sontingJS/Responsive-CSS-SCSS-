const formInput = document.getElementById('formInput');
const email = document.getElementById('email');
const password = document.getElementById('password');
const errMessageEmail = document.getElementById('errMessageEmail');
const errMessagePassword = document.getElementById('errMessagePassword');
const alert1 = document.getElementById('alert');
const formNP1 = document.getElementById('formNP1');
const Form = document.getElementById('Form');

formInput.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!email.value || !password.value) {
        if (!email.value) {
            email.style.border = '1px red solid';
            errMessageEmail.style.display = ''
        }
        else {
            email.style.border = '1px solid rgba(141, 153, 187, 1)';
            errMessageEmail.style.display = 'none'
        }
        if (!password.value) {
            password.style.border = '1px red solid';
            errMessagePassword.style.display = '';
        }
        else {
            password.style.border = '1px solid rgba(141, 153, 187, 1)';
            errMessagePassword.style.display = 'none';
        }
    }
    else {
        if (email.value !== 'admin@gmail.com' || password.value !== '123456') {
            alert1.style.display = '';
            setTimeout(() => {
                document.getElementById('alert').style.display = 'none';
            }, 3000);
        }
        if (email.value === 'admin@gmail.com' && password.value === '123456') {
            Form.style.display = 'none';
            formNP1.style.display = 'grid';
        }
    }
});

