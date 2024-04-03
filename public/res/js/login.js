url = '/login'
class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateonSubmit();
    }

    validateonSubmit() {
        let self = this;

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            var error = 0;
            self.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                if (self.validateFields(input) == false) {
                    error++;
                } else {

                }
            });
            if (error == 0) {

                var username = document.querySelector('#username').value;
                var password = document.querySelector('#password').value;


                // Send a request to check login credentials
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/login");
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        localStorage.setItem('user', JSON.stringify({
                            username: username,
                            password: password
                        }));
                        localStorage.setItem("auth", 1);
                        // Redirect to dashboard or another page
                        window.location.href = "/res/nuaa/sample.html";
                    } else {
                        alert(xhr.responseText);
                    }
                };
                xhr.send(JSON.stringify({
                    username: username,
                    password: password
                }));
            }
        })

    };

    validateFields(field) {
        if (field.value.trim() === "") {
            this.setStatus(
                field,
                `${field.previousElementSibling.innerText} cannot be blank`,
                "error"
            );
            return false;
        } else {
            if (field.type == "password") {
                if (field.value.length < 8) {
                    this.setStatus(
                        field,
                        `${field.previousElementSibling.innerText} must be at least 8 characters`,
                        "error"
                    );
                    return false;
                } else {
                    this.setStatus(field, null, "success");
                    return true;
                }
            } else {
                this.setStatus(field, null, "success");
                return true;
            }
        }
    }

    setStatus(field, message, status) {
        const errorMessage = field.parentElement.querySelector(".error-message");

        if (status == "success") {
            if (errorMessage) {
                errorMessage.innerText = "";
            }
            field.classList.remove("input-error");
        }

        if (status == "error") {
            errorMessage.innerText = message;
            field.classList.add("input-error");
        }
    }
}

const form = document.querySelector(".loginForm");
if (form) {
    const fields = ["username", "password"];
    const validator = new Login(form, fields);
}