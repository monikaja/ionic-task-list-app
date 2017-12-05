import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListModel} from "../../data/list-model";

/*
  Generated class for the ListServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListServiceProvider {

  public list :ListModel[] = [];

  constructor(public http: HttpClient) {
    this.getLists();
  }

  private getLists(){
    this.list = [
      new ListModel("List 1", 0),
      new ListModel("List 2", 1),
      new ListModel("List 3", 2),
      new ListModel("List 4", 3),
      new ListModel("List 5", 4)
    ]
  }

  public addList(name:string){
    let newList = new ListModel(name, this.list.length);
    this.list = [...this.list, newList];
  }
}
