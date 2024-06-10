import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  getAllFighters() {
    return fighterRepository.getAll();
  }

  getFighter(id) {
    const fighter = fighterRepository.getOne(id);

    if (!fighter) {
      return null;
    }

    return fighter;
  }

  createFighter(fighter) {
    const newFighter = fighterRepository.create(fighter);
    
    if(!newFighter) {
      return null;
    }

    return newFighter;
  }

  updateFighter(id, fighter) {
    const updatedFighter = fighterRepository.update(id, fighter);

    if(!updatedFighter) {
      return null;
    }

    return updatedFighter;
  }

  deleteFighter(id) {
    const deletedFighter = fighterRepository.delete(id);

    if(!deletedFighter) {
      return null;
    }

    return deletedFighter;
  }

  search(search) {
    return fighterRepository.search(search);
  }
}

const fighterService = new FighterService();

export { fighterService };
