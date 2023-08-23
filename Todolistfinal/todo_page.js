var taskcontainer = document.getElementById("taskscontainer");
var taskname = document.getElementById("taskname");
var count = 0;
var search = document.getElementById("search");
var list = [];
var searchfunc = function (e) {
    var typedValue = e.target.value;
    console.log(typedValue);
    var filteredItems = list.filter(function (item) {
        return item.name.toLowerCase().includes(typedValue.toLowerCase());
    });
    displayFilteredItems(filteredItems);
};
search.addEventListener("input", searchfunc);
function displayFilteredItems(filteredItems) {
    taskcontainer.innerHTML = '';
    for (var _i = 0, filteredItems_1 = filteredItems; _i < filteredItems_1.length; _i++) {
        var listItem = filteredItems_1[_i];
        create_todoele(listItem.name);
    }
}
function deletetodoitem(todoitem) {
    var todoelement = document.getElementById(todoitem);
    taskcontainer.removeChild(todoelement);
    var elementindex = list.findIndex(function (eachitem) {
        if (eachitem.id === todoitem) {
            return true;
        }
        else {
            return false;
        }
    });
    list.splice(elementindex, 1);
}
function completed(option, todonameid, checkboxid, todoid) {
    var todoname = document.getElementById(todonameid);
    var checkbox = document.getElementById(checkboxid);
    if (option == 'Completed') {
        todoname.classList.add("namestrike");
        checkbox.checked = true;
        var reversedlist = list.slice().reverse();
        var elementindex = reversedlist.findIndex(function (eachitem) {
            if (eachitem.name === todoname.textContent) {
                return true;
            }
            else {
                return false;
            }
        });
        reversedlist[elementindex].completed = true;
    }
    else {
        todoname.classList.remove("namestrike");
        checkbox.checked = false;
    }
}
function create_todoele(name) {
    var todoid = "todo" + JSON.stringify(count);
    var dropdownid = "dropdown" + JSON.stringify(count);
    var checkboxid = "checkbox" + JSON.stringify(count);
    var todonameid = "todoname" + JSON.stringify(count);
    var todocontainer = document.createElement("div");
    todocontainer.id = todoid;
    todocontainer.classList.add("todocontainer");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = checkboxid;
    var check_name = document.createElement("div");
    check_name.classList.add("checkbox_name");
    check_name.appendChild(checkbox);
    var todoname = document.createElement("p");
    todoname.classList.add("todoname");
    todoname.id = todonameid;
    todoname.textContent = name;
    check_name.appendChild(todoname);
    todocontainer.appendChild(check_name);
    var dropdowncon = document.createElement("select");
    var option1 = document.createElement("option");
    option1.value = "To start";
    option1.textContent = "To start";
    dropdowncon.id = dropdownid;
    dropdowncon.appendChild(option1);
    var option2 = document.createElement("option");
    option2.value = "In progress";
    option2.textContent = "In Progress";
    dropdowncon.appendChild(option2);
    var option3 = document.createElement("option");
    option3.value = "Completed";
    option3.textContent = "Completed";
    dropdowncon.appendChild(option3);
    dropdowncon.classList.add("selectele");
    dropdowncon.onchange = function (e) {
        var option = e.target.value;
        completed(option, todonameid, checkboxid, todoid);
    };
    todocontainer.appendChild(dropdowncon);
    var buttonele = document.createElement("button");
    buttonele.textContent = "x";
    buttonele.classList.add("delbutton");
    buttonele.onclick = function () {
        deletetodoitem(todoid);
    };
    todocontainer.appendChild(buttonele);
    taskcontainer.appendChild(todocontainer);
    count += 1;
}
function addtodo() {
    var taskname = document.getElementById("taskname");
    var tasks = [];
    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
        var ele = list_2[_i];
        tasks.push(ele.name.toLowerCase());
    }
    if (tasks.indexOf(taskname.value.toLowerCase()) !== -1) {
        var reversedlist = list.slice().reverse();
        var elementindex = reversedlist.findIndex(function (eachitem) {
            if (eachitem.name === taskname.value) {
                return true;
            }
            else {
                return false;
            }
        });
        if (reversedlist[elementindex].completed == true) {
            create_todoele(taskname.value);
            list.push({ name: taskname.value, id: "todo" + JSON.stringify(count), completed: false });
            taskname.value = "";
        }
        else {
            alert("task already exists");
            taskname.value = "";
        }
    }
    else if (taskname.value == '') {
        alert("empty task");
    }
    else {
        create_todoele(taskname.value);
        list.push({ name: taskname.value, id: "todo" + JSON.stringify(count), completed: false });
        taskname.value = "";
    }
}
for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
    var listitem = list_1[_i];
    create_todoele(listitem.name);
}
