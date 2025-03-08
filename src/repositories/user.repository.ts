import { UserEntity } from '../entities/user.entity';
import { userModel } from '../models/user.model';

export async function getUserById(id: UserEntity['id']) {
  return userModel.findById(id);
}
