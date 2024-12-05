var _a, _b, _c;
var task = document.getElementById('tasks');
var taskList = document.getElementById('taskList');
(_a = document.getElementById('filterButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', filteredData);
(_b = document.getElementById('filterActiveButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', filteredActiveData);
(_c = document.getElementById('AllTaskButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', AllFilterTask);
function addData() {
    var taskValue = task.value;
    if (taskValue) {
        var existingTasks = localStorage.getItem('tasks');
        var tasks = existingTasks ? JSON.parse(existingTasks) : [];
        tasks.push({ tasks: taskValue });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(taskValue);
        addTaskToUI(taskValue);
    }
    else {
        alert('Enter Task First');
    }
    task.value = '';
}
function addTaskToUI(task) {
    var li = document.createElement('li');
    var radio = document.createElement('input');
    var deleteTask = document.createElement('button');
    deleteTask.setAttribute('id', 'delete-btn');
    deleteTask.innerText = 'Delete';
    deleteTask.classList.add('delete-btn');
    // radio.type = 'radio';
    radio.setAttribute('type', 'radio');
    var existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    var isCheck = existingTasks.find(function (t) { return t.tasks === task; });
    if (isCheck === null || isCheck === void 0 ? void 0 : isCheck.completed) {
        li.style.textDecoration = 'line-through';
        li.style.color = 'gray';
        radio.checked = true;
    }
    radio.addEventListener('change', function () {
        if (!isCheck) {
            isCheck = { tasks: task, completed: false };
            existingTasks.push(isCheck);
        }
        isCheck.completed = radio.checked;
        localStorage.setItem('tasks', JSON.stringify(existingTasks));
        if (radio.checked) {
            li.style.textDecoration = 'line-through';
            li.style.color = 'gray';
        }
        else {
            li.style.textDecoration = 'none';
            li.style.color = 'black';
        }
    });
    deleteTask.addEventListener('click', function () {
        var existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        var updatedTasks = existingTasks.filter(function (t) { return t.tasks !== task; });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        li.remove();
    });
    li.textContent = task;
    li.prepend(radio);
    li.appendChild(deleteTask);
    taskList.appendChild(li);
}
function filteredData() {
    taskList.innerHTML = '';
    var existingTasks = localStorage.getItem('tasks');
    var tasks = existingTasks ? JSON.parse(existingTasks) : [];
    var completedTasks = tasks.filter(function (t) { return t.completed; });
    completedTasks.forEach(function (task) { return addTaskToUI(task.tasks); });
}
function filteredActiveData() {
    taskList.innerHTML = '';
    var existingTasks = localStorage.getItem('tasks');
    var tasks = existingTasks ? JSON.parse(existingTasks) : [];
    console.log(tasks);
    var completedTasks = tasks.filter(function (t) { return !t.completed; });
    completedTasks.forEach(function (task) { return addTaskToUI(task.tasks); });
}
function AllFilterTask() {
    var allTask = localStorage.getItem('tasks');
    var tasks = allTask ? JSON.parse(allTask) : [];
    tasks.forEach(function (task) { return addTaskToUI(task.tasks); });
}
function loadTasks() {
    var existingTasks = localStorage.getItem('tasks');
    var tasks = existingTasks ? JSON.parse(existingTasks) : [];
    tasks.forEach(function (task) { return addTaskToUI(task.tasks); });
}
document.addEventListener('DOMContentLoaded', loadTasks);
