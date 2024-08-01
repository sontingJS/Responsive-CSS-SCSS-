
function Validator(options) {
    // Xử lý từng form theo danh sách forms
    let formElement = document.querySelector(options.form);

    if (!formElement) return;

    let selectorRules = {};

    // Hàm lấy phần tử cha của input
    let getElement = (element, selector) => {
        while (element && element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
        return null; // Trả về null nếu không tìm thấy phần tử cha
    };

    // Hàm validate cho từng input
    let validate = (inputElement, rule) => {
        let errMessage;
        let formGroupElement = getElement(inputElement, options.formGroup);
        let errElement = formGroupElement ? formGroupElement.querySelector('.form-message') : null;

        if (!formGroupElement || !errElement) {
            return true; // Nếu không tìm thấy formGroupElement hoặc errElement, bỏ qua việc validate
        }

        let rules = selectorRules[rule.selector];
        if (!rules) return true; // Nếu không tìm thấy rules, bỏ qua việc validate

        for (let i = 0; i < rules.length; ++i) {
            errMessage = rules[i](inputElement.value);
            if (errMessage) break;
        }
        if (errMessage) {
            errElement.innerText = errMessage;
            formGroupElement.classList.add('invalid');
        } else {
            errElement.innerText = '';
            formGroupElement.classList.remove('invalid');
        }
        return !errMessage;
    };

    // Xử lý sự kiện submit của form
    formElement.onsubmit = (e) => {
        e.preventDefault();
        let isFormValid = true;

        // Validate tất cả các input theo quy tắc
        options.rules.forEach(rule => {
            let inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                let isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            }
        });

        if (isFormValid) {
            let enableInput = formElement.querySelectorAll('[name]');
            let inputValue = Array.from(enableInput).reduce((values, input) => {
                values[input.name] = input.value;
                return values;
            }, {});
            if (typeof options.onSubmit === 'function') {
                if (options.tokenLogin) {
                    if (inputValue['email'] === 'admin@gmail.com' || inputValue['password'] === 123456) {
                        let tokenVerify = (length) => {
                            return Math.random().toString(36).substring(2, 2 + length);
                        }
                        inputValue[options.tokenLogin] = tokenVerify(10);
                        localStorage.setItem('token', inputValue[options.tokenLogin]);
                        window.location.href = 'index.html';
                    }
                    else {
                        let alert = document.getElementById('alert');
                        alert.style.display = '';
                        setTimeout(() => {
                            alert.style.display = 'none';
                        }, 3000);
                    }
                }
                else {
                    // Hiển thị form mới và ẩn form hiện tại
                    let formChild = formElement.querySelector(options.formChild);
                    if (formChild) {
                        formChild.style.display = 'none';
                    }
                    let newPasswordForm = document.querySelector(options.otherFormChild);
                    if (newPasswordForm) {
                        newPasswordForm.style.display = 'block'; // Hiển thị form-new-password
                    }
                }


                options.onSubmit(inputValue);
            }
        } else {
            console.log('có lỗi')
        }
    };

    // Thêm các quy tắc validation cho các input
    options.rules.forEach(rule => {
        if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test);
        } else {
            selectorRules[rule.selector] = [rule.test];
        }

        let inputElement = formElement.querySelector(rule.selector);
        if (inputElement) {
            inputElement.onblur = function () {
                validate(inputElement, rule);
            };
            inputElement.oninput = () => {
                if (inputElement.value) {
                    let formGroupElement = getElement(inputElement, options.formGroup);
                    let errElement = formGroupElement ? formGroupElement.querySelector('.form-message') : null;
                    if (errElement) {
                        errElement.innerText = '';

                    }
                    if (formGroupElement) {
                        formGroupElement.classList.remove('invalid');
                    }
                    if (options.btn) {
                        document.querySelector(options.btn).style.background = 'red';
                        document.querySelector(options.btn).style.cursor = 'pointer';
                    }
                }
                else {
                    if (options.btn) {
                        document.querySelector(options.btn).style.background = '';
                        document.querySelector(options.btn).style.cursor = 'none';
                    }
                }
            };
        }
    });
}

// Các hàm kiểm tra
Validator.isRequired = (selector, message) => {
    return {
        selector: selector,
        test: (value) => {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
        }
    };
};

Validator.isEmail = (selector, message) => {
    return {
        selector: selector,
        test: (value) => {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/;
            return re.test(value) ? undefined : 'Phải là email';
        }
    };
};

Validator.isPassword = (selector, minlength, message) => {
    return {
        selector: selector,
        test: (value) => {
            return value.trim().length >= minlength ? undefined : `Vui lòng nhập trên ${minlength} kí tự`;
        }
    };
};

Validator.isConfirmed = (selector, getConfirmValue, message) => {
    return {
        selector: selector,
        test: (value) => {
            return value === getConfirmValue() ? undefined : 'Vui lòng nhập chính xác';
        }
    };
};

