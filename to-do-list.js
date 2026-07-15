const inputTask = document.getElementById('inputTask');
const taskListElement = document.getElementById('taskList');
const doneTaskElement = document.getElementById('doneTask');

let tasks = [];

function saveTasks() {
  const stringifyTasks = JSON.stringify(tasks)
  localStorage.setItem('tasks', stringifyTasks)
}

function loadTasks() {
  tasks = JSON.parse(localStorage.getItem('tasks'))
}

loadTasks()
renderTaskList()

function renderTaskList() {
  taskListElement.innerHTML = '';
  doneTaskElement.innerHTML = '';

  tasks.forEach(task => {

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;

    const text = document.createElement('span');
    text.innerText = task.text;

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter(t => t !== task);
      saveTasks()
      renderTaskList();


    })

    if (task.done) {
      text.style.textDecoration = 'line-through';
    }

    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      saveTasks()
      renderTaskList();
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteButton)

    if (task.done) {
      doneTaskElement.appendChild(li);
    } else {
      taskListElement.appendChild(li);
    }


  });
}

function addTask() {
  const task = inputTask.value.trim();

  if (task === '') return;

  tasks.push({
    text: task,
    done: false
  });

  inputTask.value = '';
  saveTasks()
  renderTaskList();


}

inputTask.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();

  }
});

