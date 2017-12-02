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

  public todos:any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl : ModalController,
              public todoService: TodoServiceProvider) {
    this.todos = todoService.getTodos();
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

  toogleChecked(item):void{
    this.todoService.toogleChecked(item);
  }

}
