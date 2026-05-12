const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = "";
    saveData();
}
function filterTasks(type) {
    let tasks = listContainer.getElementsByTagName("li");

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        if (type === "all") {
            task.style.display = "flex";
        }
        else if (type === "done") {
            if (task.classList.contains("checked")) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        }
        else if (type === "undone") {
            if (!task.classList.contains("checked")) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        }
    }
}
inputBox.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();