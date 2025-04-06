const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Task = require('../models/Task');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/qadb-test');
});

afterEach(async () => {
  await Task.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API de Gestión de Tareas', () => {
  test('TC-001: Crear una tarea válida', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Tarea 1', description: 'Descripción de prueba' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Tarea 1');
  });

  test('TC-002: Crear una tarea sin título', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ description: 'Falta el título' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('El título es obligatorio');
  });

  test('TC-003: Listar todas las tareas', async () => {
    await Task.create({ title: 'Tarea A' });
    await Task.create({ title: 'Tarea B' });

    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  test('TC-004: Actualizar una tarea existente', async () => {
    const task = await Task.create({ title: 'Vieja tarea' });

    const res = await request(app)
      .put(`/tasks/${task._id}`)
      .send({ title: 'Tarea actualizada', status: 'completada' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Tarea actualizada');
    expect(res.body.status).toBe('completada');
  });

  test('TC-005: Actualizar una tarea inexistente', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/tasks/${fakeId}`)
      .send({ title: 'No existe' });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Tarea no encontrada');
  });

  test('TC-006: Eliminar una tarea existente', async () => {
    const task = await Task.create({ title: 'Tarea para borrar' });

    const res = await request(app).delete(`/tasks/${task._id}`);
    expect(res.statusCode).toBe(204);
  });

  test('TC-007: Eliminar una tarea inexistente', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/tasks/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Tarea no encontrada');
  });

  test('TC-008: Crear una tarea con un estado inválido', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Tarea inválida',
        status: 'en progreso'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Estado no válido');
  });

  test('TC-009: Validar estado solo permitido al actualizar', async () => {
    const task = await Task.create({ title: 'Tarea' });

    const res = await request(app)
      .put(`/tasks/${task._id}`)
      .send({ status: 'en progreso' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Estado no válido');
  });

  test('TC-010: Crear múltiples tareas simultáneamente', async () => {
    const requests = [];

    for (let i = 0; i < 5; i++) {
      requests.push(
        request(app)
          .post('/tasks')
          .send({ title: `Tarea ${i}` })
      );
    }

    const responses = await Promise.all(requests);

    responses.forEach((res) => {
      expect(res.statusCode).toBe(201);
    });

    const allTasks = await Task.find();
    expect(allTasks.length).toBe(5);
  });
});
