import { BaseRepository } from './baseRepository.js';

class UserRepository extends BaseRepository {
  constructor() {
    super('users');
  }
}

export const userRepository = new UserRepository();
