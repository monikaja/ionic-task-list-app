import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoModel} from "../../data/todo-model";
import { Storage} from "@ionic/storage";
import { AppSettings } from "../../data/app-settings";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {ListModel} from "../../data/list-model";
/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TodoServiceProvider {

  private todos:TodoModel[] = [];

  constructor(public http: HttpClient, public storage:Storage) {
  }

  loadFromList(id:number):void{
    this.getFromStorage(id).then(()=>{
      this.getFromServer(id);
    })
  }

  private getFromServer(id){
    this.http.get(AppSettings.API_BASEURL + '/lists/'+id+'/todos', httpOptions)
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


  private getFromStorage(id:number){
    return this.storage.ready().then( () => {
      return this.storage.get('list/'+id).then( data => {
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

  public saveStorage(id:number){
    this.storage.ready().then( ()=> {
      this.storage.set(`list/${id}`, this.todos);
    })
  }

  toogleChecked(todo:TodoModel){
    let updatedTodo = TodoModel.clone(todo);
    updatedTodo.isDone = ! todo.isDone;

    return this.saveEditItem(todo, updatedTodo).subscribe(()=>{},
      ()=> { this.loadFromList(todo.listId)});//si hay error deshacemos la operación
  }

  removeTodo(todo:TodoModel):void{
    this.deleteTodoFromServer(todo.id).subscribe(
      ()=>{
        const index = this.todos.indexOf(todo);
        this.todos = [
          ...this.todos.slice(0, index),
          ...this.todos.slice(index+1)];
        this.saveStorage(todo.listId);
      },
      error => console.log("An error occurred while trying to remove the todo ", todo)
    );
  }

  private deleteTodoFromServer(id:number){
    let observable = this.http.delete(`${AppSettings.API_BASEURL}/todos/${id}`);

    return observable;
  }

  saveEditItem(item:TodoModel, newItem:TodoModel):Observable<TodoModel>{
    let observable = this.postEditTodoToServer(newItem);

    observable.subscribe( (todo:TodoModel)=> {
      const index = this.todos.indexOf(item);
      this.todos = [
        ...this.todos.slice(0, index),
        todo,
        ...this.todos.slice(index+1)
      ];
    }, error => {
      console.log("Error post todo to server", error);
    });

    return observable;
  }

  saveNewItem(todo:TodoModel){
    let observable = this.postNewTodoToServer(todo);

    observable.subscribe( (todo:TodoModel)=> {
      this.todos = [...this.todos, todo];
      this.saveStorage(todo.listId);
    }, error => {
      console.log("Error post todo to server", error);
    });

    return observable;
  }

  private postNewTodoToServer(todo:TodoModel): Observable<TodoModel>{
    let observable = this.http.post(AppSettings.API_BASEURL + '/lists/'+todo.listId+'/todos',
      {
        description: todo.description,
        isImportant: todo.isImportant,
        isDone: todo.isDone
      })
      .map(todo => TodoModel.fromJson(todo))
      .share();

    observable.subscribe(()=>{}, ()=>{});

    return observable;
  }

  private postEditTodoToServer(todo:TodoModel): Observable<TodoModel>{
    let observable = this.http.put(AppSettings.API_BASEURL + '/todos/'+todo.id,
      {
        description: todo.description,
        isImportant: todo.isImportant,
        isDone: todo.isDone,
        listId: todo.listId
      })
      .map(todo => TodoModel.fromJson(todo))
      .share();

    observable.subscribe(()=>{}, ()=>{});

    return observable;
  }

}



