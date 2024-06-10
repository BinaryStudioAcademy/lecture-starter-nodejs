import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAllUsers() {
    return userRepository.getAll();
  }

  createUser(data) {
    const newUser = userRepository.create(data);

    return newUser;
  }

  updateUser(id, dataToUpdate) {
    const updatedUser = userRepository.update(id, dataToUpdate);

    return updatedUser;
  }

  deleteUser(id) {
    userRepository.delete(id);
  }
}

const userService = new UserService();

export { userService };
