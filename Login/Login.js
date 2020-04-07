/*Description -
Login.js, authorizes a valid user to access the other application features 
like Todo list, Profile and SignOut*/

//Check the user inputs
function check(form) {
    if (form.userid.value == "" || form.pswrd.value == "") {
        alert("Please fill all the details before submitting");
        return false;
    }

    //assigning form inputs to the variables
    formUserName = form.userid.value;
    formUserPassword = form.pswrd.value;

    //Get data from local storage
    var userList_deserialized = JSON.parse(localStorage.getItem("userData"));

    //validate localstorage for null or undefined
    if (userList_deserialized == undefined || userList_deserialized == null) {
        if (window.confirm('You don\'t have a register account. Please click OK to SignUp')) {
            window.open("http://localhost:58162/Registration/Registration.html");
        }
    }

    //assigning localStorage values to variables
    var userName = userList_deserialized[0].email;
    var password = userList_deserialized[0].password;

    //Logic for authorizing the user
    if (ValidateUserName(formUserName) && ValidateFormpassword(formUserPassword)) {
        //Storing user information on successful login
        sessionStorage.setItem("AuthenticationState", "Authenticated");
        alert("Logged In successfully");
        window.open("http://localhost:58162/Todo/Todo.html");
    }
    else {
        alert("Invalid UserName or Password");
    }

    //validate userName
    function ValidateUserName(formUserName) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (formUserName.match(mailformat) && formUserName.toUpperCase() == userName.toUpperCase()) {
            return true;
        }
        else {
            return false;
        }
    }

    //validate password
    function ValidateFormpassword(formUserPassword) {
        if (formUserPassword == password) {
            return true;
        }
        else {
            return false;
        }
    }
}