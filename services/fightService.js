import { fightRepository } from "../repositories/fightRepository.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
    // Get all fighters
    getFighters() {
      return fighterRepository.getAll();
    }
  
    // Get fighter by ID
    getFighterById(id) {
      return fighterRepository.getOne({ id });
    }

    // Create a new fighter with default health = 100
    createFighter(fighterData) {
      if (!fighterData.health) {
        fighterData.health = 100;
      }
      return fighterRepository.create(fighterData);
    }

    // Update fighter
    updateFighter(id, updateData) {
      const existingFighter = fighterRepository.getOne({ id });
      if (!existingFighter) return null;
      return fighterRepository.update(id, updateData);
    }

    // Delete fighter
    deleteFighter(id) {
      const existingFighter = fighterRepository.getOne({ id });
      if (!existingFighter) return null;
      return fighterRepository.delete(id);
    }

    // Search by any field
    search(search) {
      return fighterRepository.getOne(search) ?? null;
    }

}

const fightersService = new FightersService();

const fightHistory = [];

function recordFight(fighter1, fighter2, winner) {
  fightHistory.push({
    timestamp: new Date(),
    fighter1: {
      id: fighter1.id,
      name: fighter1.name,
      health: fighter1.health,
    },
    fighter2: {
      id: fighter2.id,
      name: fighter2.name,
      health: fighter2.health,
    },
    winner: {
      id: winner.id,
      name: winner.name,
      health: winner.health,
    },
  });
}

function getFightHistory() {
  return fightHistory;
}

export { fightersService, recordFight, getFightHistory };