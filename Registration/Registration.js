/*Description -
It validates and adds the user information to localStorage */

//To validate form inputs
function formValidation() {
    var firstName = document.registration.firstName.value;
    var lastName = document.registration.lastName.value;
    var email = document.registration.email.value;
    var tPassword = document.registration.password.value;
    var cPassword = document.registration.cPassword.value;
    var address = document.registration.address.value;
    var gender = document.registration.gender.value;

    if (firstName == "" || lastName == "" || email == "" || tPassword == "" || cPassword == ""
        || address == "" || gender == "") {
        alert("Please fill all details before submitting");
        return false;
    }

    //validation
    if (validateFirstName(firstName) && validateLastName(lastName) && validatePassword(tPassword) &&
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
        alert("Registered Successfully");
        window.open('../Login/Login.html');
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
function validatePassword(tPassword) {
    var length = tPassword.length;
    if (length == 0 || length < 8) {
        alert("Password should not be empty and must be greater than 8");
        //password.focus();
        return false;
    }
    return true;
}

//validate confirmed Password
function validatecPassword(cPassword, tPassword) {
    var length = cPassword.length;
    if (length == 0 || length < 8 || tPassword != cPassword) {
        alert("Confirmed password is not matching with your password.");
        //cPassword.focus();
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

