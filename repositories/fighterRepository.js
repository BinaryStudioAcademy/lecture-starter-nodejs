import { BaseRepository } from "./baseRepository.js";

class FighterRepository extends BaseRepository {
  constructor() {
    super("fighters");
  }
  
  search(search) {
    console.log(search, "search")
    return this.getAll().find(fighter => fighter.name.toLowerCase() === search.toLowerCase()) ? true : false;
  }
}

const fighterRepository = new FighterRepository();

export { fighterRepository };
