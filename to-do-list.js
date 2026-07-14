const inputTask = document.getElementById('inputTask');
const taskListElement = document.getElementById('taskList');
const doneTaskElement = document.getElementById('doneTask');

let tasks = [];

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

    if (task.done) {
      text.style.textDecoration = 'line-through';
    }

    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      renderTaskList();
    });

    li.appendChild(checkbox);
    li.appendChild(text);

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
  renderTaskList();
}

inputTask.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});