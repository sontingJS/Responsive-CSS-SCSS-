let generateRandomString = (length) => {
    return Math.random().toString(36).substring(2, 2 + length);
}

const randomString = generateRandomString(10); // Thay 10 bằng độ dài chuỗi bạn muốn tạo
