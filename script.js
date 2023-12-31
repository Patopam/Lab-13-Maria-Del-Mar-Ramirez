function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      createTaskElement(task.text, task.state, task.id);
    });
  }
  
  function saveTasks() {
    const taskElements = document.querySelectorAll('.task');
    const tasks = [];
    taskElements.forEach((task, index) => {
      tasks.push({
        id: index,
        text: task.querySelector('.task-text').innerText,
        state: task.parentElement.id
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function createTaskElement(text, state, id) {
    const line = document.createElement('line');
    line.className = 'task';
    line.setAttribute('data-id', id);
  
    const textNode = document.createElement('span');
    textNode.className = 'task-text';
    textNode.innerText = text;
    line.appendChild(textNode);
  
    const upButton = document.createElement('button1');
    upButton.innerText = '▬';
    upButton.addEventListener('click', function() {
      moveTask(this, 'up');
    });
    line.appendChild(upButton);
  
    const downButton = document.createElement('button2');
    downButton.innerText = '✔';
    downButton.addEventListener('click', function() {
      moveTask(this, 'down');
    });
    line.appendChild(downButton);
  
    const deleteButton = document.createElement('button3');
    deleteButton.innerText = '✕';
    deleteButton.addEventListener('click', function() {
      deleteTask(this);
    });
    line.appendChild(deleteButton);
  
    document.getElementById(state).appendChild(line);
  }
  
  function moveTask(button, direction) {
    const task = button.parentElement;
    const currentList = task.parentElement;
    const targetList = direction === 'up' ? currentList.previousElementSibling : currentList.nextElementSibling;
  
    if (targetList) {
      targetList.appendChild(task);
      saveTasks();
    }
  }
  function deleteTask(button) {
    const task = button.parentElement;
    task.remove();
    saveTasks();
  }
  
  // Create a new task
  document.getElementById('boton-crear').addEventListener('click', function() {
    const text = document.getElementById('texto-tarjeta').value.trim();
    if (text !== '') {
      createTaskElement(text, 'To-Do', document.querySelectorAll('.task').length);
      saveTasks();
      document.getElementById('texto-tarjeta').value = '';
    }
  });
  
  // Load tasks on page load
  loadTasks();