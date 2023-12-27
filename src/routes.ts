import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from './services';
import { Routes } from './types';

export const routes: Routes = [
  {
    path: '/api/v1/users',
    method: 'POST',
    service: createUser,
  },
  {
    path: '/api/v1/users',
    method: 'GET',
    service: listUsers,
  },
  {
    path: /\/api\/v1\/users\/([0-9]+)/,
    method: 'GET',
    service: getUser,
  },
  {
    path: /\/api\/v1\/users\/([0-9]+)/,
    method: 'DELETE',
    service: deleteUser,
  },
  {
    path: /\/api\/v1\/users\/([0-9]+)/,
    method: 'PUT',
    service: updateUser,
  },
];
