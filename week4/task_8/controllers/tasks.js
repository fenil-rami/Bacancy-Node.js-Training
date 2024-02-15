const fs = require('fs/promises');

const internalServerError = (res) => res.end('Some unexpected error has occurred. Please try again after some time.');
const tasksPath = `${__dirname}/../tasks.json`;

// EJS pages controllers
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await fs.readFile(tasksPath, 'utf-8');
    return res.render('all-tasks', {
      tasks: JSON.parse(tasks),
    });
  } catch (error) {
    return internalServerError(res);
  }
};

exports.updateTask = async (req, res) => {
  try {
    let tasks = await fs.readFile(tasksPath, 'utf-8');
    tasks = JSON.parse(tasks);

    const taskToUpdate = tasks.filter((task) => task.id === req.params.id);

    if (!taskToUpdate || taskToUpdate === undefined || taskToUpdate.length === 0) return res.redirect('/');

    return res.render('update-task', {
      task: taskToUpdate[0],
    });
  } catch (error) {
    return internalServerError(res);
  }
};

// API controllers
exports.createTaskAPI = async (req, res) => {
  try {
    const { title, description } = req.body;

    let tasks = await fs.readFile(tasksPath, 'utf-8');
    tasks = JSON.parse(tasks);

    tasks.push({
      id: crypto.randomUUID(),
      title,
      description,
    });

    await fs.writeFile(tasksPath, JSON.stringify(tasks));
    res.redirect('/tasks');
  } catch (error) {
    return internalServerError(res);
  }
};

exports.updateTaskAPI = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    let tasks = await fs.readFile(tasksPath, 'utf-8');

    tasks = JSON.parse(tasks);

    tasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { id, title, description };
    });

    await fs.writeFile(tasksPath, JSON.stringify(tasks));
    return res.redirect('/tasks');
  } catch (error) {
    return internalServerError(res);
  }
};

exports.deleteTaskAPI = async (req, res) => {
  try {
    const { id } = req.params;

    let tasks = await fs.readFile(tasksPath, 'utf-8');

    tasks = JSON.parse(tasks);

    const updatedTasks = tasks.filter((task) => task.id !== id);

    await fs.writeFile(tasksPath, JSON.stringify(updatedTasks));
    return res.redirect('/tasks');
  } catch (error) {
    return internalServerError(res);
  }
};
