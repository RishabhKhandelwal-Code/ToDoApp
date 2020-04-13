/*Description -
It allows user to do all CRUD operations along with sorting and filtering of data*/

//Checks if the user is authenticated
(function isUserAuthenticated() {
    if (sessionStorage.getItem('AuthenticationState') === null) {
        window.open("AccessDenied.html", "_self");
    }
})();

var selectedRow = null

//On Form Submittion
function onFormSubmit() {
    var formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    }
    else {
        updateRecord(formData);
    }
    resetForm();
    //storing data in localStorage
    var formDataSerialized = JSON.stringify(formData);
    localStorage.setItem("formData", formDataSerialized);
}

//Loads already existing data from localStorage, if any
window.onload = function () {
    var formDataDeSerialized = JSON.parse(localStorage.getItem("formData"));
    if (formDataDeSerialized != null) {
        insertNewRecord(formDataDeSerialized);
    }
}

//Reads all the inputs from user
function readFormData() {
    var formData = {};
    formData["date"] = document.getElementById("date").value;
    formData["title"] = document.getElementById("title").value;
    formData["comment"] = document.getElementById("comment").value;
    formData["categories"] = document.getElementById("categories").value;
    return formData;
}

//Inserts new record in the table on form submit
function insertNewRecord(data) {
    var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.date;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.title;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.comment;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.categories;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

//Filers/Search data based on table content
function SearchItems() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        }
        else if (!tr[i].id.match('^tableHeader')) {
            tr[i].style.display = "none";
        }
    }
}

//Sorts table data
$(document).ready(function () {
    $(".list thead").on("click", "th", function () {
        // Which column is this?
        var index = $(this).index();

        // Get the tbody
        var tbody = $(this).closest("table").find("tbody");

        // Disconnect the rows and get them as an array
        var rows = tbody.children().detach().get();

        // Sort it
        rows.sort(function (left, right) {
            // Get the text of the relevant td from left and right
            var $left = $(left).children().eq(index);
            var $right = $(right).children().eq(index);
            return $left.text().localeCompare($right.text());
        });

        // Put them back in the tbody
        tbody.append(rows);
    });
});

//Reset form so as to make it available for new entries
function resetForm() {
    document.getElementById("date").value = "";
    document.getElementById("title").value = "";
    document.getElementById("comment").value = "";
    document.getElementById("categories").value = "";
    selectedRow = null;
}

//Edits the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("date").value = selectedRow.cells[0].innerHTML;
    document.getElementById("title").value = selectedRow.cells[1].innerHTML;
    document.getElementById("comment").value = selectedRow.cells[2].innerHTML;
    document.getElementById("categories").value = selectedRow.cells[3].innerHTML;
}

//Updates the user data
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.date;
    selectedRow.cells[1].innerHTML = formData.title;
    selectedRow.cells[2].innerHTML = formData.comment;
    selectedRow.cells[3].innerHTML = formData.categories;
}

//Deletes the selected row of a table
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("myTable").deleteRow(row.rowIndex);
        localStorage.removeItem("formData");
        resetForm();
    }
}

//To do log out
function logOut() {
    sessionStorage.clear();
    window.open("../Login/Login.html");
}