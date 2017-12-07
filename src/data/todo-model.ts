export class TodoModel {
  constructor(
    public description: string,
    public listId: number,
    public isImportant: boolean = false,
    public isDone: boolean = false,
    public id: number = 0
  ){}

  static fromJson(item){
    if(!item.description || !item.id || !item.listId ){
      throw new Error("Invalid argument");
    }
    return new TodoModel(item.description,  item.listId, item.isImportant, item.isDone, item.id);
  }

  static clone(item){
    return new TodoModel(item.description,  item.listId, item.isImportant, item.isDone, item.id);
  }
}
