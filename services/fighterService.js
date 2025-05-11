import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters

  async getAllFighters() {
    const fighters = await fighterRepository.getAll();
    return fighters || [];
  }

  async getOneFighter(search) {
    const fighter = await fighterRepository.getOne(search);
    return fighter || null;
  }

  async createFighter(body) {
    const fighter = await fighterRepository.create(body);
    return fighter || null;
  }

  async updateFighter(id, body) {
    const fighter = await fighterRepository.update(id, body);
    return fighter || null;
  }

  async deleteFighter(id) {
    const fighter = await fighterRepository.delete(id);
    return fighter || null;
  }
}

const fighterService = new FighterService();

export { fighterService };
