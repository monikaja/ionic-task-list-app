import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TodoModel} from "../../data/todo-model";
import { Storage} from "@ionic/storage";
/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {

  private todos:TodoModel[] = [];

  constructor(public http: HttpClientModule, public storage:Storage) {
  }

  loadFromList(id:number):void{
    this.getFromStorage(id);
  }

  private getFromStorage(id:number){
    this.storage.ready().then( () => {
      this.storage.get(`list/${id}`).then( data => {
        if(data){
          this.todos = [];
          return;
        }
        let localTodos: any = [];
        for(let todo of data){
          localTodos.push(new TodoModel(data.desc, data.isDone));
        }
        this.todos = localTodos;
      })

    })
  }

  public saveStorage(id:number){
    this.storage.ready().then( ()=> {
      this.storage.set(`list/${id}`, this.todos);
    })
  }

  toogleChecked(item):void{
    let itemIndex = this.todos.indexOf(item);

    this.todos = [
      ...this.todos.slice(0, itemIndex),
      {isDone: !item.isDone, desc: item.desc},
      ...this.todos.slice(itemIndex+1)
    ];
  }

  saveNewItem(item:any):void{
    this.todos = [...this.todos, item];
    // this.todos.push(item);
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



