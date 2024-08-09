/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

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

    // Initialize EmailJS with the Public Key
});

function resetError(event) {
    // console.log('debug reset error', event)
    const nameElement = event.target.name;
    const emailElement = event.target.email;
    const phoneElement = event.target.phone;
    const messageElement = event.target.message;

    nameElement.nextElementSibling.textContent = ""
    emailElement.nextElementSibling.textContent = ""
    phoneElement.nextElementSibling.textContent = ""
    messageElement.nextElementSibling.textContent = ""

    nameElement.classList.remove("form-control-invalid");
    emailElement.classList.remove("form-control-invalid");
    phoneElement.classList.remove("form-control-invalid");
    messageElement.classList.remove("form-control-invalid");
}

function resetForm(event) {
    resetError(event);
    const nameElement = event.target.name;
    const emailElement = event.target.email;
    const phoneElement = event.target.phone;
    const messageElement = event.target.message;

    nameElement.value = "";
    emailElement.value = "";
    phoneElement.value = "";
    messageElement.value = "";
}

function sendEmail(event) {
    event.preventDefault()
    // console.log('element', event, event.target)
    const nameElement = event.target.name;
    const emailElement = event.target.email;
    const phoneElement = event.target.phone;
    const messageElement = event.target.message;
    const buttonElement = event.target.submit;
    console.log('button element', buttonElement)

    const name = nameElement.value.trim();
    const email = emailElement.value.trim();
    const phone = phoneElement.value.trim();
    const message = messageElement.value;
    let hasError = false;

    if (!name) {
        hasError = true;
        nameElement.classList.add("form-control-invalid");
        nameElement.nextElementSibling.textContent = "Please enter your name!"
    }

    if (!email) {
        hasError = true;
        emailElement.classList.add("form-control-invalid");
        emailElement.nextElementSibling.textContent = "Please enter your email!"
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        hasError = true;
        emailElement.classList.add("form-control-invalid");
        emailElement.nextElementSibling.textContent = "Invalid email address!"

    }

    if (phone) {
        // const parsedPhone = libphonenumber.parsePhoneNumber(phone);
        // console.log('debug phone number validation', parsedPhone);
    }

    if (!message) {
        hasError = true;
        messageElement.classList.add("form-control-invalid");
        messageElement.nextElementSibling.textContent = "Please enter your message!"
    }

    if (hasError) {
        setTimeout(() => {
            nameElement.nextElementSibling.textContent = ""
            emailElement.nextElementSibling.textContent = ""
            phoneElement.nextElementSibling.textContent = ""
            messageElement.nextElementSibling.textContent = ""

            nameElement.classList.remove("form-control-invalid");
            emailElement.classList.remove("form-control-invalid");
            phoneElement.classList.remove("form-control-invalid");
            messageElement.classList.remove("form-control-invalid");
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
            resetForm(event);
        },
        (error) => {
            console.log('FAILED...', error);
            statusElement.textContent = "Failed!";
            statusElement.style.color = "rgb(185,74,72)";
        },
    )
}