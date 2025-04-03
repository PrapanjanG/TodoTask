let todoItemsContainer = document.getElementById("todoItemsContainer");
let addNewTodoElement = document.getElementById("addNewTodo");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();

let todoListCounter = todoList.length;
let saveNewTodo = document.getElementById("saveNewTodo");
saveNewTodo.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInput = userInputElement.value;

    if (userInput === "") {
        alert("Enter a Valid Text");
        return;
    }

    todoListCounter = todoListCounter + 1;
    let NewTodo = {
        text: userInput,
        uniqueNo: todoListCounter,
        isChecked: false
    };

    todoList.push(NewTodo);
    calculateandAPPend(NewTodo);
    userInputElement.value = "";

}

addNewTodoElement.onclick = function() {
    onAddTodo();
}


function addStrikeThrough(checkedId, labelId, todoId) {
    let checkboxId = document.getElementById(checkedId);
    let LabelElementtext = document.getElementById(labelId);
    LabelElementtext.classList.toggle("text-decoration");

    let todoListchecked = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoListchecked];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
    console.log(todoListchecked);
}

function deteletheTodoElement(todoId) {
    let todoelement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoelement);

    let deletetodoElement = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletetodoElement, 1);
}


function calculateandAPPend(todo) {
    let labelId = "label" + todo.uniqueNo;
    let checkboxId = "mycheckBox" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let todoCheckBox = document.createElement("input");
    todoCheckBox.classList.add("checkbox-input");
    todoCheckBox.type = "checkbox";
    todoCheckBox.checked = todo.isChecked;
    todoCheckBox.id = checkboxId;
    todoCheckBox.onclick = function() {
        addStrikeThrough(checkboxId, labelId, todoId);
    }
    todoElement.appendChild(todoCheckBox);

    let LabelContainer = document.createElement("div");
    LabelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(LabelContainer);

    let LabelElement = document.createElement("label");
    LabelElement.classList.add("checkbox-label");
    LabelElement.id = labelId;
    LabelElement.setAttribute("for", checkboxId);
    LabelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        LabelElement.classList.add("text-decoration");
    }
    LabelContainer.appendChild(LabelElement);


    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    LabelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("delete-icon", "far", "fa-trash-alt");
    deleteIcon.onclick = function() {
        deteletheTodoElement(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);

}

for (let todo of todoList) {
    calculateandAPPend(todo);
}