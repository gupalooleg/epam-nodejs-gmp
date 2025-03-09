import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { DI } from '../db';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode, Message } from '../utils/constants';
import { TOKEN_KEY } from '../configs/config';

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export function getUserById(id: string) {
  return DI.userRepository.findOne({ id });
}

export async function loginUser(email: string, password: string) {
  const user = await DI.userRepository.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HttpError(Message.UserNotFound, HttpStatusCode.NotFound);
  }

  const tokenPayload: TokenPayload = { id: user.id, email: user.email, role: user.role };
  const token = jwt.sign(tokenPayload, TOKEN_KEY!, { expiresIn: '2h' });

  return { token };
}

export async function registerUser(email: string, password: string, role: string) {
  const user = await DI.userRepository.findOne({ email });
  if (user) {
    throw new HttpError(Message.UserExists, HttpStatusCode.Conflict);
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const newUser = DI.userRepository.create({ email, password: encryptedPassword, role });

  await DI.em.flush();

  return newUser.toResponse();
}
