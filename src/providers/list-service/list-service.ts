import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListModel} from "../../data/list-model";
import { Storage} from "@ionic/storage";

/*
  Generated class for the ListServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListServiceProvider {

  public list :ListModel[] = [];

  constructor(public http: HttpClient, public storage:Storage) {
    // this.getLists();
    this.getFromStorage();
  }

  public getFromStorage(){
    this.storage.ready().then( () => {
      this.storage.get('list').then( data => {
        let localLists: ListModel[] = [];
        if(data){
          for(let model of data){
            localLists.push(new ListModel(model.name, model.id));
          }
        }
        this.list = localLists;
      })
    })
  }

  public saveStorage(){
    this.storage.ready().then( () => {
      this.storage.set('list', this.list);
    })
  }

  public addList(name:string){
    let newList = new ListModel(name, this.list.length);
    this.list = [...this.list, newList];
    return newList;
  }
}
