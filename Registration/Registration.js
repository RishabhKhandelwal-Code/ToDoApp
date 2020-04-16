/*Description -
It validates and adds the user information to localStorage */

//Checks if the user is authenticated then it avoids redirecting him/her to Registration Page
(function () {
    if (sessionStorage.getItem('AuthenticationState') === "Authenticated") {
        window.open("../Todo/Todo.html", "_self");
    }
})();

//To validate form inputs
function formValidation() {
    //Imediately Invoked Function Expression (IIFE)
    (function () {
        //To execute javascript code in "strict mode".
        'use strict';
        var firstName = document.registration.firstName.value;
        var lastName = document.registration.lastName.value;
        var email = document.registration.email.value;
        var tPassword = document.registration.password.value;
        var cPassword = document.registration.cPassword.value;
        var address = document.registration.address.value;
        var gender = document.registration.gender.value;

        if (firstName == "" || lastName == "" || email == "" || tPassword == "" || cPassword == ""
            || address == "" || gender == "") {
            //alert("Please fill all details before submitting");
            document.getElementById("error").innerHTML = "*Please fill all details before submitting";
            return false;
        }

        //validation
        if (validateFirstName(firstName) && validateLastName(lastName) && validateEmail(email) && validatePassword(tPassword) &&
            validatecPassword(cPassword, tPassword) && validateAddress(address) && validateGender(gender)) {
            //Array to store all the user inputs
            var userList = [];

            //Add data to userList array
            userList.push({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: cPassword,
                address: address,
                gender: gender
            });

            //storing data to local storage
            var userListSerialized = JSON.stringify(userList);
            localStorage.setItem("userData", userListSerialized);
            //alert("Registered Successfully");
            window.open('../Login/Login.html');
        }
    })();
}

//validate firstName
function validateFirstName(firstName) {
    var letters = /^[A-Za-z]+$/;
    if (firstName.match(letters)) {
        return true;
    }
    else {
        document.getElementById("error").innerHTML = "*FirstName must have alphabet characters only";
        document.getElementById("firstName").focus();
        return false;
    }
}

//validate LastName
function validateLastName(lastName) {
    var letters = /^[A-Za-z]+$/;
    if (lastName.match(letters)) {
        return true;
    }
    else {
        document.getElementById("error").innerHTML = "*LastName must have alphabet characters only";
        document.getElementById("lastName").focus();
        return false;
    }
}

//validate Email
function validateEmail(email) {
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailFormat)) {
        return true;
    }
    else {
        document.getElementById("error").innerHTML = "*Please enter a valid email Id";
        document.getElementById("email").focus();
        return false;
    }
}

//validate Password
function validatePassword(tPassword) {
    var length = tPassword.length;
    if (length == 0 || length < 8) {
        document.getElementById("error").innerHTML = "*Password should not be empty and must be greater than 8";
        document.getElementById("password").focus();
        return false;
    }
    return true;
}

//validate confirmed Password
function validatecPassword(cPassword, tPassword) {
    var length = cPassword.length;
    if (length == 0 || length < 8 || tPassword != cPassword) {
        document.getElementById("error").innerHTML = "*Confirmed password is not matching with your password";
        document.getElementById("cPassword").focus();
        return false;
    }
    return true;
}

//validate address
function validateAddress(address) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (address.match(letters)) {
        return true;
    }
    else {
        document.getElementById("error").innerHTML = "*User address must have alphanumeric characters only";
        document.getElementById("address").focus();
        return false;
    }
}

//validate Gender
function validateGender(gender) {
    if (gender.toUpperCase() == "MALE") {
        return true;
    }
    else if (gender.toUpperCase() == "FEMALE") {
        return true;
    }
    else {
        document.getElementById("error").innerHTML = "*Value can only be Male or Female";
        document.getElementById("gender").focus();
        return false;
    }
}