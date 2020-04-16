/*Description -
It allows user to update their information and
hence saves it to localStorage*/

//To execute javascript code in "strict mode".
'use strict';

//Checks if the user is authenticated
(function() {
    if (sessionStorage.getItem('AuthenticationState') === null) {
        window.open("../AccessDenied/AccessDenied.html", "_self");
    }
})();

//To get data from local storage
var userListDeserialized = JSON.parse(localStorage.getItem("userData"));
//Note - userListDeserialized is been validated already in login.js

//Bind data to html
(function() {
    var firstName = userListDeserialized[0].firstName;
    var lastName = userListDeserialized[0].lastName;
    var email = userListDeserialized[0].email;
    var address = userListDeserialized[0].address;
    var password = userListDeserialized[0].password;

    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
    document.getElementById("email").value = email;
    document.getElementById("address").value = address;
    document.getElementById("password").value = password;
})();

//To update form data
function formUpdation() {
    (function(){
        //Get form data
        var uFirstName = document.profile.firstName.value;
        var uLastName = document.profile.lastName.value;
        var uEmail = document.profile.email.value;
        var uAddress = document.profile.address.value;
        var uPassword = document.profile.password.value;

        //Update it to local storage
        userListDeserialized[0].firstName = uFirstName;
        userListDeserialized[0].lastName = uLastName;
        userListDeserialized[0].email = uEmail;
        userListDeserialized[0].address = uAddress;
        userListDeserialized[0].password = uPassword;

        var userListSerialized = JSON.stringify(userListDeserialized);
        localStorage.setItem("userData", userListSerialized);
        alert("Data updated successfuly");
    })();
}
