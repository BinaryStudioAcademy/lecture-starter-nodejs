import { userRepository } from '../repositories/userRepository.js';

class UserService {
  getAllUsers() {
    return userRepository.getAll();
  }

  search(queryObj) {
    const item = userRepository.getOne(queryObj);
    return item ? item : null;
  }

  register(data) {
    return userRepository.create(data);
  }

  editUser(id, dataToUpdate) {
    return userRepository.update(id, dataToUpdate);
  }

  deleteUser(id) {
    const doesExist = this.search({ id });
    console.log('doesExist: ', doesExist);
    if (!doesExist) return null;

    const [deletedUser] = userRepository.delete(id);
    return deletedUser;
  }
}

const userService = new UserService();

export { userService };
