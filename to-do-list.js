const inputTask = document.getElementById('inputTask');
const taskListElement = document.getElementById('taskList');
const doneTaskElement = document.getElementById('doneTask');
let priorityRadios = document.getElementsByName('priority');

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

  const priorityOrder = {
    low: 1,
    mid: 2,
    high: 3
  };

  tasks.sort((a, b) => {
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
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
      task.date = completeDate
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

    const showDate = document.createElement('span')
    showDate.innerText = task.date


    if (task.done) {
      text.style.textDecoration = 'line-through';
    }

    const completeDate = new Date().toLocaleString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      task.date = completeDate
      saveTasks()
      renderTaskList();
    });

    const priorityStars = document.createElement('span')

    if (task.priority === 'low') {
      priorityStars.innerHTML = '⭐'
    } else if (task.priority === 'mid') {
      priorityStars.innerHTML = '⭐⭐'
    } else {
      priorityStars.innerHTML = '⭐⭐⭐'
    }


    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(priorityStars);
    li.appendChild(doneButton);
    li.appendChild(deleteButton)
    li.appendChild(editButton)
    li.appendChild(showDate)

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

  if (priorityRadios[0].checked) {
    priority = 'low'
  } else if (priorityRadios[1].checked) {
    priority = 'mid'
  } else if (priorityRadios[2].checked) {
    priority = 'high'
  }


  if (task === '') return;

  tasks.push({
    text: task,
    done: false,
    date: new Date().toLocaleString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    priority: priority
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

function filterTasks() {

}



