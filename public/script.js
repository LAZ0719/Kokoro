const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const task = input.value.trim();
  if (!task) return;

  const res = await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task })
  });

  if (res.ok) {
    input.value = '';
    loadTasks();
  } else {
    alert('Failed to add task');
  }
});

async function loadTasks() {
  const res = await fetch('/tasks');
  const tasks = await res.json();
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;
    taskList.appendChild(li);
  });
}

loadTasks();
