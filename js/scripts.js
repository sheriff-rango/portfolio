/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

let formElements = {
    name: null,
    email: null,
    phone: null,
    message: null
}

let statusElements = {
    name: null,
    email: null,
    phone: null,
    message: null,
    button: null,
}

window.addEventListener('DOMContentLoaded', event => {
    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const phoneElement = document.getElementById("phone");
    IMask(phoneElement, {
        mask: '+1 (000) 000-0000',
    });
});

function resetError() {
    for (let key in statusElements) {
        const statusElement = statusElements[key];
        const formElement = formElements[key];
        if (statusElement) {
            statusElement.textContent = "";
        }
        if (formElement) {
            formElement.classList.remove("form-control-invalid");
        }
    }
}

function resetForm() {
    resetError();

    for (let key in formElements) {
        const element = formElements[key];
        if (element) {
            element.value = "";
        }
    }
}

function sendEmail(event) {
    event.preventDefault()
    // console.log('element', event, event.target)
    const nameElement = event.target.name;
    const emailElement = event.target.email;
    const phoneElement = event.target.phone;
    const messageElement = event.target.message;
    const buttonElement = event.target.submit;

    formElements = {
        name: nameElement,
        email: emailElement,
        phone: phoneElement,
        message: messageElement
    };

    statusElements = {
        name: nameElement.nextElementSibling,
        email: emailElement.nextElementSibling,
        phone: phoneElement.nextElementSibling,
        message: messageElement.nextElementSibling,
        button: buttonElement.nextElementSibling,
    };

    const name = nameElement.value.trim();
    const email = emailElement.value.trim();
    const phone = phoneElement.value.trim();
    const message = messageElement.value;
    let hasError = false;

    if (!name) {
        hasError = true;
        nameElement.classList.add("form-control-invalid");
        statusElements.name.textContent = "Please enter your name!"
    }

    if (!email) {
        hasError = true;
        emailElement.classList.add("form-control-invalid");
        statusElements.email.textContent = "Please enter your email!"
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        hasError = true;
        emailElement.classList.add("form-control-invalid");
        statusElements.email.textContent = "Invalid email address!"
    }

    if (phone) {
        const phoneRegExp = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;
        const validPhoneNumber = phoneRegExp.test(phone);
        if (!validPhoneNumber) {
            hasError = true;
            phoneElement.classList.add("form-control-invalid");
            statusElements.phone.textContent = "Please enter valid phone number!"
        }
    }

    if (!message) {
        hasError = true;
        messageElement.classList.add("form-control-invalid");
        statusElements.message.textContent = "Please enter your message!"
    }

    if (hasError) {
        setTimeout(() => {
            resetError();
        }, 5000)
        return
    };

    const statusElement = buttonElement.nextElementSibling;
    statusElement.textContent = "Submitting...";
    statusElement.style.color = "rgb(192,152,83)";
    emailjs.send('service_rrb3ima', 'template_l7qenfz', { name, email, phone, message }).then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
            statusElement.textContent = "Successfully submitted!";
            statusElement.style.color = "rgb(70,136,71)";
            resetForm();
        },
        (error) => {
            console.log('FAILED...', error);
            statusElement.textContent = "Failed!";
            statusElement.style.color = "rgb(185,74,72)";
        },
    )
}