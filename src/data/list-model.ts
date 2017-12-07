export class ListModel {
  constructor(
    public name: string,
    public id: number
  ){}

  static fromJson(item){
    if(!item.name || !item.id){
      throw new Error("Invalid argument");
    }
    return new ListModel(item.name, item.id);
  }
}
