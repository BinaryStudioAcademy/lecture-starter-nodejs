import { fightRepository } from '../repositories/fightRepository.js';

// *********************************************************

class FightService {
  getAllFights() {
    return fightRepository.getAll();
  }

  // Search fights by one or more parameters
  search(queryObj) {
    const item = fightRepository.getOne(queryObj);
    return item ? item : null;
  }

  // Create a new fight
  save(data) {
    return fightRepository.create(data);
  }
}

export const fightService = new FightService();
