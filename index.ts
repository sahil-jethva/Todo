let task = document.getElementById('tasks') as HTMLInputElement;
let taskList = document.getElementById('taskList') as HTMLDataListElement;
document.getElementById('filterButton')?.addEventListener('click', filteredData);
document.getElementById('filterActiveButton')?.addEventListener('click', filteredActiveData);
document.getElementById('AllTaskButton')?.addEventListener('click', AllFilterTask)

interface Task {
  tasks: string | number
}
function addData(): void {
  const taskValue = task.value;
  if (taskValue) {
    const existingTasks = localStorage.getItem('tasks');
    const tasks: Task[] = existingTasks ? JSON.parse(existingTasks) : [];
    tasks.push({ tasks: taskValue });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(taskValue);
    addTaskToUI(taskValue)
  }
  else {
    alert('Enter Task First')
  }
  task.value = '';
}

function addTaskToUI(task: any) {
  const li = document.createElement('li');
  const radio = document.createElement('input');
  const deleteTask = document.createElement('button');
  deleteTask.setAttribute('id', 'delete-btn')
  deleteTask.innerText = 'Delete'
  deleteTask.classList.add('delete-btn')
  // radio.type = 'radio';
  radio.setAttribute('type', 'radio')
  const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  let isCheck = existingTasks.find((t: { tasks: any; completed: boolean }) => t.tasks === task);

  if (isCheck?.completed) {
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
    } else {
      li.style.textDecoration = 'none';
      li.style.color = 'black';
    }
  });
  deleteTask.addEventListener('click', function () {
    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = existingTasks.filter((t: { tasks: any; }) => t.tasks !== task);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    li.remove();
  });
  li.textContent = task;
  li.prepend(radio);
  li.appendChild(deleteTask)
  taskList.appendChild(li);
}

function filteredData() {
  taskList.innerHTML = '';
  const existingTasks = localStorage.getItem('tasks');
  const tasks = existingTasks ? JSON.parse(existingTasks) : [];
  const completedTasks = tasks.filter((t: { tasks: string; completed: boolean }) => t.completed);
  completedTasks.forEach((task: { tasks: string; }) => addTaskToUI(task.tasks));
}

function filteredActiveData() {
  taskList.innerHTML = '';
  const existingTasks = localStorage.getItem('tasks');
  const tasks = existingTasks ? JSON.parse(existingTasks) : [];
  console.log(tasks);

  const completedTasks = tasks.filter((t: { tasks: string; completed: boolean }) =>!t.completed);
  completedTasks.forEach((task: { tasks: string; }) => addTaskToUI(task.tasks));
}
function AllFilterTask() {
  const allTask = localStorage.getItem('tasks')
  const tasks = allTask ? JSON.parse(allTask) : [];
  tasks.forEach((task: { tasks: string; }) => addTaskToUI(task.tasks));
}
function loadTasks() {
  const existingTasks = localStorage.getItem('tasks');
  const tasks = existingTasks ? JSON.parse(existingTasks) : [];
  tasks.forEach((task: { tasks: any; }) => addTaskToUI(task.tasks));
}

document.addEventListener('DOMContentLoaded', loadTasks);