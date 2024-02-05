/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const tasksPath = `${__dirname}/tasks.json`;
const app = express();
const PORT = 3030;

const internalServerError = (res) => res.end('Some unexpected error has occurred. Please try again after some time.');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/tasks');
});

app.get('/tasks', (req, res) => {
  fs.readFile(tasksPath, 'utf-8', (err, tasks) => {
    if (err) return internalServerError(res);
    res.render('all-tasks', {
      tasks: JSON.parse(tasks),
    });
  });
});

app.get('/add-task', (req, res) => {
  res.render('add-task');
});

app.get('/update-task/:id', (req, res) => {
  fs.readFile(tasksPath, 'utf-8', (err, tasks) => {
    if (err) return internalServerError(res);
    tasks = JSON.parse(tasks);

    const taskToUpdate = tasks.filter((task) => task.id === req.params.id);

    if (!taskToUpdate || taskToUpdate === undefined || taskToUpdate.length === 0) return res.redirect('/');

    res.render('update-task', {
      task: taskToUpdate[0],
    });
  });
});

app.post('/api/tasks/add', (req, res) => {
  const { title, description } = req.body;

  fs.readFile(tasksPath, 'utf-8', (err, tasks) => {
    if (err) return internalServerError(res);
    tasks = JSON.parse(tasks);

    tasks.push({
      id: crypto.randomUUID(),
      title,
      description,
    });

    fs.writeFile(tasksPath, JSON.stringify(tasks), (error) => {
      if (error) return internalServerError(res);
      res.redirect('/tasks');
    });
  });
});

app.post('/api/tasks/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  fs.readFile(tasksPath, 'utf-8', (err, tasks) => {
    if (err) return internalServerError(res);

    tasks = JSON.parse(tasks);

    tasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { id, title, description };
    });

    fs.writeFile(tasksPath, JSON.stringify(tasks), (error) => {
      if (error) return internalServerError(res);
      res.redirect('/tasks');
    });
  });
});

app.post('/api/tasks/delete/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(tasksPath, 'utf-8', (err, tasks) => {
    if (err) return internalServerError(res);

    tasks = JSON.parse(tasks);

    const updatedTasks = tasks.filter((task) => task.id !== id);

    fs.writeFile(tasksPath, JSON.stringify(updatedTasks), (error) => {
      if (error) return internalServerError(res);

      res.redirect('/tasks');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
