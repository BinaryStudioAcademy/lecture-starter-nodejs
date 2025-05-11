import { MESSAGES } from "../constants/response.messages.js";
import { castValuesToNumber } from "../helpers/services.helper.js";
import { fightRepository } from "../repositories/fightRepository.js";
import { CustomError } from "../CustomError.js";
import { fighterService } from "./fighterService.js";

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
  
  async searchById(id) {
    const item = await fightRepository.getOne(id);
    if (!item) {
      throw new CustomError(
        `${MESSAGES.FIGHT_MESSAGES.ERROR_FIGHT_NOT_FOUND} Id:${id}`,
        404
      );
    }
    return item;
  }

  async checkFighterExistence(fighterId) {
    try {
      const foundFighter = await fighterService.searchById({ id: fighterId });
      if (!foundFighter) {
        throw new Error(`No fighter found with id: ${fighterId}`);
      }
    } catch (error) {
      throw new CustomError(
        `${MESSAGES.FIGHT_MESSAGES.ERROR_FIGHTER_NOT_FOUND} ${fighterId}`,
        404
      );
    }
  }

  async createFight(fighter1, fighter2) {
    await this.checkFighterExistence(fighter1);
    await this.checkFighterExistence(fighter2);

    try {
      const newFight = await fightRepository.create({
        fighter1,
        fighter2,
        log: [],
      });
      return newFight;
    } catch (error) {
      throw new CustomError(
        MESSAGES.FIGHTER_MESSAGES.UNEXPECTED_FIGHTER_CREATING,
        500
      );
    }
  }

  async updateFight(id, data) {
    try {
      const currentFight = await this.searchById({ id });

      const newLog = [{
        fighter1Shot: castValuesToNumber(data.fighter1Shot),
        fighter2Shot: castValuesToNumber(data.fighter2Shot),
        fighter1Health: castValuesToNumber(data.fighter1Health),
        fighter2Health: castValuesToNumber(data.fighter2Health),
      }];

      const updatedFight = await fightRepository.update(id, {
        ...currentFight,
        log: [...currentFight.log, ...newLog],
      });

      return updatedFight;
    } catch (error) {
      throw error;
    }
  }
}

const fightsService = new FightersService();
export { fightsService };