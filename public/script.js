const form = document.querySelector('form');
const input = document.querySelector('input');
const taskList = document.createElement('ul');
document.body.appendChild(taskList);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const task = input.value.trim();
  if (!task) return;

  // Send task to server
  const response = await fetch('/tasks', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ task }),
  });

  if (response.ok) {
    input.value = '';
    loadTasks();
  } else {
    alert('Failed to add task');
  }
});

async function loadTasks() {
  const response = await fetch('/tasks');
  const tasks = await response.json();
  taskList.innerHTML = '';
  tasks.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t;
    taskList.appendChild(li);
  });
}

loadTasks();
