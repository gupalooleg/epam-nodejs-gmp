import { UserEntity } from '../entities/user.entity';
import * as userRepository from '../repositories/user.repository';

export function getUserById(id: UserEntity['id']) {
  return userRepository.getUserById(id);
}
