import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoModel} from "../../data/todo-model";
import { Storage} from "@ionic/storage";
import { AppSettings} from "../../data/app-settings";
/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {

  private todos:TodoModel[] = [];

  constructor(public http: HttpClient, public storage:Storage) {
  }


  loadFromList(id:number):void{
    // this.getFromStorage(id);
    this.getFromServer(id);
  }

  private getFromServer(id){
    this.http.get(AppSettings.API_BASEURL + '/lists/'+id+'/todos')
      .map(response => { return JSON.parse(JSON.stringify(response))})
      .map((todos:Object[]) => {
        return todos.map (item => TodoModel.fromJson(item))
      })
      .subscribe(
        (result: TodoModel[]) => {
          this.todos = result;
          this.saveStorage(id);
        },
        error => {
          console.log("Error getting todos from server", error);
        }
      )
  }

  /*
  private getFromStorage(id:number){
    this.storage.ready().then( () => {
      this.storage.get('list/'+id).then( data => {
        if(!data){
          this.todos = [];
          return;
        }
        let localTodos: any = [];
        for(let todo of data){
          localTodos.push(TodoModel.clone(todo));
        }
        this.todos = localTodos;
      })

    })
  }
  */
  public saveStorage(id:number){
    this.storage.ready().then( ()=> {
      this.storage.set(`list/${id}`, this.todos);
    })
  }

  toogleChecked(item):void{
    let itemIndex = this.todos.indexOf(item);

    this.todos = [
      ...this.todos.slice(0, itemIndex),
      new TodoModel(item.description,  item.listId, item.isImportant, !item.isDone, item.id),
      ...this.todos.slice(itemIndex+1)
    ];
  }

  saveNewItem(item:any):void{
    this.todos = [...this.todos, item];
  }

  removeTodo(item:any):void{
    const index = this.todos.indexOf(item);
    this.todos = [
      ...this.todos.slice(0, index),
      ...this.todos.slice(index+1)
    ];
  }

  saveEditItem(item:any, newItem:any):void{
    const index = this.todos.indexOf(item);
    this.todos = [
      ...this.todos.slice(0, index),
      newItem,
      ...this.todos.slice(index+1)
    ];
  }
}



