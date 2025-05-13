import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user\
  getUsers() {
    return userRepository.getAll();
  }
  getUserById(id) {
    return userRepository.getOne({ id });
  }
  createUser(userData) {
    return userRepository.create(userData);
  }
  updateUser(id, userData) {
    const existingUser = userRepository.getOne({ id });
    if (!existingUser) return null;
    return userRepository.update(id, userData);
  }
  
  deleteUser(id) {
    const existingUser = userRepository.getOne({ id });
    if (!existingUser) return null;
    return userRepository.delete(id);
  }
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}



const userService = new UserService();

export { userService };
