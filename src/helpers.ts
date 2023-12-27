import { IncomingMessage } from 'http';
import { Res, SendResponseArg, User } from './types';

export const getBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      body = JSON.parse(body);
      resolve(body);
    });
  });
};

export const validateUser = (body: any, id?: string): User => {
  let { email, dob, name } = body;
  if (!email || !dob || !name) {
    throw new Error('User data is not valid');
  }

  if (typeof email !== 'string') {
    throw new Error('Email must be a string');
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    throw new Error('Email is not valid');
  }

  if (typeof dob !== 'string') {
    throw new Error('Date of birth must be a string');
  }

  if (typeof name !== 'string') {
    throw new Error('Name must be a string');
  }

  if (name.length < 2) {
    throw new Error('Name must be at least 2 characters');
  }

  const isValidDate = !isNaN(Date.parse(dob));

  if (!isValidDate) {
    throw new Error('Date of birth is not valid');
  }

  email = email.trim();
  name = name.trim();
  dob = dob.trim();

  return {
    email,
    name,
    dob: new Date(Date.parse(dob)),
    id: id ?? Date.now().toString(),
  };
};

export const sendResponse = (
  res: Res,
  { statusCode, data }: SendResponseArg
) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      ...data,
      ok: statusCode < 299,
    })
  );
};
