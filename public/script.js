const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Fetch tasks from backend
async function fetchTasks() {
  const res = await fetch("/tasks");
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    delBtn.onclick = () => deleteTask(task.id);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Add new task
addTaskBtn.onclick = async () => {
  const text = taskInput.value.trim();
  if (!text) return alert("Please enter a task!");
  const newTask = { id: Date.now().toString(), text };
  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  taskInput.value = "";
  fetchTasks();
};

// Delete task
async function deleteTask(id) {
  await fetch(`/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
}

// Initial fetch
fetchTasks();
