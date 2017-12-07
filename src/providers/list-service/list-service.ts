import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListModel} from "../../data/list-model";
import { Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import {AppSettings} from "../../data/app-settings";

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
    // this.getFromStorage();
    this.getFromServer();
  }

  /**
   * @Deprecated
   */
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

  private getFromServer(){
    this.http.get(AppSettings.API_BASEURL + '/lists')
      .map(response => { return JSON.parse(JSON.stringify(response))})
      .map((lists:Object[]) => {
        return lists.map (item => ListModel.fromJson(item))
      })
      .subscribe(
        (result: ListModel[]) => {
          this.list = result;
          this.saveStorage();
        },
        error => {
          console.log("Error");
        }
      )
  }
}
