const inputTask = document.getElementById('inputTask');
const taskListElement = document.getElementById('taskList')
let taskList = []

function renderTaskList() {
  taskListElement.innerHTML = '';
  taskList.forEach(task => {
    const li = document.createElement('li')

    li.textContent = task;
    taskListElement.appendChild(li);
  })
}

function addTask() {
  const task = inputTask.value.trim();

  if (task === '') {
    return;
  }


  taskList.push(task);
  renderTaskList()
  inputTask.value = '';
}