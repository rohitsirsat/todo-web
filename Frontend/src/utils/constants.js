class TodoInterface {
  constructor(title, desctiption, isComplete, createdAt, updatedAt, _id) {
    this.title = title;
    this.desctiption = desctiption;
    this.isComplete = isComplete;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this._id = _id;
  }
}

export { TodoInterface };
