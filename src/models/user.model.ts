import mongoose, { Schema } from 'mongoose';
import { UserEntity } from '../entities/user.entity';

const UserSchema: Schema = new Schema(
  {
    _id: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        const { _id, ...user } = ret;
        user.id = _id;
        return user;
      },
    },
  },
);

export const userModel = mongoose.model<UserEntity>('User', UserSchema, 'users');
