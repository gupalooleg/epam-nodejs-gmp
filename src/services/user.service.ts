import { DI } from '../db';

export function getUserById(id: string) {
  return DI.userRepository.findOne({ id });
}
