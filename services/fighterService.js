import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
    // Get all fighters
    getFighters() {
      return fighterRepository.getAll();
    }
  
    // Get fighter by ID
    getFighterById(id) {
      return fighterRepository.getOne({ id });
    }
  
    // Create fighter with default health
    createFighter(fighterData) {
      const data = {
        ...fighterData,
        health: fighterData.health ?? 85,
      };
      return fighterRepository.create(data);
    }
  
    // Update fighter if exists
    updateFighter(id, fighterData) {
      const existingFighter = fighterRepository.getOne({ id });
      if (!existingFighter) return null;
      return fighterRepository.update(id, fighterData);
    }
  
    // Delete fighter if exists
    deleteFighter(id) {
      const existingFighter = fighterRepository.getOne({ id });
      if (!existingFighter) return null;
      return fighterRepository.delete(id);
    }
  
    // Search by field (e.g. name, id)
    search(search) {
      const fighter = fighterRepository.getOne(search);
      return fighter || null;
    }

    async fight(fighter1Id, fighter2Id) {
      const fighter1 = await fighterRepository.getOne({ id: fighter1Id });
      const fighter2 = await fighterRepository.getOne({ id: fighter2Id });
    
      if (!fighter1 || !fighter2) {
        throw new Error("One or both fighters not found");
      }
    
      // Clone fighters to avoid mutating original objects
      let f1 = { ...fighter1 };
      let f2 = { ...fighter2 };
    
      const getHitPower = (fighter) => fighter.power * (Math.random() + 1);
      const getBlockPower = (fighter) => fighter.defense * (Math.random() + 1);
      const getDamage = (attacker, defender) => {
        const damage = getHitPower(attacker) - getBlockPower(defender);
        return damage > 0 ? damage : 0;
      };
    
      while (f1.health > 0 && f2.health > 0) {
        f2.health -= getDamage(f1, f2);
        if (f2.health <= 0) break;
        f1.health -= getDamage(f2, f1);
      }
      
      // Fight loop: each turn one attacks, the other defends
      while (f1.health > 0 && f2.health > 0) {
        // Fighter 1 attacks Fighter 2
        f2.health -= this.calculateDamage(f1, f2);
        if (f2.health <= 0) break;

        // Fighter 2 attacks Fighter 1
        f1.health -= this.calculateDamage(f2, f1);
      }

      const winner = f1.health > 0 ? f1 : f2;
    
      return {
        winner: {
          name: winner.name,
          health: Math.round(winner.health),
        },
      };
    }

    calculateDamage(attacker, defender) {
      const hitPower = attacker.power * Math.random();
      const blockPower = defender.defense * Math.random();
      const damage = hitPower - blockPower;
      return damage > 0 ? damage : 0;
    }

}


const fighterService = new FighterService();

export { fighterService };
