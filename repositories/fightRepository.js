import { BaseRepository } from './baseRepository.js';

class FightRepository extends BaseRepository {
  constructor() {
    super('fights');
  }
}

export const fightRepository = new FightRepository();
