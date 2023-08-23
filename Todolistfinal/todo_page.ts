const taskcontainer = document.getElementById("taskscontainer") as HTMLElement;
const taskname = document.getElementById("taskname") as HTMLInputElement;
let count = 0;
const search = document.getElementById("search") as HTMLInputElement;
let list: { name: string; id: string; completed: boolean }[] = [];

const searchfunc = (e: Event):void => {
    let typedValue = (e.target as HTMLInputElement).value;
    console.log(typedValue);
    const filteredItems = list.filter(item =>
        item.name.toLowerCase().includes(typedValue.toLowerCase())
    );
    displayFilteredItems(filteredItems);
};

search.addEventListener("input", searchfunc);

function displayFilteredItems(filteredItems: { name: string; id: string; completed: boolean }[]):void {
    taskcontainer.innerHTML = '';

    for (let listItem of filteredItems) {
        create_todoele(listItem.name);
    }
}

function deletetodoitem(todoitem: string) {
    let todoelement = document.getElementById(todoitem) as HTMLElement;
    taskcontainer.removeChild(todoelement);
    let elementindex = list.findIndex(eachitem => {
        if (eachitem.id === todoitem) {
            return true;
        } else {
            return false;
        }
    });
    list.splice(elementindex, 1);
}

function completed(option: string, todonameid: string, checkboxid: string, todoid: string) {
    let todoname = document.getElementById(todonameid) as HTMLElement;
    let checkbox = document.getElementById(checkboxid) as HTMLInputElement;

    if (option == 'Completed') {
        todoname.classList.add("namestrike");
        checkbox.checked = true;
        let reversedlist = list.slice().reverse();
        let elementindex = reversedlist.findIndex(eachitem => {
            if (eachitem.name === todoname.textContent) {
                return true;
            } else {
                return false;
            }
        });

        reversedlist[elementindex].completed = true;
    } else {
        todoname.classList.remove("namestrike");
        checkbox.checked = false;
    }
}

function create_todoele(name: string):void {
    let todoid = "todo" + JSON.stringify(count);
    let dropdownid = "dropdown" + JSON.stringify(count);
    let checkboxid = "checkbox" + JSON.stringify(count);
    let todonameid = "todoname" + JSON.stringify(count);
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

    dropdowncon.onchange = (e) => {
        let option = (e.target as HTMLSelectElement).value;
        completed(option, todonameid, checkboxid, todoid);
    };
    todocontainer.appendChild(dropdowncon);
    let buttonele = document.createElement("button");
    buttonele.textContent = "x";
    buttonele.classList.add("delbutton");
    buttonele.onclick = () => {
        deletetodoitem(todoid);
    };
    todocontainer.appendChild(buttonele);
    taskcontainer.appendChild(todocontainer);
    count += 1;
}

function addtodo():void {
    var taskname = document.getElementById("taskname") as HTMLInputElement;

    let tasks: string[] = [];
    for (let ele of list) {
        tasks.push(ele.name.toLowerCase());
    }
    if (tasks.indexOf(taskname.value.toLowerCase()) !== -1) {
        const reversedlist = list.slice().reverse();

        let elementindex = reversedlist.findIndex(eachitem => {
            if (eachitem.name === taskname.value) {
                return true;
            } else {
                return false;
            }
        });

        if (reversedlist[elementindex].completed == true) {
            create_todoele(taskname.value);
            list.push({ name: taskname.value, id: "todo" + JSON.stringify(count), completed: false });
            taskname.value = "";
        } else {
            alert("task already exists");
            taskname.value = "";
        }
    } else if (taskname.value == '') {
        alert("empty task");
    } else {
        create_todoele(taskname.value);
        list.push({ name: taskname.value, id: "todo" + JSON.stringify(count), completed: false });
        taskname.value = "";
    }
}

for (let listitem of list) {
    create_todoele(listitem.name);
}
