import { getRepository } from 'typeorm';
import { Tasks } from '../entity/Tasks';
import { request, Request, response, Response } from 'express';

export const getTasks = async (request: Request, response: Response) => {
  const tasks = await getRepository(Tasks).find();
  return response.json(tasks);
};

export const getTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = await getRepository(Tasks).findOne(id);
  return response.json(task);
};

export const saveTask = async (request: Request, response: Response) => {
  const task = await getRepository(Tasks).save(request.body);
  return response.json(task);
};

export const updateTask = async (request: Request, response: Response) => {
  const { id } = request.params;

  const task = await getRepository(Tasks).update(id, request.body);
  //retorna se alguma task foi afetada no banco
  if (task.affected === 1) {
    const taskUpdated = await getRepository(Tasks).findOne(id);
    return response.json(taskUpdated);
  }
  return response.status(404).json({ message: 'task not found' });
};

export const finishedTask = async (request: Request, response: Response) => {
  const { id } = request.params;

  // passart um obj para atualizar a coluna
  const task = await getRepository(Tasks).update(id, {
    finished: true,
  });

  if (task.affected === 1) {
    const taskUpdated = await getRepository(Tasks).findOne(id);
    return response.json({ message: 'Task finished' });
  }
  return response.status(404).json({ message: 'task not found' });
};

export const removeTask = async (request: Request, response: Response) => {
  const { id } = request.params;

  // passart um obj para atualizar a coluna
  const task = await getRepository(Tasks).delete(id);

  if (task.affected === 1) {
    const taskUpdated = await getRepository(Tasks).findOne(id);
    return response.json({ message: 'Task removed' });
  }
  return response.status(404).json({ message: 'task not found' });
};
