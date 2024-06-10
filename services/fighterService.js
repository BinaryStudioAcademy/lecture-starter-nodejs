import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters

  search(search) {
    return fighterRepository.getOne(search);
  }

  async create(fighter) {
    const existingByName = await fighterRepository.findByName(fighter.name);
    if (existingByName) {
      throw new Error("Fighter with this name already exists");
    }

    if (!fighter.health) {
      fighter.health = 85;
    }

    return fighterRepository.create(fighter);
  }

  async update(id, dataToUpdate) {
    if (dataToUpdate.name) {
      const existingByName = await fighterRepository.findByName(dataToUpdate.name);
      if (existingByName && existingByName.id !== id) {
        throw new Error("Fighter with this name already exists");
      }
    }

    return fighterRepository.update(id, dataToUpdate);
  }

  async delete(id) {
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
