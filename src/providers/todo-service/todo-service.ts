import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {

  private todos: any[];

  constructor(public http: HttpClientModule) {
    this.getTodos();
  }

  getTodos():void{
    this.todos = [
      {desc: 'hola que tal esto es una tarea', isDone: false},
      {desc: 'checked Task', isDone: true},
      {desc: 'hola que tal esto es una tarea', isDone: false},
      {desc: 'hola que tal esto es una tarea', isDone: false},
      {desc: 'hola que tal esto es una tarea', isDone: false},
      {desc: 'checked Task', isDone: true},
      {desc: 'hola que tal esto es una tarea', isDone: false},
      {desc: 'hola que tal esto es una tarea', isDone: false},
      {desc: 'hola que tal esto es una tarea', isDone: false}
    ];
  }

  toogleChecked(item):void{
    item.isDone = !item.Done;
  }

  saveNewItem(item:any):void{
    this.todos.push(item);
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



