class BaseEntity {
  constructor(properties) {
    Object.assign(this, properties);
  }

  returnUnidentified() {
    const { id, password, ...rest } = this;
    return rest;
  }
}

export class UserEntity extends BaseEntity {
  constructor(properties) {
    super(properties);
  }
}

export class FighterEntity extends BaseEntity {
  constructor(properties) {
    super(properties);
  }
}
