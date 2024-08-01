document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem('token');
    const checkedToken = sessionStorage.getItem('checkedToken');

    // Nếu đã kiểm tra token trong sessionStorage, không làm gì cả
    if (checkedToken) {
        return;
    }

    // Đánh dấu đã kiểm tra token
    sessionStorage.setItem('checkedToken', 'true');

    if (token) {
        // Nếu có token, chuyển hướng đến index.html
        window.location.href = 'index.html';
    } else {
        // Nếu không có token, chuyển hướng đến login.html
        window.location.href = 'login.html';
    }
});

