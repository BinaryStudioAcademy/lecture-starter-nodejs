import { MESSAGES } from "../constants/response.messages.js";
import { UserEntity } from "../types/BaseEntity.js";
import { CustomError } from "../types/CustomError.js";
import { userService } from "./userService.js";

class AuthService {
  login(userData) {
    const user = userService.search(userData);
    if (!user) {
      throw new CustomError(
        MESSAGES.USER_MESSAGES.ERROR_USER_CREDENTIAL_LOGIN,
        401
      );
    }
    return new UserEntity(user).returnUnidentified();
  }
}

const authService = new AuthService();

export { authService };
