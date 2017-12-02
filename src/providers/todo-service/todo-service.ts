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

  constructor(private http: HttpClientModule) {
    console.log('Hello TodoServiceProvider Provider');

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

  getTodos():any[]{
    return this.todos;
  }

  toogleChecked(item):void{
    item.isDone = !item.Done;
  }

  saveNewItem(item:any):void{
    this.todos.push(item);
  }
}



