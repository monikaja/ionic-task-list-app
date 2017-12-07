import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AddTaskModalPage } from "../add-task-modal/add-task-modal";
import { TodoServiceProvider } from "../../providers/todo-service/todo-service";
import { ListModel} from "../../data/list-model";

/**
 * Generated class for the TodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html'
})
export class TodosPage {

  private list:ListModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl : ModalController,
              public todoService: TodoServiceProvider) {
    this.list = this.navParams.get('list');
    this.todoService.loadFromList(this.list.id);
  }

  ionViewWillUnload(){ //ionic lifecycle predefined method
    this.todoService.saveStorage(this.list.id);
  }

  addItem():void{
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();

    modal.onDidDismiss( data => {
      if(data)
        this.todoService.saveNewItem(data);
    });
  }
  editTodo(todo):void{
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
