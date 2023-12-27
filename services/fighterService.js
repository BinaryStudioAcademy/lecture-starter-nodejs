import { fighterRepository } from '../repositories/fighterRepository.js';

// *********************************************************

class FighterService {
  getAllFighters() {
    return fighterRepository.getAll();
  }

  // Search fighters by one or more parameters
  search(queryObj) {
    const item = fighterRepository.getOne(queryObj);
    return item ? item : null;
  }

  // Create a new fighter
  createFighter(data) {
    return fighterRepository.create(data);
  }

  // Edit an existing fighter
  editFighter(id, dataToUpdate) {
    return fighterRepository.update(id, dataToUpdate);
  }

  // Delete an existing fighter
  deleteFighter(id) {
    const doesExist = this.search({ id });
    if (!doesExist) return null;

    const [deletedFighter] = fighterRepository.delete(id);
    return deletedFighter;
  }
}

export const fighterService = new FighterService();
