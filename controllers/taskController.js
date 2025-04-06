const Task = require('../models/Task');

const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  if (!title) return res.status(400).json({ error: 'El título es obligatorio' });
  if (status && !['pendiente', 'completada'].includes(status)) {
    return res.status(400).json({ error: 'Estado no válido' });
  }

  const newTask = new Task({ title, description, status });
  await newTask.save();
  res.status(201).json(newTask);
};

const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (status && !['pendiente', 'completada'].includes(status)) {
    return res.status(400).json({ error: 'Estado no válido' });
  }

  const task = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(task);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.status(204).send();
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
