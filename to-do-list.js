const inputTask = document.getElementById('inputTask');
const taskListElement = document.getElementById('taskList')
const doneTaskElement = document.getElementById('doneTask')
let taskList = []
let completedTasks = []
let doneTask = []

function renderTaskList() {
  taskListElement.innerHTML = '';

  taskList.forEach(task => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const text = document.createElement('span');
    text.innerText = task;

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        text.style.textDecoration = 'line-through';
      } else {
        text.style.textDecoration = 'none';
      }
    });

    const doneButton = document.createElement('button');
    doneButton.innerText = 'Done';

    checkbox.addEventListener('click', () => {
      const index = taskList.indexOf(task);

      if (index > -1) {
        doneTask.push(task)
        taskList.splice(index, 1);
      }

      renderTaskList();
      renderDoneList();
    });

function renderDoneList() {
  doneTaskElement.innerHTML = '';
  doneTask.forEach(task => {
    const doneLi = document.createElement('li')
    doneLi.innerHTML = task 

    doneTaskElement.appendChild(doneLi)

    doneLi.style.textDecoration = 'line-through'

  })

}

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(doneButton);
    doneTaskElement.appendChild(li);

    taskListElement.appendChild(li);
  });
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

inputTask.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask()
  }
})