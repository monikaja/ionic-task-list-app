// import { Http } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListModel } from "../../data/list-model";
import { Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {AppSettings} from "../../data/app-settings";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the ListServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ListServiceProvider {

  public list :ListModel[] = [];

  constructor(public http: HttpClient, public storage:Storage) {
    this.getLists();
  }

  private getLists(){
    this.getFromStorage()
      .then(()=>{this.getFromServer()},
        ()=>{this.getFromServer()}
      )
  }

  public getFromStorage(){
    return this.storage.ready().then( () => {
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

    let observable = this.postNewListToServer(name);

    observable.subscribe( (list:ListModel)=> {
      this.list = [...this.list, list];
      this.saveStorage();
    }, error => {
      console.log("Error post list to server", error);
    });

    return observable;
  }

  private getFromServer(){
    this.http.get(AppSettings.API_BASEURL + '/lists', httpOptions)
      .map((lists:Object[]) => {
        console.log(lists);
        return lists.map (item => ListModel.fromJson(item))
      })
      .subscribe(
        (result: ListModel[]) => {
          this.list = result;
          this.saveStorage();
        },
        error => {
          console.log("Error getting lists from server", error);
        }
      )
  }

  private postNewListToServer(name):Observable<ListModel>{
    let observable = this.http.post(AppSettings.API_BASEURL+'/lists', {name}, httpOptions)
                      .map((list) => {
                        return ListModel.fromJson(list)
                      })
                      .share();

    observable.subscribe(()=>{}, ()=>{});

    return observable;
  }

  public removeList(list: ListModel){
    this.deleteListFromServer(list.id).subscribe(
      ()=> {
        let index = this.list.indexOf(list);
        this.list = [...this.list.slice(0,index), ...this.list.slice(index+1)];
        this.saveStorage();
      },
      (error => {
        console.log("Error removeList "+error);
      })
    );
  }

  private deleteListFromServer(id:number){

    let observable = this.http.delete(AppSettings.API_BASEURL+'/lists/'+id, httpOptions)
      .share();

    observable.subscribe(()=>{}, ()=>{});

    return observable;
  }
}
