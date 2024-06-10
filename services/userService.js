import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  getAllUsers() {
    const users = userRepository.getAll();
    return users;
  }

  create(user) {
    const newUser = userRepository.create(user);
    return newUser;
  }

  update (id, dataToUpdate) {
    const updatedUser = userRepository.update(id, dataToUpdate);
    return updatedUser;
  }

  delete(id) {
    const isExisted = this.search(id);
    if (!isExisted) {
      throw new Error("User not found");
    }

    const deletedUser = userRepository.delete(id);
    return deletedUser;
  }

  search(search) {
    const item = userRepository.getOne(search);
    return item ? item : null;
  }
}

const userService = new UserService();

export { userService };
