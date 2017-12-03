import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AddTaskModalPage} from "../add-task-modal/add-task-modal";
import {TodoServiceProvider} from "../../providers/todo-service/todo-service";

/**
 * Generated class for the TodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl : ModalController,
              public todoService: TodoServiceProvider) {
  }

  addItem():void{
    // this.todos.push({desc: 'new item', isDone: false});
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();

    modal.onDidDismiss( data => {
      if(data)
        this.todoService.saveNewItem(data);
    });
  }
  editTodo(todo):void{
    // this.todos.push({desc: 'new item', isDone: false});
    let modal = this.modalCtrl.create(AddTaskModalPage, {todo});
    modal.present();

    modal.onDidDismiss( data => {
      if(data)
        this.todoService.saveEditItem(todo, data);
    });
  }

  removeTodo(item:any):void{
    this.todoService.removeTodo(item);
  }

  toogleChecked(item):void{
    this.todoService.toogleChecked(item);
  }

}
