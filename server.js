const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

let tasks = [];  // simple in-memory task store

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = req.body.task;
  if (task) {
    tasks.push(task);
    res.status(201).json({ message: 'Task added' });
  } else {
    res.status(400).json({ message: 'Task content missing' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
