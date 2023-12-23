import { userRepository } from '../repositories/userRepository.js';

class UserService {
  getAllUsers() {
    return userRepository.getAll();
  }

  // Search users by one or more parameters
  search(queryObj) {
    const item = userRepository.getOne(queryObj);
    return item ? item : null;
  }

  // Create a new user
  register(data) {
    return userRepository.create(data);
  }

  // Edit an existing user
  editUser(id, dataToUpdate) {
    return userRepository.update(id, dataToUpdate);
  }

  // Delete an existing user
  deleteUser(id) {
    const doesExist = this.search({ id });
    console.log('doesExist: ', doesExist);
    if (!doesExist) return null;

    const [deletedUser] = userRepository.delete(id);
    return deletedUser;
  }
}

export const userService = new UserService();
