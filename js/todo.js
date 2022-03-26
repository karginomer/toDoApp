const form = document.querySelector("form");
const input = document.querySelector("#taskName");
const deleteAll = document.querySelector("#deleteAll");
const taskList = document.querySelector("#taskList");
var items = [];
eventListeners();
loadItems();

function eventListeners() {
    form.addEventListener("submit", addNewItem);
    taskList.addEventListener("click", deleteItem);
    deleteAll.addEventListener("click", deleteAllTasks);
}

function loadItems() {
    taskList.innerHTML = "";
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    })
}

function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.clear();
    localStorage.setItem('items', JSON.stringify(items));

}





function createItem(text) {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));

    const a = document.createElement("a");
    a.classList = "deleteItem float-end";
    a.setAttribute("href", "javascript:0");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    taskList.appendChild(li);
    input.value = "";
}

function addNewItem(e) {
    e.preventDefault();
    if (input.value === "") {
        alert("Please enter a task");
    } else {
        setItemToLS(input.value);
        createItem(input.value);
    }

}

function deleteItem(e) {
    e.preventDefault();
    if (e.target.className === "fas fa-times") {
        if (confirm("Are you sure you want to delete ?")) {
            let parent = e.target.parentElement.parentElement;
            parent.remove();
            deleteItemFromLS(parent.textContent);
        } else {
            alert("You didn't delete this task..!");
        }

    }
}

function deleteAllTasks(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete all tasks ?")) {
        //taskList.innerHTML = "";
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
}

function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item == text) {
            item.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));



}