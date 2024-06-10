import { BaseRepository } from "./baseRepository.js";

class FighterRepository extends BaseRepository {
  constructor() {
    super("fighters");
  }

  async findByName(name) {
    const fighters = this.getAll();
    return fighters.find(fighter => fighter.name.toLowerCase() === name.toLowerCase());
  }
}

const fighterRepository = new FighterRepository();

export { fighterRepository };
