/*Description -
It validates and adds the user information to localStorage */

//To validate form inputs
function formValidation() {
    var firstName = document.registration.firstName.value;
    var lastName = document.registration.lastName.value;
    var email = document.registration.email.value;
    var tpassword = document.registration.password.value;
    var cpassword = document.registration.cpassword.value;
    var address = document.registration.address.value;
    var gender = document.registration.gender.value;

    if (firstName == "" || lastName == "" || email == "" || tpassword == "" || cpassword == ""
        || address == "" || gender == "") {
        alert("Please fill all details before submitting");
        return false;
    }

    //validation
    if (validateFirstName(firstName)) {
        if (validateLastName(lastName)) {
            if (validatePassword(tpassword)) {
                if (validateCPassword(cpassword, tpassword)) {
                    if (validateAddress(address)) {
                        if (validateGender(gender)) {
                            //Array to store all the user inputs
                            var userList = [];

                            //Add data to userList array
                            userList.push({
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                password: cpassword,
                                address: address,
                                gender: gender
                            });

                            //storing data to local storage
                            var userListSerialized = JSON.stringify(userList);
                            localStorage.setItem("userData", userListSerialized);
                            alert("Registered Successfully");
                            window.open('http://localhost:58162/Login/Login.html');
                        }
                    }
                }
            }
        }
    }
}

//validate firstName
function validateFirstName(firstName) {
    var letters = /^[A-Za-z]+$/;
    if (firstName.match(letters)) {
        return true;
    }
    else {
        alert('FirstName must have alphabet characters only');
        //firstName.focus(); -  //I removed it, as IE doesn't suport it.
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
        alert('LastName must have alphabet characters only');
        //lastName.focus();
        return false;
    }
}

//validate Password
function validatePassword(tpassword) {
    var length = tpassword.length;
    if (length == 0 || length < 8) {
        alert("Password should not be empty and must be greater than 8");
        //password.focus();
        return false;
    }
    return true;
}

//validate confirmed Password
function validateCPassword(cpassword, tpassword) {
    var length = cpassword.length;
    if (length == 0 || length < 8 || tpassword != cpassword) {
        alert("Confirmed password is not matching with your password.");
        //cpassword.focus();
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
        alert('User address must have alphanumeric characters only');
        //address.focus();
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
        alert('Value can only be Male or Female');
        return false;
    }
}

