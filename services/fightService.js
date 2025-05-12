import { fightRepository } from "../repositories/fightRepository.js";

class FightService {
  async getAllFights() {
    const fights = await fightRepository.getAll();
    return fights || [];
  }

  async getOneFight(search) {
    const fight = await fightRepository.getOne(search);
    return fight || null;
  }

  async createFight(fighter1, fighter2, log = []) {
    console.log("log before saving:", log);
    
    const newFight = {
      fighter1,
      fighter2,
      log,
      createdAt: new Date(),
    };
  
    const fight = await fightRepository.create(newFight);
    console.log("Fight saved:", fight);
  
    return fight || null;
  }

  async updateFight(id, body) {
    const fight = await fightRepository.update(id, body);
    return fight || null;
  }

  async deleteFight(id) {
    const fight = await fightRepository.delete(id);
    return fight || null;
  }
}

const fightsService = new FightService();

export { fightsService };
