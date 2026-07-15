const inputTask = document.getElementById('inputTask');
const taskListElement = document.getElementById('taskList');
const doneTaskElement = document.getElementById('doneTask');
const category = document.getElementById('category');
const priority = document.getElementById('priority');


let tasks = [];

function filterTasks() {
  const selectedCategory = category.value;
  const selectedPriority = priority.value;

  if (selectedCategory === 'all') {
    renderTaskList();
  } else if (selectedCategory === 'done') {
    renderTaskList().style.display = 'none';
    tasks = tasks.filter(task => task.done);
    renderTaskList();
  }
}

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

    const doneButton = document.createElement('button')
    doneButton.innerText = 'Done'
    doneButton.addEventListener('click', () => {
      task.done = true;
      saveTasks()
      renderTaskList();
    })

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter(t => t !== task);
      saveTasks()
      renderTaskList();
    })

    const editButton = document.createElement('button')
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => {
      const newText = prompt('Edit your task', task.text)
      task.text = newText
      saveTasks()
      renderTaskList();
    })

    const date = document.createElement('span');
    date.innerText = new Date().toLocaleString();


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
    li.appendChild(doneButton);
    li.appendChild(deleteButton)
    li.appendChild(editButton)
    li.appendChild(date)

    if (task.done) {
      doneTaskElement.appendChild(li);
      doneButton.style.display = 'none'
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



