import { db } from './db';
import { getBody, sendResponse, validateUser } from './helpers';
import { Req, Res } from './types';

export const createUser = async (req: Req, res: Res) => {
  try {
    const body = await getBody(req);
    const user = validateUser(body);
    db.push(user);
    sendResponse(res, { statusCode: 201, data: { result: user } });
  } catch (err: any) {
    sendResponse(res, { statusCode: 400, data: { error: err.message } });
  }
};

export const listUsers = (req: Req, res: Res) => {
  sendResponse(res, { statusCode: 200, data: { result: db } });
};

export const getUser = (req: Req, res: Res) => {
  const id = req.url?.split('/').pop() ?? '-1';
  const user = db.find((d) => d.id === id);
  if (user) {
    sendResponse(res, { statusCode: 200, data: { result: user } });
    return;
  }

  sendResponse(res, { statusCode: 404, data: { error: 'User not found' } });
};

export const updateUser = async (req: Req, res: Res) => {
  const id = req.url?.split('/').pop() ?? '-1';
  const idx = db.findIndex((d) => d.id === id);
  if (idx < 0) {
    sendResponse(res, { statusCode: 404, data: { error: 'User not found' } });
    return;
  }
  const body = await getBody(req);
  const updatedUser = validateUser(body, id);
  db[idx] = updatedUser;
  sendResponse(res, { statusCode: 200, data: { result: updateUser } });
};

export const deleteUser = async (req: Req, res: Res) => {
  const id = req.url?.split('/').pop() ?? '-1';
  const idx = db.findIndex((d) => d.id === id);
  if (idx < 0) {
    sendResponse(res, { statusCode: 404, data: { error: 'User not found' } });
    return;
  }
  db.splice(idx, 1);
  sendResponse(res, { statusCode: 200, data: { result: { id } } });
};
