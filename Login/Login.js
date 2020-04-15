/*Description -
Login.js, authorizes a valid user to access the other application features 
like Todo list, Profile and SignOut*/

//Checks if the user is authenticated then it avoids redirecting him/her to Login Page
(function isUserAuthenticated() {
    if (sessionStorage.getItem('AuthenticationState') === "Authenticated") {
        window.open("../Todo/Todo.html", "_self");
    }
})();

//Check the user inputs
function check(form) {
    if (form.userId.value == "" || form.pswrd.value == "") {
        document.getElementById("error").innerHTML = "*Please fill all the details before submitting";
        return false;
    }

    //assigning form inputs to the variables
    formUserName = form.userId.value;
    formUserPassword = form.pswrd.value;

    //Get data from local storage
    var userListDeserialized = JSON.parse(localStorage.getItem("userData"));

    //validate localstorage for null or undefined
    if (userListDeserialized == undefined || userListDeserialized == null) {
        if (window.confirm('You don\'t have a register account. Please click OK to SignUp')) {
            window.location.href = "../Registration/Registration.html";
        }
    }

    //assigning localStorage values to variables
    var userName = userListDeserialized[0].email;
    var password = userListDeserialized[0].password;

    //Logic for authorizing the user
    if (validateUserName(formUserName) && validateFormPassword(formUserPassword)) {
        //Storing user information on successful login
        sessionStorage.setItem("AuthenticationState", "Authenticated");
        window.open("../Todo/Todo.html");
    }
    else {
        document.getElementById("error").innerHTML = "*Invalid UserName or Password";
        document.getElementById("password").focus();
    }

    //validate userName
    function validateUserName(formUserName) {
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (formUserName.match(mailFormat) && formUserName.toUpperCase() == userName.toUpperCase()) {
            return true;
        }
        else {
            return false;
        }
    }

    //validate password
    function validateFormPassword(formUserPassword) {
        if (formUserPassword == password) {
            return true;
        }
        else {
            return false;
        }
    }
}