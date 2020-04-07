/*Description -
It allows user to update their information and
hence saves it to localStorage*/

//Checks if the user is authenticated
(function IsuserAuthenticated() {
    if (sessionStorage.getItem('AuthenticationState') === null) {
        window.open("AccessDenied.html", "_self");
    }
})();

//To get data from local storage
var userList_deserialized = JSON.parse(localStorage.getItem("userData"));
//Note - userList_deserialized is been validated already in login.js

//Bind data to html
(function BindData() {
    var firstName = userList_deserialized[0].firstName;
    var lastName = userList_deserialized[0].lastName;
    var email = userList_deserialized[0].email;
    var address = userList_deserialized[0].address;
    var password = userList_deserialized[0].password;

    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
    document.getElementById("email").value = email;
    document.getElementById("address").value = address;
    document.getElementById("password").value = password;
})();

//To update form data
function formUpdation() {
    //Get form data
    var UFirstName = document.profile.firstName.value;
    var ULastName = document.profile.lastName.value;
    var UEmail = document.profile.email.value;
    var UAddress = document.profile.address.value;
    var UPassword = document.profile.password.value;

    //Update it to local storage
    userList_deserialized[0].firstName = UFirstName;
    userList_deserialized[0].lastName = ULastName;
    userList_deserialized[0].email = UEmail;
    userList_deserialized[0].address = UAddress;
    userList_deserialized[0].password = UPassword;

    var userList_serialized = JSON.stringify(userList_deserialized);
    localStorage.setItem("userData", userList_serialized);
    alert("Data updated successfuly");
}
