import { userRepository } from "../repositories/userRepository.js";
import { UserEntity } from "../types/BaseEntity.js";
import { CustomError } from "../types/CustomError.js";
import { MESSAGES } from "../constants/response.messages.js";

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  isPasswordFormat(password) {
    if (password.length < 3) {
      throw new CustomError(MESSAGES.USER_MESSAGES.ERROR_PASSWORD_LENGHT, 400);
    }
  }

  isEmailFormat(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      throw new CustomError(MESSAGES.USER_MESSAGES.ERROR_EMAIL_FORMAT, 400);
    }
  }

  isPhoneFormat(phoneNumber) {
    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      throw new CustomError(MESSAGES.USER_MESSAGES.ERROR_PHONE_FORMAT, 400);
    }
  }

  isUniqueEmail(email) {
    if (this.search({ email })) {
      throw new CustomError(MESSAGES.USER_MESSAGES.ERROR_EMAIL_UNIQUE, 400);
    }
  }

  isUniquePhone(phoneNumber) {
    if (this.search({ phoneNumber })) {
      throw new CustomError(MESSAGES.USER_MESSAGES.ERROR_PHONE_UNIQUE, 400);
    }
  }

  checkUniqueData(email, phone) {
    this.isUniqueEmail(email);
    this.isUniquePhone(phone);
  }

  checkAllData(data) {
    this.isPasswordFormat(data.password);
    this.isEmailFormat(data.email);
    this.isPhoneFormat(data.phoneNumber);
    this.checkUniqueData(data.email, data.phoneNumber);
    return data;
  }

  createUser(data) {
    let checkedData;
    try {
      checkedData = this.checkAllData(data);
    } catch (error) {
      //handled by response middleware
      throw error;
    }

    try {
      const newUser = new UserEntity(userRepository.create(checkedData));
      return newUser.returnUnidentified();
    } catch (error) {
      //search and then delete the posible previous created because of unexpected error!
      const rollbackCreated = this.search({ phoneNumber: data.phoneNumber });
      if (rollbackCreated) {
        userRepository.delete(rollbackCreated.id);
      }
      throw new CustomError(
        MESSAGES.USER_MESSAGES.UNEXPECTED_ERROR_CREATING,
        500
      );
    }
  }

  updateUser(data) {
    let checkedData;
    try {
      checkedData = this.checkAllData(data);
    } catch (error) {
      //handled by response middleware
      throw error;
    }

    try {
      const newUser = new UserEntity(userRepository.create(checkedData));
      return newUser.returnUnidentified();
    } catch (error) {
      //search and then delete the posible previous created because of unexpected error!
      const rollbackCreated = this.search({ phoneNumber: data.phoneNumber });
      if (rollbackCreated) {
        userRepository.delete(rollbackCreated.id);
      }
      throw new CustomError(
        MESSAGES.USER_MESSAGES.UNEXPECTED_ERROR_CREATING,
        500
      );
    }
  }
}

const userService = new UserService();

export { userService };
